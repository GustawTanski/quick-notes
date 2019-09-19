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
    Endpoint: "/"
    Method: POST
    Request body should contain an object of type IUser
*/