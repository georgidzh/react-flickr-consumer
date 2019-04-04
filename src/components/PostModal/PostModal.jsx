import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Modal,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Tags from '../PostItem/Tags/Tags';
import Description from '../PostItem/Description/Description';
import Post from '../../models/Post';
import LoadingImg from '../LoadingImg/LoadingImg';

const PostModal = ({
  isVisible,
  hide,
  post,
  searchHandler,
}) => (
  <Modal
    show={isVisible}
    onHide={hide}
    size="lg"
    aria-labelledby="post-details-modal-title"
    id="post-details-modal"
  >
    <Modal.Header closeButton>
      <Modal.Title id="post-details-modal-title">
        <h5 className={!post.title.length ? 'text-muted' : null}>
          <span className="post-title">
            <span className="mr-1">Title:</span>
            {post.title.length ? post.title : 'No Title' }
          </span>
        </h5>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container>
        <Row>
          <Col xs={12} md={5} className="text-center">
            <LoadingImg
              src={`${post.imgBaseUrl}${Post.modalImgUrlEnding}`}
              alt="Flickr post"
              data-test="loading-image"
            />
          </Col>
          <Col xs={12} md={7}>
            <div className="text-block-container">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                Open on Flickr
              </a>
              <br />
            </div>
            <div className="text-block-container">
              <h6>Author:</h6>
              <a href={post.authorLink} target="_blank" rel="noopener noreferrer">
                {post.author}
              </a>
            </div>
            <Description description={post.description} data-test="description" />
            <div className="text-block-container">
              <h6>Published at:</h6>
              <span className="published-at">{moment.unix(post.publishedAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
            {post.createdAt && (
              <div className="text-block-container">
                <h6>Saved at:</h6>
                <span className="created-at">{moment.unix(post.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
              </div>
            )}
            <Tags data-test="tags" limit={false} tags={post.tags} searchHandler={searchHandler} />
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  </Modal>
);

PostModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
  post: PropTypes.shape(Post.propTypesPostShape).isRequired,
};

export default PostModal;
