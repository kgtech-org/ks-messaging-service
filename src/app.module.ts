import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/mail/mail.module';
import { SlackModule } from './modules/slack/slack.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { OtpModule } from './modules/otp/otp.module';
import { configuration } from './configs';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SmsModule } from './modules/sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // RedisModule.forRoot({
    //   type: 'single',
    //   url: `redis://${configuration().cache.host}:${configuration().cache.port}`, // ou l'adresse de votre serveur Redis
    // }),
    WhatsappModule,
    SmsModule,
    MailModule,
    NotificationModule,
    SlackModule,
    ScheduleModule.forRoot(),
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
