interface IUser extends Document {
    email: string;
    password: string;
}

/*
    Login
    Endpoint: "/login"
    Method: POST
    Request body should contain an object of type IUser
    Returns x-auth-token in header
*/

/*
    Register
    Endpoint: "/register"
    Method: POST
    Request body should contain an object of type IUser
*/

/*
    Email verification
    Endpoint: "/register/:token"
    Method: POST
*/

/*
    Password recovery
    Step 1st - generate token and send e-mail
    Endpoint: "/forgot/:email"
    Method: GET
*/

/*
    Password recovery
    Step 2nd - verify token and update password
    Endpoint: "/forgot/:token"
    Method: PUT
*/