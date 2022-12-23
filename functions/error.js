class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        //Capture the stack trace of the error to maintain reference to the error class
        Error.captureStackTrace(this, this.constructor);
    }
}

class SignUpError extends AuthenticationError{
    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        //Capture the stack trace of the error to maintain reference to the error class
        Error.captureStackTrace(this, this.constructor);
    }
}

class LoginError extends AuthenticationError{
    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        //Capture the stack trace of the error to maintain reference to the error class
        Error.captureStackTrace(this, this.constructor);
    }
}

class TokenError extends AuthenticationError{
    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        //Capture the stack trace of the error to maintain reference to the error class
        Error.captureStackTrace(this, this.constructor);
    }
}

class MessageError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        //Capture the stack trace of the error to maintain reference to the error class
        Error.captureStackTrace(this, this.constructor);
    }
}

exports.AuthenticationError = AuthenticationError;
exports.SignUpError = SignUpError;
exports.LoginError = LoginError;
exports.TokenError = TokenError;
exports.MessageError = MessageError;