import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Test } from './RegisterPage.styles';

const RegisterPage = (props) => (
  <div className="RegisterPageWrapper">
    Test content
  </div>
);

RegisterPage.propTypes = {
  // bla: PropTypes.string,
};

RegisterPage.defaultProps = {
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
)(RegisterPage);
