import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MailGateway {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'send-mail' })
  async send(@Payload() sendMailDto: SendMailDto) {
    return await this.mailService.send(sendMailDto);
  }

  @MessagePattern({ cmd: 'send-mail-otp' })
  async sendOtp(@Payload() createSmDto: { otp: string; to: string }) {
    console.log('send-mail-otp', createSmDto.otp, createSmDto.to );
    return await this.mailService.sendOtp(createSmDto);
  }

  @MessagePattern({ cmd: 'send-mail-ticket' })
  async sendTicket(@Payload() data) {
    return await this.mailService.sendTicket(data);
  }
}
