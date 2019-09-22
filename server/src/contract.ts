interface IUser extends Document {
	email: string;
	password: string;
	accountVerificationToken: string;
	isVerified: boolean;
	passwordRecoveryToken?: string;
	passwordRecoveryExpiration?: Date;
}

/*
    Register
    Endpoint: "/register"
    Method: POST
    Request body should contain an object of type IUser
*/

/*
    Email verification
    Endpoint: "/verify/:token"
    Method: GET
*/

/*
    Login
    Endpoint: "/login"
    Method: POST
    Request body should contain an object of type IUser
    Returns x-auth-token in header
*/

/*
    Password recovery - e-mail form
    Endpoint: "/forgot"
    Method: GET
    Renders a page containing a form in which user types in his e-mail
*/

/*
    Password recovery
    Step 1st - generate token and send e-mail
    Endpoint: "/forgot"
    Method: POST
*/

/*
    Password recovery - new password form
    Endpoint: "/recover/:token"
    Method: GET
    Renders a page containing a form in which user types in his new password
*/

/*
    Password recovery
    Step 2nd - verify token and update password
    Endpoint: "/recover/:token"
    Method: POST
*/
