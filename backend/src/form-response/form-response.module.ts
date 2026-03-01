import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormResponse } from "./form-response.entity";
import { FormResponseService } from "./form-response.service";
import { FormResponseController } from "./form-response.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([FormResponse])
    ],
    controllers: [FormResponseController],
    providers: [FormResponseService],
})
export class FormResponseModule {}