import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import AppNavbar from '../AppNavbar/AppNavbar';
import AppRoutes from '../routes/AppRoutes';
import ErrorModal from '../ErrorModal/ErrorModal';

import { initialize, hideErrorModal } from '../../store/ui/actions';


class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.initialize();
  }

  render() {
    const {
      isInitialized,
      errorModalVisible,
      errorModalData,
      closeErrorModalHandler,
    } = this.props;

    if (!isInitialized) {
      return (
        <div className="loading-screen">
          <div className="loading-container">
            <Spinner animation="grow" size="lg" />
          </div>
        </div>
      );
    }

    return (
      <>
        <AppNavbar />
        <AppRoutes />
        {errorModalVisible && (
          <ErrorModal
            isOpen={errorModalVisible}
            data={errorModalData}
            closeHandler={closeErrorModalHandler}
          />
        )}
      </>
    );
  }
}

App.defaultProps = {
  errorModalData: null,
};

App.propTypes = {
  isInitialized: PropTypes.bool.isRequired,
  errorModalVisible: PropTypes.bool.isRequired,
  errorModalData: PropTypes.shape({}),

  initialize: PropTypes.func.isRequired,
  closeErrorModalHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isInitialized: state.ui.isInitialized,
  errorModalVisible: state.ui.errorModalVisible,
  errorModalData: state.ui.errorModalData,
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize()),
  closeErrorModalHandler: () => dispatch(hideErrorModal()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
