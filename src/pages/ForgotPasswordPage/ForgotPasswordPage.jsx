import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Test } from './ForgotPasswordPage.styles';

const ForgotPasswordPage = (props) => (
  <div className="ForgotPasswordPageWrapper">
    Test content
  </div>
);

ForgotPasswordPage.propTypes = {
  // bla: PropTypes.string,
};

ForgotPasswordPage.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordPage);
