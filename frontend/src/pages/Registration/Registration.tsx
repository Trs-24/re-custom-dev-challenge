import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import validator from "validator";

import styles from "./Registration.module.scss";
import { availableRoutes } from "../../routes/availableRoutes";
import { useCallback, useState } from "react";
import { warningToast } from "../../utils/toastHandlers";
import { authService } from "../../api/services";
import useAuthorization from "../../hooks/useAuthorization";
import { setAccessToken } from "../../utils/storageHandlers";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setIsAuthorized } = useAuthorization();

  const registrationHandler = useCallback(() => {
    if (name && email && password && validator.isEmail(email)) {
      authService.register({ name, email, password }).then(({ access_token }) => {
        if (access_token) {
          setAccessToken(access_token);
          setIsAuthorized(true);
          navigate(availableRoutes.DASHBOARD);
        }
      });
    } else {
      warningToast("Invalid user data");
    }
  }, [email, password, name]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.text}>Please register</div>
        <div className={styles.inputs}>
          <TextField
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": { color: "#fff" },
              "& .MuiFormLabel-root": { color: "#fff" },
            }}
          />
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
          <Button startIcon={<AppRegistrationIcon />} onClick={registrationHandler}>
            Registration
          </Button>
          <div>Don't have an account? Please register</div>
          <Button
            startIcon={<LoginIcon />}
            onClick={() => navigate(availableRoutes.LOGIN)}
            color="secondary"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
