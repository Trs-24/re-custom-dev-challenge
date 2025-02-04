import { AxiosError, AxiosResponse } from "axios";

import { errorToast } from "./toastHandlers";

type ErrorData = { message?: { message?: string } } | undefined;

export const errorHandler = (error: AxiosError): Promise<AxiosResponse> => {
  let errorMessage;

  try {
    const data = error?.response?.data as ErrorData;
    if (data) {
      errorMessage = data.message?.message;
    }
  } catch (e) {
    errorMessage = "API service unavailable";
  }

  errorToast(errorMessage);

  return Promise.reject(error.response || ({ data: null, status: 500 } as AxiosResponse));
};
