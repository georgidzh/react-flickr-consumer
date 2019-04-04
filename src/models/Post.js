import PropTypes from 'prop-types';

export default class Post {
  constructor(data) {
    this.flickrId = data.flickrId;
    this.author = data.author;
    this.authorId = data.authorId;
    this.authorLink = data.authorLink;
    this.description = data.description;
    this.imgBaseUrl = data.imgBaseUrl;
    this.link = data.link;
    this.publishedAt = data.publishedAt;
    this.tags = data.tags;
    this.title = data.title;
    this.isSaved = typeof data.isSaved === 'boolean' ? data.isSaved : undefined;
  }

  static defaultImageUrlEnding = '_n.jpg';

  static modalImgUrlEnding = '_z.jpg';

  /**
   * https://www.flickr.com/services/api/misc.urls.html
   */
  static imageSizes = {
    ss: 's', // small square 75x75
    square: 'q', // large square 150x150
    t: 't', // thumbnail, 100 on longest side
    m: 'm', // small, 240 on longest side
    small: 'n', // small, 320 on longest side
    mm: '-', // medium, 500 on longest side
    medium: 'z', // medium 640, 640 on longest side
    c: 'c', // medium 800, 800 on longest side
    b: 'b', // large, 1024 on longest side
    h: 'h', // large 1600, 1600 on longest side
    k: 'k', // large 2048, 2048 on longest side
    o: 'o', // original image, either a jpg, gif or png, depending on source format
  };

  /**
   *
   * https://www.flickr.com/services/api/misc.urls.html
   *  add `_[IMAGE_SIZE].jpg` to end to create the actual image url
   */
  static buildMediaUrl(baseUrl, size) {
    const sizeCode = Post.imageSizes[size];
    return `${baseUrl}_${sizeCode}.jpg`;
  }

  // TODO: \/*_(?:.(?!\/))+$
  // static changeMediaUrlSize(url,
  //  newSize = Post.modalImageSize, oldSize = Post.defaultImageSize) {
  //   return url.replace(`_${Post.imageSizes[oldSize]}.jpg`, `_${Post.imageSizes[newSize]}.jpg`);
  // }

  static propTypesPostShape = {
    flickrId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    authorLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgBaseUrl: PropTypes.string.isRequired,
    isSaved: PropTypes.bool.isRequired,
    publishedAt: PropTypes.number.isRequired,
    // secret: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  };

  static getSuffixForSize = size => `_${Post.imageSizes[size]}.jpg`;
}
