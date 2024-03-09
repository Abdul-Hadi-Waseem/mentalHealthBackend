import { Module } from '@nestjs/common';
import { PatientRepoResolver } from './patient-repo/patient-repo.resolver';
import { PatientRepoService } from './patient-repo/patient-repo.service';
import { ProgramDataResolver } from './program-data/program-data.resolver';
import { ProgramDataService } from './program-data/program-data.service';
import { SharedModuleModule } from 'src/shared-module/shared-module.module';
import { JwtService } from 'src/authentication/guards/jwt.service';

@Module({
  imports: [SharedModuleModule],
  providers: [
    PatientRepoResolver,
    PatientRepoService,
    ProgramDataResolver,
    ProgramDataService,
    JwtService,
  ],
})
export class PatientModule {}
