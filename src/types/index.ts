export interface IApiError {
  status: number;
  data: {
    message: string;
    [key: string]: unknown;
  };
}
