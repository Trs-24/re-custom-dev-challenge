import { toast } from "react-toastify";

export const errorToast = (message?: string) =>
  toast.error(
    <div className="toast-error-main-text-wrapper">
      <div className="toast-error-main-text">Error</div>
      <div data-testid="toast" className="toast-error-secondary-text">
        {message || "Unknown error"}
      </div>
    </div>
  );

export const warningToast = (message: string) =>
  toast.warning(
    <div className="toast-error-main-text-wrapper">
      <div data-testid="toast" className="toast-error-secondary-text">
        {message}
      </div>
    </div>
  );

export const successToast = (message: string) =>
  toast.success(
    <div className="toast-error-main-text-wrapper">
      <div data-testid="toast" className="toast-error-secondary-text">
        {message}
      </div>
    </div>
  );

export const infoToast = (message: string) =>
  toast.info(
    <div className="toast-error-main-text-wrapper">
      <div data-testid="toast" className="toast-error-secondary-text">
        {message}
      </div>
    </div>
  );
