import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { AuthorizationContext } from "./AuthorizationContext";
import { getAccessToken } from "../../utils/storageHandlers";
import { UserRole } from "../../api/User";

export default function AuthorizationProvider({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>();
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>();
  const [userId, setUserId] = useState<string | undefined>();

  const context = {
    isAuthorized,
    setIsAuthorized,
    isAdmin,
    setIsAdmin,
    userId,
    setUserId,
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const decoded = jwtDecode(token) as JwtPayload & { role: UserRole };
      setIsAdmin(decoded.role === UserRole.ADMIN);
      setUserId(decoded.sub);
    }
    setIsAuthorized(Boolean(token));
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (token && isAuthorized) {
      const decoded = jwtDecode(token) as JwtPayload & { role: UserRole };
      setIsAdmin(decoded.role === UserRole.ADMIN);
      setUserId(decoded.sub);
    } else {
      setIsAdmin(undefined);
      setUserId(undefined);
    }
  }, [isAuthorized]);

  return <AuthorizationContext.Provider value={context}>{children}</AuthorizationContext.Provider>;
}
