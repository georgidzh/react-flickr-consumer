import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner } from 'react-bootstrap';

import PostItem from '../PostItem/PostItem';

// eslint-disable-next-line prefer-arrow-callback
const PostsGridMemo = React.memo(function PostsGrid(props) {
  const loader = (
    <div className="loader-container" key={0}>
      <Spinner animation="border" role="status" />
    </div>
  );

  const {
    hasMorePosts,
    posts,
    loadMore,
    savePost,
    unsavePost,
    showDetails,
    showPostsInfo,
    imageSuffix,
    searchHandler,
  } = props;

  const renderPosts = posts.map((post, i) => (
    <PostItem
      // eslint-disable-next-line react/no-array-index-key
      key={`${i}_${post.flickrId}`}
      showPostsInfo={showPostsInfo}
      imageSuffix={imageSuffix}
      isSaved={post.isSaved}
      save={savePost}
      unsave={unsavePost}
      showDetails={showDetails}
      post={post}
      searchHandler={searchHandler}
    />
  ));

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMorePosts}
      loader={loader}
      threshold={1000}
    >
      <div className="row">
        {renderPosts}
      </div>
    </InfiniteScroll>
  );
});


PostsGridMemo.propTypes = {
  imageSuffix: PropTypes.string.isRequired,
  hasMorePosts: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  showPostsInfo: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  savePost: PropTypes.func.isRequired,
  unsavePost: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
};


export default PostsGridMemo;
