import { UnauthorizedException } from "@nestjs/common";

export class UnAuthResponse extends UnauthorizedException {
    sucess: boolean = false;
    message: string;
    statusCode: number;
    
    constructor(statusCode: number = 401, message: string = "Unauthorized") {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

}