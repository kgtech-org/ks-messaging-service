import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async create(@Body() createMailDto: SendMailDto) {
    return await this.mailService.send(createMailDto);
  }

  @Post('otp')
  async sendOtp(@Body() createSmDto: { otp: string; to: string }) {
    return await this.mailService.sendOtp(createSmDto);
  }
}
