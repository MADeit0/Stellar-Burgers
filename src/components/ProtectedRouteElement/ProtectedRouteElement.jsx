import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const Protected = ({ onlyUnAuth, component }) => {
  const isAuthChecked = useSelector(({ auth }) => auth.isAuthChecked);
  const user = useSelector(({ auth }) => auth.user);

  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Loading...</p>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

Protected.defaultProps = {
  onlyUnAuth: false,
};

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
};
