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
import Confirm from '../render-props/Confirm/Confirm';
import { IMAGE_SMALL } from '../../utils/constants';

const AppNavbar = (props) => {
  const {
    savedPostsCount,
    showPostsInfo,
    togglePostsInfoHandler,
    imageSize,
    toggleImageSizeHandler,
    deletePostsHandler,
    locationPath,
  } = props;
  const deleteConfirmMessage = 'All saved posts are going to be permanently removed from the browser storage? Are you sure about this?';
  const resizeConfirmMessage = 'This will cause the page to reload. Are you sure?';
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="/recent">Flickr now</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link as={NavLink} eventKey={2} to="/recent"> */}
          <NavLink exact to="/recent" className="nav-link" isActive={() => locationPath === '/recent'}>
            Recent photos
          </NavLink>
          <NavLink exact className="nav-link" to="/saved" isActive={() => locationPath === '/saved'}>
            Saved photos&nbsp;
            <Badge variant="light">{savedPostsCount}</Badge>
          </NavLink>
          <NavDropdown title="Options" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={togglePostsInfoHandler}>
              {`${showPostsInfo ? 'Hide' : 'Show'} Post Information`}
            </NavDropdown.Item>
            <Confirm text={resizeConfirmMessage}>
              {confirm => (
                <NavDropdown.Item
                  onClick={confirm(toggleImageSizeHandler)}
                >
                  { imageSize === IMAGE_SMALL ? 'Small square images' : 'Larger images' }
                </NavDropdown.Item>
              )}
            </Confirm>
            <NavDropdown.Divider />
            <Confirm text={deleteConfirmMessage}>
              {confirm => (
                <NavDropdown.Item
                  onClick={confirm(deletePostsHandler)}
                  className={savedPostsCount ? 'text-danger' : null}
                  disabled={!savedPostsCount}
                >
                  Unsave All Posts
                </NavDropdown.Item>
              )}
            </Confirm>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  locationPath: PropTypes.string.isRequired,
  showPostsInfo: PropTypes.bool.isRequired,
  imageSize: PropTypes.string.isRequired,
  savedPostsCount: PropTypes.number.isRequired,
  togglePostsInfoHandler: PropTypes.func.isRequired,
  toggleImageSizeHandler: PropTypes.func.isRequired,
  deletePostsHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
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
