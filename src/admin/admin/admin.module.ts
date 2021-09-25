import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports : [],
    providers : [AdminService],
    controllers : [AdminController],
    exports : []
})
export class AdminModule{}