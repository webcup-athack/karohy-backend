import { IAPIResponse, IError } from '../types/types';
import { Response } from 'express';

function formatError(err: { code: string; message: string }): IError {
  return {
    code: err.code,
    message: err.message,
  };
}

interface IFormatApiResponseObjArg {
  status: number | string;
  message?: string;
  datas?: object;
  error?: IError;
}

function formatAPIResponse(
  response: Response,
  args: IFormatApiResponseObjArg,
): Response {
  const isSuccess = (status: number) => {
    return !(status >= 400 && status < 600);
  };

  const responseJson: IAPIResponse = {
    success: isSuccess(args.status as number),
    message: args.message || '',
    datas: isSuccess(args.status as number) ? args.datas : null,
  };

  if (!isSuccess(args.status as number)) {
    if (args.error) {
      responseJson.error = formatError(args.error);
    }
  }

  return response.status(args.status as number).json(responseJson);
}

export { formatAPIResponse, formatError };
