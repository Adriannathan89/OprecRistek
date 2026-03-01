import { InternalServerErrorException } from "@nestjs/common";

export class ServerErrorResponse extends InternalServerErrorException {
    sucess: boolean = false;
    message: string;
    statusCode: number;

    constructor(message: string = "Internal Server Error") {
        super(message);
        this.message = message;
        this.statusCode = 500;
    }
}