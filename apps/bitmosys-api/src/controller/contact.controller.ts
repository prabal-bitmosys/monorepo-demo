import { Controller, Post, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContactService } from '../service/contact.service';
import { Contact } from '../contact.entity';
import { Express } from 'express';
import { S3 } from 'aws-sdk';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createContact(@Body() contactData: Partial<Contact>, @UploadedFile() file: Express.Multer.File): Promise<Contact> {
    if (!file) {
      throw new Error('No file uploaded.');
    }

    const completeContact: Contact = { ...contactData } as Contact;

    // Upload file to S3
    const s3 = new S3({
      accessKeyId: 'AKIAW3MD6RKZHLWJ4TNK',
      secretAccessKey: '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',
    });
    
    const s3Params = {
      Bucket: 'bitmosys-demo',
      Key: `${file.originalname}`,
      Body: file.buffer
    };

    const s3Response = await s3.upload(s3Params).promise();

    // Save S3 URL to file string in the contact
    completeContact.file = s3Response.Location;

    return this.contactService.create(completeContact);
  }

  @Get()
  async findAllContacts(): Promise<Contact[]> {
    return this.contactService.findAll();
  }
}
