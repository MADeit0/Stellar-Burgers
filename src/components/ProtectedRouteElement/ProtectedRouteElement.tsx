import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { ReactElement } from "react";

interface ProtectedProps {
  onlyUnAuth: boolean;
  component: ReactElement;
}

const Protected = ({ onlyUnAuth=false, component }: ProtectedProps) => {
  const isAuthChecked = useAppSelector(({ auth }) => auth.isAuthChecked);
  const user = useAppSelector(({ auth }) => auth.user);

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

export const OnlyUnAuth = ({
  component,
}: Pick<ProtectedProps, "component">) => (
  <Protected onlyUnAuth={true} component={component} />
);

