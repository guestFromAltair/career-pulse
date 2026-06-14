export interface User {
    id:        string;
    email:     string;
    firstName: string;
    lastName:  string;
    createdAt: string;
    updatedAt: string;
}

export interface JwtPayload {
    sub:    string;
    email:  string;
    iat?:   number;
    exp?:   number;
}

export interface AuthResponse {
    accessToken: string;
    user:        User;
}