import { Controller, Param } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class WhatsappGateway {
  constructor(private readonly whatsappService: WhatsappService) {}

  @MessagePattern({ cmd: 'send-whatsapp-message' })
  async create(@Payload() createWhatsappDto: CreateWhatsappDto) {
    return await this.whatsappService.send(createWhatsappDto);
  }

  @MessagePattern({ cmd: 'send-whatsapp-otp' })
  async sendOtp(@Payload() data) {
    return await this.whatsappService.sendOtp(data);
  }

  @MessagePattern({ cmd: 'send-whatsapp-ticket' })
  async sendTicket(@Payload() data) {
    return await this.whatsappService.sendTicket(data);
  }

  @MessagePattern({ cmd: 'find-whatsapp-messages' })
  findAll() {
    return this.whatsappService.findAll();
  }

  @MessagePattern({ cmd: 'find-whatsapp-message' })
  findOne(@Payload() { id }: { id: string }) {
    return this.whatsappService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update-whatsapp-message' })
  update(@Payload() updateWhatsappDto: UpdateWhatsappDto) {
    return this.whatsappService.update(1, updateWhatsappDto);
  }

  @MessagePattern({ cmd: 'delete-whatsapp-message' })
  remove(@Param('id') id: string) {
    return this.whatsappService.remove(+id);
  }
}
