import { Module } from '@nestjs/common';
import { BlogService } from './blog/blog.service';
import { MainResolver } from './main/main.resolver';
import { MainService } from './main/main.service';
import { SharedModuleModule } from 'src/shared-module/shared-module.module';

@Module({
  imports: [SharedModuleModule],
  providers: [BlogService, MainResolver, MainService],
})
export class WebsiteModule {}
