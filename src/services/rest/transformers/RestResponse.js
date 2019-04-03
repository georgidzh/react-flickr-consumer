import PostFromRest from '../../../models/PostFromRest';

export default class RestResponse {
  constructor(response, storedIds) {
    this.hasMorePosts = response.pages > response.page;
    this.totalPosts = response.total * 1; // I do convert to int like that...
    this.page = response.page * 1;
    this.posts = response.photo.map(data => new PostFromRest(data, storedIds));
  }
}
