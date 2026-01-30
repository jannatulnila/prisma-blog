import { NextFunction, Request, Response } from "express"
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";
    let errorDetails = err;

    //PrismaClientValidationError
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "You provide Incorrect field type or missing fields!";

    }
    //PrismaClientKnownRequestError
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            statusCode = 400;
            errorMessage = "Record not found. The requested data does not exist."
        }
        else if (err.code === "P2002") {
            statusCode = 400;
            errorMessage = "Duplicate value error. This data already exists"
        }
        else if (err.code === "P2003") {
            statusCode = 400;
            errorMessage = "Foreign key constraint failed. Related record not found."
        }

    }
    //PrismaClientUnknownRequestError
    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        errorMessage = "Error occurred during query execution "
    }
    //PrismaClientRustPanicError
    else if (err instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = 500;
        errorMessage =
            "Internal server error. Prisma engine crashed unexpectedly.";
    }
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P100") {
            statusCode = 401;
            errorMessage ="Authentiaction failed. Please check your creditials!";
        }
        else if (err.errorCode === "P101") {
            statusCode = 400;
            errorMessage ="Can't reach database server";
        }
    }


    res.status(statusCode)
    res.json({
        message: errorMessage,
        error: errorDetails
    })
}


export default errorHandler