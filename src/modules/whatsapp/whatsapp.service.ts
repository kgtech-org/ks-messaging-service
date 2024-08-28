import { Inject, Injectable } from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import WhatsApp from 'whatsapp';
import { RequesterResponseInterface } from 'whatsapp/build/types/requester';
import {
  // MessageTemplateObject,
  MessagesResponse,
} from 'whatsapp/build/types/messages';
import {
  ComponentTypesEnum,
  LanguagesEnum,
  MessageTypesEnum,
  ParametersTypesEnum,
} from 'whatsapp/build/types/enums';

@Injectable()
export class WhatsappService {
  // wa: WhatsApp;
  constructor(@Inject('WHATSAPP') private whatsapp: WhatsApp) {}

  async send(createWhatsappDto: CreateWhatsappDto) {
    try {
      let $response: RequesterResponseInterface<MessagesResponse>;
      switch (createWhatsappDto.type) {
        case MessageTypesEnum.Text:
          $response = await this.sendText(createWhatsappDto);
          break;
        case MessageTypesEnum.Location:
          $response = await this.sendLocation(createWhatsappDto);
          break;
        case MessageTypesEnum.Template:
          $response = await this.sendTemplate(createWhatsappDto);
          break;
        case MessageTypesEnum.Document:
          $response = await this.sendDocument(createWhatsappDto);
          break;
        case MessageTypesEnum.Image:
          $response = await this.sendImage(createWhatsappDto);
          break;
        case MessageTypesEnum.Audio:
          $response = await this.sendAudio(createWhatsappDto);
          break;
        case MessageTypesEnum.Video:
          $response = await this.sendVideo(createWhatsappDto);
          break;
        default:
          $response = await this.sendText(createWhatsappDto);
      }
      const response = await $response.responseBodyToJSON();
      console.log('response', response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async sendOtp(data: { otp: string; to: string }) {
    const req: any = {
      name: 'phone_number_validation',
      components: [
        {
          type: ComponentTypesEnum.Body,
          parameters: [
            {
              type: ParametersTypesEnum.Text,
              text: data.otp,
            },
          ],
        },
        {
          type: ComponentTypesEnum.Button,
          sub_type: 'url',
          index: 0,
          parameters: [
            {
              type: ParametersTypesEnum.Text,
              text: data.otp,
            },
          ],
        },
      ],
      language: {
        // policystring: 'deterministic',
        code: LanguagesEnum.French,
      },
    };
    const $response = await this.whatsapp.messages.template(req, +data.to);
    return await $response.responseBodyToJSON();
  }

  async sendTicket(data: { event: any; tickets: any[]; to: string }) {
    try {
      // const eventTitleTemplate: any = {
      //   name: 'event_title',
      //   components: [
      //     {
      //       type: ComponentTypesEnum.Header,
      //       parameters: [
      //         {
      //           type: ParametersTypesEnum.Image,
      //           image: {
      //             link: data.event.cover,
      //           }
      //         },
      //       ],
      //     },
      //     {
      //       type: ComponentTypesEnum.Body,
      //       parameters: [
      //         {
      //           type: ParametersTypesEnum.Text,
      //           text: data.tickets.length,
      //         },
      //         {
      //           type: ParametersTypesEnum.Text,
      //           text: data.event.title,
      //         },
      //       ],
      //     },
      //   ],
      //   language: {
      //     // policystring: 'deterministic',
      //     code: LanguagesEnum.French,
      //   },
      // };

      // const $response = await this.whatsapp.messages.template(
      //   eventTitleTemplate,
      //   +data.to,
      // );

      const requests = [];
      data.tickets.forEach(async (ticket) => {
        const ticketTemplate: any = {
          name: 'ticket_qrcode',
          components: [
            {
              type: ComponentTypesEnum.Header,
              parameters: [
                {
                  type: ParametersTypesEnum.Image,
                  image: {
                    link: ticket.qrImage,
                  },
                },
              ],
            },
            {
              type: ComponentTypesEnum.Body,
              parameters: [
                {
                  type: ParametersTypesEnum.Text,
                  text: ticket.seatNumber,
                },
              ],
            },
          ],
          language: {
            // policystring: 'deterministic',
            code: LanguagesEnum.French,
          },
        };

        requests.push(
          this.whatsapp.messages.template(ticketTemplate, +data.to),
        );
      });

      const $responses = await Promise.all(requests);
      const $allResponses = [
        // $response.responseBodyToJSON(),
        ...$responses.map((res) => res.responseBodyToJSON()),
      ];

      return Promise.all($allResponses);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  private async sendText(createWhatsappDto: CreateWhatsappDto) {
    return await this.whatsapp.messages.text(
      { body: createWhatsappDto.body.message, preview_url: true },
      createWhatsappDto.phones[0],
    );
  }

  private async sendLocation(createWhatsappDto: CreateWhatsappDto) {
    return this.whatsapp.messages.location(
      createWhatsappDto.body,
      createWhatsappDto.phones[0],
    );
  }

  private async sendTemplate(createWhatsappDto: CreateWhatsappDto) {
    // MessageTemplateObject<ComponentTypesEnum>
    const req: any = {
      name: createWhatsappDto.body.name,
      components: [
        {
          type: ComponentTypesEnum.Body,
          parameters: [
            {
              type: ParametersTypesEnum.Text,
              text: '123456',
            },
          ],
        },
        {
          type: ComponentTypesEnum.Button,
          sub_type: 'url',
          index: 0,
          parameters: [
            {
              type: ParametersTypesEnum.Text,
              text: '123456',
            },
          ],
        },
      ],
      language: {
        // policystring: 'deterministic',
        code: createWhatsappDto.lang || LanguagesEnum.English_US,
      },
    };
    return this.whatsapp.messages.template(req, createWhatsappDto.phones[0]);
  }

  private async sendDocument(createWhatsappDto: CreateWhatsappDto) {
    return this.whatsapp.messages.document(
      createWhatsappDto.body,
      createWhatsappDto.phones[0],
    );
  }

  private async sendImage(createWhatsappDto: CreateWhatsappDto) {
    return this.whatsapp.messages.image(
      createWhatsappDto.body,
      createWhatsappDto.phones[0],
    );
  }

  private async sendAudio(createWhatsappDto: CreateWhatsappDto) {
    return this.whatsapp.messages.audio(
      createWhatsappDto.body,
      createWhatsappDto.phones[0],
    );
  }

  private async sendVideo(createWhatsappDto: CreateWhatsappDto) {
    return this.whatsapp.messages.video(
      createWhatsappDto.body,
      createWhatsappDto.phones[0],
    );
  }

  findAll() {
    return `This action returns all whatsapp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whatsapp`;
  }

  update(id: number, updateWhatsappDto: UpdateWhatsappDto) {
    return `This action updates a #${id} whatsapp`;
  }

  remove(id: number) {
    return `This action removes a #${id} whatsapp`;
  }
}
