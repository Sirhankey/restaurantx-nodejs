/* eslint-disable prettier/prettier */
interface ICreateClientDto {
    
    id?: string;
    name: string;
    contact: Contact;
    address: Address;
    createdAt: Date;
}

export { ICreateClientDto };
