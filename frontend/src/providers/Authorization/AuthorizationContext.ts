import { createContext, Dispatch, SetStateAction } from "react";

type AuthorizationContextType = {
  isAuthorized?: boolean;
  isAdmin?: boolean;
  setIsAuthorized: Dispatch<SetStateAction<boolean | undefined>>;
  setIsAdmin: Dispatch<SetStateAction<boolean | undefined>>;
  userId?: string;
  setUserId: Dispatch<SetStateAction<string | undefined>>;
};

export const AuthorizationContext = createContext<AuthorizationContextType>({
  isAuthorized: undefined,
  setIsAuthorized: () => {},
  isAdmin: undefined,
  setIsAdmin: () => {},
  userId: undefined,
  setUserId: () => {},
});
