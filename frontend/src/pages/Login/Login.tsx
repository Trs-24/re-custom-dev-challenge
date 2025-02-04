import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import validator from "validator";

import styles from "./Login.module.scss";
import { availableRoutes } from "../../routes/availableRoutes";
import { useCallback, useState } from "react";
import { warningToast } from "../../utils/toastHandlers";
import { authService } from "../../api/services";
import useAuthorization from "../../hooks/useAuthorization";
import { setAccessToken } from "../../utils/storageHandlers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setIsAuthorized } = useAuthorization();

  const loginHandler = useCallback(() => {
    if (email && password && validator.isEmail(email)) {
      authService.login({ email, password }).then(({ access_token }) => {
        if (access_token) {
          setAccessToken(access_token);
          setIsAuthorized(true);
          navigate(availableRoutes.DASHBOARD);
        }
      });
    } else {
      warningToast("Invalid email or password");
    }
  }, [email, password]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.text}>Please enter your credentials</div>
        <div className={styles.inputs}>
          <TextField
            label="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": { color: "#fff" },
              "& .MuiFormLabel-root": { color: "#fff" },
            }}
          />
          <TextField
            type="password"
            label="Password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": { color: "#fff" },
              "& .MuiFormLabel-root": { color: "#fff" },
            }}
          />
        </div>
        <div className={styles.buttons}>
          <Button startIcon={<LoginIcon />} onClick={loginHandler}>
            Login
          </Button>
          <div>Don't have an account? Please register</div>
          <Button
            startIcon={<AppRegistrationIcon />}
            onClick={() => navigate(availableRoutes.REGISTER)}
            color="secondary"
          >
            Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
