import { Module } from '@nestjs/common';
import { SharedModuleModule } from 'src/shared-module/shared-module.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import {ActionsDoctorsResolver} from "./actions-doctor/actions.doctor.resolver"
import {ActionsDoctorsService} from "./actions-doctor/actions.doctor.services"
import {DoctorEntity} from "./entity/doctor.entity"
import {DoctorResolver} from "./doctor.resolver"
import {DoctorService} from "./doctor.service"



@Module({
  // imports: [SharedModuleModule],
  // imports: [SharedModuleModule],
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [
    DoctorResolver,
    DoctorService
    // ActionsDoctorsResolver,
    // ActionsDoctorsService
    // PatientRepoResolver,
    // PatientRepoService,
    // ProgramDataResolver,
    // ProgramDataService,
    // JwtService,
  ],
})
export class DoctorProfileModule {}



// import { PatientRepoResolver } from './patient-repo/patient-repo.resolver';
// import { PatientRepoService } from './patient-repo/patient-repo.service';
// import { ProgramDataResolver } from './program-data/program-data.resolver';
// import { ProgramDataService } from './program-data/program-data.service';
// import { SharedModuleModule } from 'src/shared-module/shared-module.module';
// import { JwtService } from 'src/authentication/guards/jwt.service';


