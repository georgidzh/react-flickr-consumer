import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  Navbar,
  Nav,
  NavDropdown,
  Badge,

} from 'react-bootstrap';

import { togglePostsInfo, toggleImageSize } from '../../store/ui/actions';
import { deleteAllPosts } from '../../store/posts/actions';
import Confirm from '../Confirm/Confirm';
import { IMAGE_SMALL, CONFIRM_MSG_DELETE_POSTS, CONFIRM_MSG_RESIZE_IMAGES } from '../../utils/constants';
import PostsCounter from '../PostsCounter/PostsCounter';

export function AppNavbar(props) {
  const {
    savedPostsCount,
    showPostsInfo,
    togglePostsInfoHandler,
    imageSize,
    toggleImageSizeHandler,
    deletePostsHandler,
    locationPath,
    showing,
    totalPosts,
  } = props;
  return (
    <Navbar className="app-navbar" bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="/recent">Flickr now</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link as={NavLink} eventKey={2} to="/recent"> */}
          <NavLink exact to="/recent" className="nav-link recent-link" isActive={() => locationPath === '/recent'}>
            Recent photos
          </NavLink>
          <NavLink exact className="nav-link saved-link" to="/saved" isActive={() => locationPath === '/saved'}>
            Saved photos&nbsp;
            <Badge className="saved-count" variant="light">{savedPostsCount}</Badge>
          </NavLink>
          <NavDropdown title="Options" id="basic-nav-dropdown">
            <NavDropdown.Item className="toggle-info-btn" onClick={togglePostsInfoHandler}>
              {`${showPostsInfo ? 'Hide' : 'Show'} Post Information`}
            </NavDropdown.Item>
            <Confirm text={CONFIRM_MSG_RESIZE_IMAGES} className="confirm-resize">
              {confirm => (
                <NavDropdown.Item
                  className="toggle-image-size-btn"
                  onClick={confirm(toggleImageSizeHandler)}
                >
                  { imageSize === IMAGE_SMALL ? 'Small square images' : 'Larger images' }
                </NavDropdown.Item>
              )}
            </Confirm>
            <NavDropdown.Divider />
            <Confirm text={CONFIRM_MSG_DELETE_POSTS} className="confirm-unsave">
              {confirm => (
                <NavDropdown.Item
                  onClick={confirm(deletePostsHandler)}
                  className={savedPostsCount ? 'text-danger delete-posts-btn' : 'delete-posts-btn'}
                  disabled={!savedPostsCount}
                >
                  Unsave All Posts
                </NavDropdown.Item>
              )}
            </Confirm>
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          {totalPosts > 0 && showing > 0 && (
            <PostsCounter
              total={totalPosts}
              showing={showing}
              data-test="posts-counter"
            />
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  showing: PropTypes.number.isRequired,
  locationPath: PropTypes.string.isRequired,
  showPostsInfo: PropTypes.bool.isRequired,
  imageSize: PropTypes.string.isRequired,
  savedPostsCount: PropTypes.number.isRequired,
  togglePostsInfoHandler: PropTypes.func.isRequired,
  toggleImageSizeHandler: PropTypes.func.isRequired,
  deletePostsHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalPosts: state.posts.totalPosts,
  showing: state.posts.posts.length,
  locationPath: state.router.location.pathname,
  showPostsInfo: state.ui.showPostsInfo,
  imageSize: state.ui.imageSize,
  savedPostsCount: state.ui.savedPostsCount,
});

const mapDispatchToProps = dispatch => ({
  togglePostsInfoHandler: () => dispatch(togglePostsInfo()),
  toggleImageSizeHandler: () => dispatch(toggleImageSize()),
  deletePostsHandler: () => dispatch(deleteAllPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
