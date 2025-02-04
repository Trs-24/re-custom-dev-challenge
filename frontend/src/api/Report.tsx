import { AxiosInstance, AxiosResponse } from "axios";

interface Report {
  download: (userId: string) => Promise<AxiosResponse>;
}

export default class ReportAPI implements Report {
  private request: AxiosInstance;

  constructor(request: AxiosInstance) {
    this.request = request;
  }

  async download(userId: string) {
    return this.request.get(`/pdf/${userId}`, {
      responseType: "blob",
    });
  }
}
