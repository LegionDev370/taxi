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
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
  @Column()
  password: string;
  @Column({
    nullable: true,
  })
  first_name: string;
  @Column({
    nullable: true,
  })
  last_name: string;
  @Column()
  phone_number: string;
  @Column({
    nullable: true,
    unique: true,
  })
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
