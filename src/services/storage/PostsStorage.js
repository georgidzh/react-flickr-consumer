/* eslint-disable no-underscore-dangle */
import db, { SEARCH_TABLE_FIELD_TAG } from './indexedDb';
import { getTimestampUTC } from '../../utils/helpers';
import { SEARCH_TYPE_TEXT, SEARCH_TYPE_TAGS } from '../../utils/constants';

class PostsStorage {
  static countAll() {
    return db.posts.count();
  }

  static async getPaginated({
    currentPage,
    postsPerPage,
    searchType,
    searchString,
  }) {
    return db.transaction('rw', db.posts, async () => {
      let count;
      let posts;
      let query;
      // debugger;
      switch (true) {
        case (searchType && searchString && searchString !== ''):
          query = await this.search(currentPage, postsPerPage, searchType, searchString);
          count = await query.clone().count();
          posts = await query.reverse()
            .offset(currentPage * postsPerPage)
            .limit(postsPerPage)
            .sortBy('createdAt');
          break;
        default:
          query = await db.posts;
          count = await query.toCollection().clone().count();
          posts = await query.orderBy('createdAt')
            .reverse()
            .offset(currentPage * postsPerPage)
            .limit(postsPerPage)
            .toArray();
      }
      return {
        posts,
        totalPosts: count,
        hasMorePosts: count > currentPage * postsPerPage + posts.length,
        page: currentPage + 1,
      };
    });
  }

  static async search(currentPage, postsPerPage, searchType, searchString) {
    const foundIds = {};
    const isSentence = searchString.split(' ').length > 1;
    switch (true) {
      // there is no point to search in the mapper table if the string contains more than one word
      // just return a query from posts table
      case (searchType === SEARCH_TYPE_TEXT && isSentence):
        return db.posts.where('title').startsWithIgnoreCase(searchString);
      case (searchType === SEARCH_TYPE_TEXT && !isSentence):
        await db._postWords.where('word').startsWithIgnoreCase(searchString).each((searchMapper) => {
          foundIds[searchMapper.flickrId] = true;
        });
        break;
      case (searchType === SEARCH_TYPE_TAGS):
        // eslint-disable-next-line no-case-declarations
        const tags = searchString.split(',').map(tag => tag.trim());
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < tags.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          await db._postWords.where(['field+word']).equals([SEARCH_TABLE_FIELD_TAG, tags[i]]).each((searchMapper) => {
            foundIds[searchMapper.flickrId] = true;
          });
        }
        break;
      default: throw Error('no_handler');
      // Now we got all FlickrIds in the keys of foundIds object.
      // eslint-disable-next-line radix
    }
    const postIds = Object.keys(foundIds).map(flickrId => flickrId);
    const posts = await db.posts.filter(post => postIds.indexOf(post.flickrId) > -1);

    return posts;
  }

  static async getKeys() {
    const posts = await db.posts.toCollection().primaryKeys();
    return posts;
  }

  static async save(postData) {
    const post = {
      ...postData,
      isSaved: true,
      createdAt: postData.createdAt || getTimestampUTC(),
    };
    return db.transaction('rw', db.posts, async () => {
      const id = db.posts.add(post);
      return id;
    });
  }

  static delete(post) {
    return db.posts.delete(post.flickrId);
  }

  static async deleteAll() {
    return db.transaction('rw', db.posts, async () => {
      await db.posts.clear();
      await db._postWords.clear();
      return 'ok';
    });
  }
}

export default PostsStorage;
