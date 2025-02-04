import { useContext } from "react";

import { AuthorizationContext } from "../providers/Authorization/AuthorizationContext";

export default function useAuthorization() {
  const context = useContext(AuthorizationContext);

  return context;
}
