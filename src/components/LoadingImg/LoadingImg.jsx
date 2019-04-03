/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

class LoadingImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  handleLoaded() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { isLoaded } = this.state;
    const style = !isLoaded ? { display: 'none' } : null;
    const img = (
      <img
        onLoad={this.handleLoaded.bind(this)}
        src={this.props.src}
        alt={this.props.alt}
        style={style}
      />
    );
    const loader = (
      <div style={{ padding: '50px' }}>
        <Spinner animation="grow" />
      </div>
    );
    return this.state.isLoaded ? img : (
      <React.Fragment>
        { loader }
        { img }
      </React.Fragment>
    );
  }
}

LoadingImg.defaultProps = {
  alt: 'Flickr post',
};

LoadingImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default LoadingImg;
