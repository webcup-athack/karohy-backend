import { IGlobalError, IErrorStatusCode } from '../types/types';

const ERROR_STATUS_CODE: IErrorStatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};

const ERROR: IGlobalError = {
  TOKEN: {
    INVALID_OR_EXPIRED_TOKEN: {
      status: ERROR_STATUS_CODE.UNAUTHORIZED,
      code: 'ERROR_INVALID_OR_EXPIRED_TOKEN',
      message: 'Invalid or expired token',
    },
    MISSING_TOKEN: {
      status: ERROR_STATUS_CODE.BAD_REQUEST,
      code: 'ERROR_MISSING_TOKEN',
      message: 'Token is missing',
    },
  },
  AUTHENTICATION: {
    INVALID_EMAIL: {
      status: ERROR_STATUS_CODE.BAD_REQUEST,
      code: 'ERROR_INVALID_EMAIL',
      message: 'Invalid email address',
    },
    INVALID_PASSWORD: {
      status: ERROR_STATUS_CODE.BAD_REQUEST,
      code: 'ERROR_INVALID_PASSWORD',
      message: 'Invalid password',
    },
    INVALID_CREDENTIALS: {
      status: ERROR_STATUS_CODE.UNAUTHORIZED,
      code: 'ERROR_INVALID_CREDENTIALS',
      message: 'Authentication failed, email or password is invalid',
    },
    EMAIL_ALREADY_EXISTS: {
      status: ERROR_STATUS_CODE.CONFLICT,
      code: 'ERROR_EMAIL_ALREADY_EXISTS',
      message: 'An user with this email already exists',
    },
    UNKNOWN_ERROR: {
      status: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
      code: 'ERROR_AUTHENTICATION_FAILED',
      message: 'Authentication failed',
    },
  },
};

export { ERROR };
