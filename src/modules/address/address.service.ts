import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './address.repository';
import env from 'src/config/env';
import { IAddressResponse } from './interfaces';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create({ cep, number, user_id }: CreateAddressDto) {
    const formattedAddres = await this.getFormattedAddress(cep, number);
    3;

    const address = {
      ...formattedAddres,
      user_id,
      is_main: true,
    };

    await this.addressRepository.create(address);
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  async remove(id: number) {
    return `This action removes a #${id} address`;
  }

  private async getFormattedAddress(
    cep: string,
    number: string,
  ): Promise<IAddress> {
    const response = await fetch(env.SEARCH_ADDRESS_API.replace('value', cep));

    const data = await response.json();

    const { logradouro, bairro, localidade } = data as IAddressResponse;

    return {
      cep,
      number,
      street: logradouro,
      district: bairro,
      city: localidade,
    };
  }
}

interface IAddress {
  cep: string;
  number: string;
  street: string;
  district: string;
  city: string;
}
