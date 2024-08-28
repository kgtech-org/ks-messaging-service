import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';

@Controller()
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  async create(@Body() createSmDto: CreateSmDto) {
    return await this.smsService.send(createSmDto);
  }
  @Post('otp')
  async sendOtp(@Body() createSmDto: { otp: string; to: string }) {
    return await this.smsService.sendOtp(createSmDto);
  }

  @Get()
  async findAll() {
    return await this.smsService.findAllPending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smsService.findOnePending(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSmDto: UpdateSmDto) {
    return await this.smsService.updatePending(+id, updateSmDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.smsService.removePending(+id);
  }
}
