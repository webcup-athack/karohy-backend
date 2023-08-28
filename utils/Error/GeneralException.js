class GeneralException extends Error {
  constructor(code, message, status) {
    super(message);
    this.code = code;
    this.status = status || 400;
  }

  static formatException({ code, message, status }) {
    return new GeneralException(code, message, status);
  }
}

module.exports = GeneralException;
