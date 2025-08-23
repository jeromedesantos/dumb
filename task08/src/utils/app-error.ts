export function appError(
  message: string = "Internal Server Error!",
  statusCode: number = 500
) {
  const error = new Error(message);
  (error as any).statusCode = statusCode;
  return error;
}
