import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailGateway } from './mail.gateway';
import { configuration } from 'src/configs';

@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Assurez-vous d'importer ConfigModule si vous utilisez ConfigService
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.transport.host'), // Replace with your SMTP server host
          port: configService.get('mail.transport.port'), // Replace with your SMTP server port (common ports are 587 or 465)
          secure: configService.get('mail.transport.secure'), // Set to true if your SMTP server uses secure connection (TLS)
          auth: {
            user: configService.get('mail.auth.user'), // Replace with your email address
            pass: configService.get('mail.auth.pass'), // Replace with your email password (consider using environment variables for security)
          },
        },
        // transport: {
        //   host: 'mail.optico.dev', // Replace with your SMTP server host
        //   port: 465, // Replace with your SMTP server port (common ports are 587 or 465)
        //   secure: true, // Set to true if your SMTP server uses secure connection (TLS)
        //   auth: {
        //     user: 'support@optico.dev', // Replace with your email address
        //     pass: '0n3@L1f3', // Replace with your email password (consider using environment variables for security)
        //   },
        // },
      }),
      inject: [ConfigService], // Injectez ConfigService pour l'utiliser dans useFactory
    }),
  ],
  controllers: [MailController, MailGateway],
  providers: [MailService],
})
export class MailModule {}
