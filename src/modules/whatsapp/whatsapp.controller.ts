import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post()
  async create(@Body() createWhatsappDto: CreateWhatsappDto) {
    return await this.whatsappService.send(createWhatsappDto);
  }

  @Post('otp')
  async sendOtp(@Body() data) {
    return await this.whatsappService.sendOtp(data);
  }

  @Post('ticket')
  async sendTicket(@Body() data) {
    return await this.whatsappService.sendTicket(data);
  }

  @Get()
  findAll() {
    return this.whatsappService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWhatsappDto: UpdateWhatsappDto,
  ) {
    return this.whatsappService.update(+id, updateWhatsappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappService.remove(+id);
  }
}
