/* eslint-disable import/prefer-default-export */
export const dummyPost = {
  flickrId: '1',
  author: 'author',
  authorId: 'dadada',
  authorLink: 'url_author',
  description: 'Dummy description',
  imgBaseUrl: 'imageUrl',
  link: 'url_post',
  publishedAt: 1554296586,
  tags: [],
  title: 'Dummy title',
  isSaved: false,
};

export const getPosts = (number = 0) => {
  const posts = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < number; i++) {
    posts[i] = { ...dummyPost };
  }
  return posts;
};
