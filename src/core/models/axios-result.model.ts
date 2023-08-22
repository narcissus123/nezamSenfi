export interface IAxiosResult {
  result: any;
  messageCode: number;
  message: string[];
  exception: any;
  httpStatusCode: number;
  errorFileds: string[];
}
