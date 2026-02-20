import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Form } from "./form.entity";
import { FormService } from "./form.service";
import { FormController } from "./form.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Form])
    ],
    controllers: [
        FormController
    ],
    providers: [
        FormService
    ],
    exports: [
        FormService
    ]
})
export class FormModule {}