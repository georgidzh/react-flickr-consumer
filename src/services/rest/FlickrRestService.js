import Flickr from 'flickr-sdk';
import RestResponse from './transformers/RestResponse';
import PostsStorage from '../storage/PostsStorage';

class FlickrRestService {
  constructor() {
    this.flickrApi = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);
  }

  /**
   * https://www.flickr.com/services/api/flickr.photos.search.html
   * ________
   * text (Optional)
   * A free text search. Photos who's title, description or tags contain
   * the text will be returned. You can exclude results that match a term
   * by prepending it with a - character.
   * ________
   * tags (Optional):
   * A comma-delimited list of tags. Photos with one or more of the tags
   * listed will be returned. You can exclude results that match a term
   * by prepending it with a - character.
   * ________
   * // tag_mode (Optional):
   * Either 'any' for an OR combination of tags, or 'all' for an AND combination.
   * Defaults to 'any' if not specified.
   * _______
   * // safe search: (we are not authenticated anyways, but it doesn't hurt)
   * safe_search (Optional):
   * Safe search setting:
   * 1 for safe.
   * 2 for moderate.
   * 3 for restricted.
   * (Please note: Un-authed calls can only see Safe content.
   */

  configureRecentQuery = postsState => ({
    page: postsState.currentPage + 1,
    per_page: postsState.postsPerPage,
    extras: 'tags,description,owner_name,media,date_upload,',
  });

  configureSearchQuery = postsState => ({
    page: postsState.currentPage + 1,
    per_page: postsState.postsPerPage,
    extras: 'tags,description,owner_name,media,date_upload,',
    [postsState.searchType]: postsState.searchString,
    safe_search: 1,
  });

  // https://www.flickr.com/services/api/flickr.photos.getRecent.html
  getRecent = (postsState) => {
    const config = this.configureRecentQuery(postsState);
    return this.flickrApi.photos.getRecent(config);
  }

  search = async (postsState) => {
    const config = this.configureSearchQuery(postsState);
    return this.flickrApi.photos.search(config);
  }

  getPaginated = async (postsState) => {
    let response;
    switch (true) {
      case postsState.searchType && postsState.searchString && postsState.searchString !== '':
        response = await this.search(postsState);
        break;
      default:
        response = await this.getRecent(postsState);
    }

    const storedIds = await PostsStorage.getKeys();
    return new RestResponse(response.body.photos, storedIds);
  }
}

export default FlickrRestService;
