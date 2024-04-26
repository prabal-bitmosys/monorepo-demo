import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class FormsController {
  constructor(private formService: FormsService) {}

  @Post('form')
  @UseInterceptors(FileInterceptor('file'))
  getFormData(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.formService.getFormData(file, body);
  }
}
