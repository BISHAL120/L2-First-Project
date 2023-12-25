import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericError } from "../interfaces/error";

const handleZodError = (error: ZodError): TGenericError => {

    const errorSources: TErrorSources = error.issues.map((issu: ZodIssue) => {
        return {
            path: issu.path[issu.path.length - 1],
            message: issu.message,
        }
    })

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    }
};

export default handleZodError;