import { Injectable, UploadedFile } from '@nestjs/common';

@Injectable()
export class FormsService {
  getFormData(@UploadedFile() file: Express.Multer.File, body: any) {
    console.log(file);
    console.log(body);
    return { success: true, message: 'Form Data Retrieved' };
  }
}
