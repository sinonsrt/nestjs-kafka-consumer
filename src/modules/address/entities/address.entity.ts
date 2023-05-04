import { User } from '@prisma/client';

export class AddressEntity {
  cep: string;
  street: string;
  district: string;
  number: string;
  city: string;
  user_id: number;
  is_main?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
