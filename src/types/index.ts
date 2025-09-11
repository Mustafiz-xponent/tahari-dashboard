export interface IApiError {
  status: number;
  data: {
    error: {
      message: string;
    };
    [key: string]: unknown;
  };
}
