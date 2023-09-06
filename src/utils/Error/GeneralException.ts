class GeneralException extends Error {
  code: string = '';
  message: string = '';
  status: number = 0;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.message = message;
    this.code = code;
    this.status = status || 400;
  }

  static formatException({ code = 'UNKNOWN_ERROR', message = '', status = 500 }) {
    return new GeneralException(code, message, status);
  }
}

export default GeneralException;
