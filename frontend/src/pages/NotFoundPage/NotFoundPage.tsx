import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import styles from "./NotFoundPage.module.scss";
import { availableRoutes } from "../../routes/availableRoutes";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.text}>page not found</div>
        <Button
          startIcon={<HomeIcon />}
          onClick={() => navigate(availableRoutes.MAIN)}
          color="secondary"
        >
          Main page
        </Button>
      </div>
    </div>
  );
}
