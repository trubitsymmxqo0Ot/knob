export class ApiError extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static AlreadyError(message: string) {
        return new ApiError(402, message);
    }

    static UnknownError(status: number, message: string, errors?: unknown) {
        return {status, message, errors}; 
    }

    static BadRequest(message: string, errors?: unknown) {
        return new ApiError(400, message, errors = []);
    }
}