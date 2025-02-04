import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

import styles from "./Main.module.scss";
import { availableRoutes } from "../../routes/availableRoutes";

export default function Main() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.text}>Welcome to re-custom dev challenge</div>
        <h4>Try to login as admin with credentials: default@admin.com / 12345678</h4>
        <div className={styles.buttons}>
          <Button
            startIcon={<AppRegistrationIcon />}
            onClick={() => navigate(availableRoutes.REGISTER)}
            color="secondary"
          >
            Registration
          </Button>
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
