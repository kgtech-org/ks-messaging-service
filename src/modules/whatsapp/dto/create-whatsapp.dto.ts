import { LanguagesEnum, MessageTypesEnum } from 'whatsapp/build/types/enums';

export class CreateWhatsappDto {
  phones: number[];
  body: any;
  sendingDate?: string;
  lang?: LanguagesEnum;
  type: MessageTypesEnum;
}
