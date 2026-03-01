import { NotFoundException } from "@nestjs/common";

export class NotFoundResponse extends NotFoundException {
    sucess: boolean = false;
    message: string;
    statusCode: number;

    constructor(message: string = "Resource Not Found") {
        super(message);
        this.message = message;
        this.statusCode = 404;
    }
}