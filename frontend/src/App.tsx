import { RouterProvider } from "react-router-dom";
import AuthorizationProvider from "./providers/Authorization/AuthorizationProvider";
import router from "./routes/router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthorizationProvider>
        <RouterProvider router={router} />
      </AuthorizationProvider>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;

