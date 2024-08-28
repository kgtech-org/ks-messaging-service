import { Injectable } from '@nestjs/common';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { SmsProviders } from 'src/models';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    // private readonly redisRepo: RedisRepository,
  ) {}

  async send(createSmDto: CreateSmDto) {
    try {
      let response;
      if (createSmDto.sendingDate) {
        // const { sendingDate, ...data } = createSmDto;
        // return await this.postPoneJob('sms', new Date(sendingDate), data);
      }
      switch (process.env.SMS_PROVIDER) {
        case SmsProviders.AFRIK_SMS:
          await this.sendWithAfrikSms(createSmDto);
          break;
        case SmsProviders.MESSAGE_BIRD:
          return this.sendWithMessageBird(createSmDto);
        case SmsProviders.TWILIO:
          return this.sendWithTwilio(createSmDto);
          break;
        default:
          response = await this.sendWithAfrikSms(createSmDto);
      }
      return { message: 'SMS sent successfully', response };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async sendOtp(createSmDto: { otp: string; to: string }) {
    return await this.send({
      message: `Your OTP is ${createSmDto.otp}`,
      phones: [createSmDto.to],
    });
  }

  // private async postPoneJob(task: string, sendingDate: Date, data) {
  //   const nowTime = new Date().getTime();
  //   const sendingTime = sendingDate.getTime();
  //   const ttl = sendingTime - nowTime;
  //   if (ttl <= 0) return;

  // const res = await this.redisRepo.setInArray(
  //   task,
  //   'pending',
  //   data,
  //   // ttl,
  // );
  // return { message: 'SMS postponed successfully', id: res };
  // }

  private sendWithAfrikSms(createSmDto: CreateSmDto) {
    const promises = [];
    createSmDto.phones.map((phone) =>
      promises.push(
        lastValueFrom(
          this.httpService.get(process.env.SMS_URL, {
            timeout: 10000,
            params: {
              ClientId: process.env.SMS_CLIENT_ID,
              ApiKey: process.env.SMS_API_KEY,
              SenderId: process.env.SMS_SENDER_ID,
              Message: createSmDto.message,
              MobileNumbers: phone,
            },
          }),
        ),
      ),
    );
    return Promise.all(promises);
  }

  private sendWithMessageBird(createSmDto: CreateSmDto) {
    return `This action sends a sms with message bird ${createSmDto.message}`;
  }

  private sendWithTwilio(createSmDto: CreateSmDto) {
    return `This action sends a sms with twilio ${createSmDto.message}`;
  }

  async findAllPending() {
    // const res = await this.redisRepo.getArray('sms', 'pending');
    // return res;
  }

  async findOnePending(index: number) {
    // return await this.redisRepo.getArrayElement('sms', 'pending', index);
  }

  updatePending(id: number, updateSmDto: UpdateSmDto) {
    return `This action updates a #${id} sm ${updateSmDto.message}`;
  }

  async removePending(id: number) {
    // await this.redisRepo.removeFromArray('sms', 'pending', id);
    return { message: 'SMS removed successfully', id };
  }
}
