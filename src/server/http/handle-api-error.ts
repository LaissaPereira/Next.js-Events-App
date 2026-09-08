import { ZodError } from "zod"
import { AppError } from "@/server/errors/app-error"

export function handleApiError(error: unknown) {
    if (error instanceof ZodError) {
        return Response.json({
            message: "Validation failed",
            errors: error.flatten()
        },
        { status: 400 }
    )
    }
    if (error instanceof AppError) {
        const statusMap = {
            EMAIL_ALREADY_EXISTS: 409,
            INVALID_CREDENTIALS: 401,
            UNAUTHENTICATED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            VALIDATION_ERROR: 400,

        } satisfies Record<AppError["code"], number>

        return Response.json({
            message: error.message,
            code: error.code,
        },{
            status: statusMap[error.code]
        })
    }
    console.error(error)
    return Response.json({
        message: "Internal server error"
    },{
        status: 500
    })
}