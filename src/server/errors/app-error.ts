export type AppErrorCode = 
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_CREDENTIALS"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  

export class AppError extends Error {
    constructor(public code: AppErrorCode, message: string) {
        super(message)
        this.name = "AppError"
    }
}