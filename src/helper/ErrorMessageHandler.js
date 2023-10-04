const errors = {
    UserDoesNotExists : 'UserDoesNotExists',
    InvalidCredentials: 'Invalid Credentials'
}


export const getErrorMessage = (errorName) => {
    switch (errorName) {
        case errors.InvalidCredentials:
           return "Username or password invalid."
        case errors.UserDoesNotExists:
            return "Username or password invalid."
        default:
            return;
    }
}
