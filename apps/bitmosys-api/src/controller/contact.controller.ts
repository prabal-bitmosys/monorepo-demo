// contact.controller.ts
import { Controller, Post, Body , Get } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { Contact } from '../contact.entity';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() contactData: Partial<Contact>): Promise<Contact> {
    const completeContact: Contact = { ...contactData } as Contact;
    return this.contactService.create(completeContact);
  }


  @Get()
  async findAllContacts(): Promise<Contact[]> {
    return this.contactService.findAll();
  }
  
}
