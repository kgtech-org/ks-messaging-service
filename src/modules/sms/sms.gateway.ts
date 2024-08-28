import { Controller } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SmsGateway {
  constructor(private readonly smsService: SmsService) {}

  @MessagePattern({ cmd: 'send-sms-message' })
  async create(@Payload() createSmDto: CreateSmDto) {
    return await this.smsService.send(createSmDto);
  }
  @MessagePattern({ cmd: 'send-sms-otp' })
  async sendOtp(@Payload() createSmDto: { otp: string; to: string }) {
    return await this.smsService.sendOtp(createSmDto);
  }

  //   @Get()
  //   async findAll() {
  //     return await this.smsService.findAllPending();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.smsService.findOnePending(+id);
  //   }

  //   @Patch(':id')
  //   async update(@Param('id') id: string, @Body() updateSmDto: UpdateSmDto) {
  //     return await this.smsService.updatePending(+id, updateSmDto);
  //   }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string) {
  //     return await this.smsService.removePending(+id);
  //   }
}
