export interface IPayAuth {
    _id: string;
    email: string;
    exp: number;
    iat: number;
    role: string;
}

export interface IUser {
    _id?: string;
    email?: string;
    exp?: number;
    iat?: number;
    role?: string;
    name?: string;
    password?: string;
    state?: string;
    city?: string;
    country?: string;
    workExperience?: number;
    phone?: number;
    location?: object;
    image?: string;
}

export interface IResponse {
    message: string;
    success: Boolean;
    data?: any;
    error?: any;
}

export interface IServiceResponse extends IResponse {
    statusCode: number;
}

export interface ICommonServices {
    statusCode: number;
    data: IResponse
}

export interface ICommonController extends IResponse {

}
