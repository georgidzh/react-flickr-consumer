import { inArray } from '../utils/helpers';

/* eslint-disable no-underscore-dangle */
export default class PostFromRest {
  constructor(data, storedIds) {
    this.flickrId = data.id;
    this.author = data.ownername;
    this.authorId = data.owner;
    this.authorLink = PostFromRest.buildAuthorLink(data.owner);
    this.description = data.description._content;
    this.imgBaseUrl = PostFromRest.buildPhotoBaseUrl(data);
    this.link = PostFromRest.buildPostLink(data.owner, data.id);
    this.publishedAt = data.dateupload * 1;
    this.secret = data.secret;
    this.tags = data.tags.split(' ');
    this.title = data.title;
    this.isSaved = inArray(data.id, storedIds);
  }

  /**
   *
   * https://www.flickr.com/services/api/misc.urls.html
   *  add `[IMAGE_SIZE].jpg` to end to create the actual image url
   */
  static buildPhotoBaseUrl({
    farm,
    server,
    id,
    secret,
  }) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}`;
  }

  /**
   *
   * https://www.flickr.com/services/api/misc.urls.html
   */
  static buildAuthorLink(authorId) {
    return `https://www.flickr.com/people/${authorId}/`;
  }

  static buildPostLink(authorId, flickrId) {
    return `https://www.flickr.com/photos/${authorId}/${flickrId}`;
  }
}
