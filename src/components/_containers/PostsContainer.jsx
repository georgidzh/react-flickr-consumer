/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import LazyLoad from 'vanilla-lazyload';
import Post from '../../models/Post';
import { scrollToTop } from '../../utils/helpers';

import { showPostModal, hidePostModal } from '../../store/ui/actions';
import {
  getPosts,
  savePost,
  unsavePost,
  reset,
  setSearch,
} from '../../store/posts/actions';

import PostsGrid from '../PostsGrid/PostsGrid';
import PostModal from '../PostModal/PostModal';
import Search from '../Search/Search';
import { STORAGE_SERVICE } from '../../utils/constants';

class PostsContainer extends React.Component {
  componentDidMount() {
    scrollToTop();
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad({ element_selector: '.lazy' });
    }
    document.lazyLoadInstance.update();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPage === 0) {
      scrollToTop();
      if (this.props.detailsVisible) {
        this.props.hideDetailsHandler();
      }
    }

    if (prevProps.imageSize !== this.props.imageSize) {
      scrollToTop();
      this.props.resetHandler();
    }
  }

  componentWillUnmount() {
    this.props.resetHandler();
  }

  loadMorePosts = () => {
    const { getPostsHandler } = this.props;
    if (!this.props.isLoadingPosts) {
      getPostsHandler()
        .then((msg) => {
          if (msg === 'ok') {
            document.lazyLoadInstance.update();
          }
        })
        .catch();
    }
  }

  isLoadingFirstPage = () => this.props.isLoadingPosts && this.props.currentPage === 0;

  getDisplayString = () => {
    const { service, searchString } = this.props;
    if (service === STORAGE_SERVICE) {
      return 'Saved posts';
    }

    return searchString || '';
  }

  render() {
    const {
      posts,
      service,
      searchString,
      searchType,
      searchHandler,
      showPostsInfo,
      imageSize,
      detailsVisible,
      detailsData,
      hasMorePosts,
      showDetailsHandler,
      hideDetailsHandler,
      savePostHandler,
      unsavePostHandler,
      totalPosts,
    } = this.props;

    const noPosts = !posts.length && !hasMorePosts ? (
      <div className="py-5 bg-light content-page text-center">
        <p>There are no posts</p>
      </div>
    ) : null;

    return (
      <div className="py-5 bg-light content-page">
        <Container fluid className="flickr-feed-page">
          {!this.isLoadingFirstPage() && (
            <Search
              service={service}
              totalPosts={totalPosts}
              searchString={searchString}
              searchType={searchType}
              searchHandler={searchHandler}
            />
          )}
          {noPosts || (
            <PostsGrid
              imageSuffix={Post.getSuffixForSize(imageSize)}
              posts={posts}
              showPostsInfo={showPostsInfo}
              hasMorePosts={hasMorePosts}
              loadMore={this.loadMorePosts}
              showDetails={showDetailsHandler}
              savePost={savePostHandler}
              unsavePost={unsavePostHandler}
              searchHandler={searchHandler}
            />
          )}
        </Container>
        {!!posts.length && detailsVisible && (
          <PostModal
            searchHandler={searchHandler}
            isVisible={detailsVisible}
            hide={() => hideDetailsHandler()}
            post={detailsData}
          />
        )}
      </div>
    );
  }
}

PostsContainer.defaultProps = {
  detailsData: null,
  totalPosts: 0,
};

PostsContainer.propTypes = {
  isLoadingPosts: PropTypes.bool.isRequired,
  service: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number,
  searchString: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  hasMorePosts: PropTypes.bool.isRequired,
  showPostsInfo: PropTypes.bool.isRequired,
  imageSize: PropTypes.string.isRequired,
  detailsVisible: PropTypes.bool.isRequired,
  detailsData: PropTypes.shape(Post.propTypesPostShape),

  getPostsHandler: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
  savePostHandler: PropTypes.func.isRequired,
  unsavePostHandler: PropTypes.func.isRequired,
  showDetailsHandler: PropTypes.func.isRequired,
  hideDetailsHandler: PropTypes.func.isRequired,
  resetHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoadingPosts: state.posts.isLoading,
  posts: state.posts.posts,
  currentPage: state.posts.currentPage,
  totalPosts: state.posts.totalPosts,
  searchString: state.posts.searchString,
  searchType: state.posts.searchType,
  hasMorePosts: state.posts.hasMorePosts,
  showPostsInfo: state.ui.showPostsInfo,
  imageSize: state.ui.imageSize,
  detailsVisible: state.ui.detailsModalVisible,
  detailsData: state.ui.detailsModalPostData,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPostsHandler: () => dispatch(getPosts(ownProps.service)),
  searchHandler: searchData => dispatch(setSearch(searchData)),
  savePostHandler: postData => dispatch(savePost(postData)),
  unsavePostHandler: flickrId => dispatch(unsavePost(flickrId)),
  showDetailsHandler: postData => dispatch(showPostModal(postData)),
  hideDetailsHandler: () => dispatch(hidePostModal()),
  resetHandler: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
