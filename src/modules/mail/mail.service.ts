import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import Mailgen from 'mailgen';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Injectable()
export class MailService {
  mailGenerator: Mailgen;
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.mailGenerator = new Mailgen({
      theme: configService.get('mail.mailgen.theme'),
      product: {
        // Appears in header & footer of e-mails
        name: configService.get('resources.appname'),
        link: configService.get('resources.website'),
        // Optional product logo
        logo: configService.get('resources.logo'),
        logoHeight: configService.get('mail.mailgen.logoHeight'),
      },
    });
    // this.sendOtp({ otp: '123456', to: 'k0d3.s0n1k@gmail.com' });
  }

  async send(sendMailDto: SendMailDto) {
    try {
      const promises = [];
      sendMailDto.emails.map((email) =>
        promises.push(
          this.mailerService.sendMail({
            from: this.configService.get('mail.sender'),
            to: email,
            subject: sendMailDto.subject,
            text: sendMailDto.message,
          }),
        ),
      );
      return Promise.all(promises);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async sendTemplate(sendMailDto: any) {
    try {
      const html = this.mailGenerator.generate(sendMailDto.message);
      const promises = [];
      sendMailDto.emails.map((email) =>
        promises.push(
          this.mailerService.sendMail({
            from: this.configService.get('mail.sender'),
            to: email,
            subject: sendMailDto.subject,
            html,
          }),
        ),
      );
      return Promise.all(promises);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async sendOtp(data: { otp: string; to: string }) {
    const message = {
      body: {
        greeting: 'Cher',
        signature: 'Cordialement',
        name: 'utilisateur',
        title:
          'Vérification Email ' + this.configService.get('resources.appname'),
        action: {
          instructions:
            "Vous avez demandé une vérification de compte sur l'application " +
            this.configService.get('resources.appname') +
            '. Veuillez saisir ce code afin de procéder à cette vérification:  ',
          button: {
            color: this.configService.get('resource.primaryColor'), // Optional action button color
            text: data.otp,
            // link: 'https://app.optimiseimpots.com/otp',
          },
        },
        outro:
          "Si vous n'avez demandé aucune vérification d'email, veuillez ignorer cet e-mail.",
      },
    };
    return await this.sendTemplate({
      emails: [data.to],
      subject: 'OTP',
      message,
    });
  }

  async sendTicket(data: any) {
    const { user, tickets, event } = data;

    const message = {
      body: {
        name: user.firstName + ' ' + user.lastName,
        intro: 'Qr code de vos tickets pour ' + event.title,
        table: {
          data: tickets.map((item: any, i: number) => ({
            Ticket: 'Ticket  ' + (i + 1),
            Code: `<img src="cid:${item.id}-imageCid" alt="Ticket QR Code" width="200" height="200">`, // Embed image with width and height
          })),
          //   columns
        },
        outro:
          "Telecharger  l'application " +
          this.configService.get('resources.appname') +
          'sur Playstore et Appstore',
        //   button: "telcharger Trendz"

        // ... Add other relevant ticket details
      },
    };

    return await this.sendTemplate({
      emails: [user.email],
      subject: 'OTP',
      message,
    });
  }
}
