import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import WhatsApp from 'whatsapp';
import { WhatsappGateway } from './whatsapp.gateway';

@Module({
  controllers: [WhatsappController, WhatsappGateway],
  providers: [
    WhatsappService,
    {
      provide: 'WHATSAPP',
      useFactory: () => {
        return new WhatsApp();
      },
    },
  ],
})
export class WhatsappModule {}
