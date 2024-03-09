import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { PatientModule } from './patient/patient.module';
import { InstituteModule } from './institute/institute.module';
// import { DoctorModule } from './doctor/doctor.module';
import { DoctorProfileModule } from './doctor/doctor.module';
import { PaymentModule } from './payment/payment.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { WebsiteModule } from './website/website.module';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    TeacherModule,
    PatientModule,
    InstituteModule,
    // DoctorModule,
    DoctorProfileModule,
    PaymentModule,
    AuthenticationModule,
    WebsiteModule,
    SharedModuleModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      resolvers: { JSON: GraphQLJSON },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
