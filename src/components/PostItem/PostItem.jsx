import React from 'react';
import PropTypes from 'prop-types';

import Post from '../../models/Post';

import Description from './Description/Description';
import Image from './Image/Image';
import Title from './Title/Title';
import LimitedTags from './Tags/LimitedTags/LimitedTags';

export function PostItem(props) {
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
  const saveBtn = isSaved
    ? <button onClick={() => unsave(post)} className="btn-text text-danger float-right unsave" type="button">Unsave post</button>
    : <button onClick={() => save(post)} className="btn-text float-right save" type="button">Save post</button>;
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card post-card shadow-sm">
        <div className={`card-img-top text-center ${imageSuffix === '_n.jpg' ? 'take-space' : null}`}>
          <Image data-test="post-image" src={`${imgBaseUrl}${imageSuffix}`} alt={`Photo by ${post.author}`} />
        </div>
        { showPostsInfo && (
          <div className="card-body">
            <Title
              title={title}
              link={post.link}
              author={author}
              authorLink={authorLink}
              data-test="post-title"
            />
            <Description description={description} truncate data-test="post-description" />
            <LimitedTags searchHandler={searchHandler} tags={tags} data-test="post-tags-limited" />
          </div>
        )}
        <div className="card-footer">
          <button onClick={() => showDetails(post)} type="button" className="btn-text float-left">Show Details</button>
          {saveBtn}
        </div>
      </div>
    </div>
  );
}

PostItem.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  showPostsInfo: PropTypes.bool.isRequired,
  imageSuffix: PropTypes.string.isRequired,
  showDetails: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  unsave: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
  post: PropTypes.shape(Post.propTypesPostShape).isRequired,
};

export default React.memo(PostItem);
