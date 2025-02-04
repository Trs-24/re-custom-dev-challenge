import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

import { availableRoutes } from "./availableRoutes.ts";
import Protected from "./Protected.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import Main from "../pages/Main/Main.tsx";
import Login from "../pages/Login/Login.tsx";
import Registration from "../pages/Registration/Registration.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import UserPage from "../pages/UserPage/UserPage.tsx";
import AddUser from "../pages/AddUser/AddUser.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={availableRoutes.MAIN} element={<Main />} />
      <Route element={<Protected />}>
        <Route path={availableRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={`${availableRoutes.DASHBOARD}/:id`} element={<UserPage />} />
        <Route path={availableRoutes.ADD_USER} element={<AddUser />} />
      </Route>
      <Route path={availableRoutes.REGISTER} element={<Registration />} />
      <Route path={availableRoutes.LOGIN} element={<Login />} />
      <Route path="*" element={<Navigate to={availableRoutes.NOT_FOUND} replace />} />
      <Route path={availableRoutes.NOT_FOUND} element={<NotFoundPage />} />
    </>
  )
);

export default router;
