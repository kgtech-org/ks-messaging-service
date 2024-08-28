import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';

@Controller()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @MessagePattern('createOtp')
  create(@Payload() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @MessagePattern('findAllOtp')
  findAll() {
    return this.otpService.findAll();
  }

  @MessagePattern('findOneOtp')
  findOne(@Payload() id: number) {
    return this.otpService.findOne(id);
  }

  @MessagePattern('updateOtp')
  update(@Payload() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(updateOtpDto.id, updateOtpDto);
  }

  @MessagePattern('removeOtp')
  remove(@Payload() id: number) {
    return this.otpService.remove(id);
  }
}
