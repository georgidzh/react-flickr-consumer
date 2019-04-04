import React from 'react';
import PropTypes from 'prop-types';

import Post from '../../models/Post';

import Description from './Description/Description';
import Image from './Image/Image';
import Title from './Title/Title';
import LimitedTags from './Tags/LimitedTags/LimitedTags';


// eslint-disable-next-line prefer-arrow-callback
const PostItemMemo = React.memo(function PostItem(props) {
  const {
    post,
    showDetails,
    isSaved,
    showPostsInfo,
    imageSuffix,
    save,
    unsave,
    searchHandler,
  } = props;
  const {
    author,
    authorLink,
    description,
    imgBaseUrl,
    title,
    tags,
  } = post;
  // console.log('render post');
  const saveBtn = isSaved
    ? <button onClick={() => unsave(post)} className="btn-text text-danger float-right" type="button">Unsave post</button>
    : <button onClick={() => save(post)} className="btn-text float-right" type="button">Save post</button>;

  return (
    <div className="col-md-6 col-lg-3">
      <div className="card post-card shadow-sm">
        <div className={`card-img-top text-center ${imageSuffix === '_n.jpg' ? 'take-space' : null}`}>
          <Image src={`${imgBaseUrl}${imageSuffix}`} alt={`Photo by ${post.author}`} />
        </div>
        { showPostsInfo && (
          <div className="card-body">
            <Title
              title={title}
              link={post.link}
              author={author}
              authorLink={authorLink}
            />
            <Description description={description} truncate />
            <LimitedTags searchHandler={searchHandler} tags={tags} />
          </div>
        )}
        <div className="card-footer">
          <button onClick={() => showDetails(post)} type="button" className="btn-text float-left">Show Details</button>
          {saveBtn}
        </div>
      </div>
    </div>
  );
});

PostItemMemo.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  showPostsInfo: PropTypes.bool.isRequired,
  imageSuffix: PropTypes.string.isRequired,
  showDetails: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  unsave: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
  post: PropTypes.shape(Post.propTypesPostShape).isRequired,
};

export default PostItemMemo;
