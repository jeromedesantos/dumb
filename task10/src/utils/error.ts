export function appError(message: string, statusCode: number) {
  const error = new Error(message);
  (error as any).statusCode = statusCode;
  return error;
}

// harus pake new appError() -> karena method dari class
// export class appError extends Error {
//   statusCode: number;
//   name: string;
//   constructor(message: string, statusCode: number) {
//     super(message);
//     this.statusCode = statusCode;
//     this.name = "Error";
//   }
// }
