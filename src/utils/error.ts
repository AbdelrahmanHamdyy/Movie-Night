class ReqError extends Error {
  statusCode?: number;
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ReqError.prototype);
  }
}

export default ReqError;
