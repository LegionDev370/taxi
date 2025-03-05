import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({
  name: 'customers',
})
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  username: string;
  @Column()
  password: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  phone_number: string;
  @Column({ unique: true })
  email: string;
  @Column({
    default: false,
  })
  is_email_verified: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
