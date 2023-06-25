import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Test } from './LoginPage.styles';

const LoginPage = (props) => (
  <div className="LoginPageWrapper">
    Test content
  </div>
);

LoginPage.propTypes = {
  // bla: PropTypes.string,
};

LoginPage.defaultProps = {
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
)(LoginPage);
