import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false })
  terms: boolean;

  @Column({ nullable: true })
  file: Buffer; 
}
