import { Navigate, Outlet, useLocation } from "react-router-dom";

import { availableRoutes } from "./availableRoutes";
import useAuthorization from "../hooks/useAuthorization";

export default function Protected() {
  const { isAuthorized } = useAuthorization();
  const { pathname } = useLocation();

  return pathname === availableRoutes.MAIN ||
    typeof isAuthorized === "undefined" ? null : isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to={availableRoutes.MAIN} />
  );
}
