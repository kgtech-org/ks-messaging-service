import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Messaging } from 'firebase-admin/lib/messaging/messaging';
import {
  MessagingOptions,
  MessagingPayload,
  MulticastMessage,
  TokenMessage,
} from 'firebase-admin/lib/messaging/messaging-api';
import { SendMultipleNotificationDto, SendNotificationDto, TopicSubscriptionDto, UpdateNotificationDto } from './dto';

@Injectable()
export class NotificationService {
  fcm: Messaging;
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.fcm = this.firebaseApp.messaging();
  }

  /**
   *
   * @param sendNotificationDto
   * @returns
   */
  async sendToDevice(sendNotificationDto: SendNotificationDto) {
    const { title, body, receiver, data } = sendNotificationDto;
    const message: TokenMessage = {
      notification: {
        title,
        body,
      },
      data,
      token: receiver,
    };
    const res = await this.fcm.send(message);
    return res;
  }

  /**
   *
   * @param sendMultipleNotificationDto
   * @returns
   */
  async sendToMultipleDevices(
    sendMultipleNotificationDto: SendMultipleNotificationDto,
  ) {
    const { title, body, receivers, data } = sendMultipleNotificationDto;
    const message: MulticastMessage = {
      notification: {
        title,
        body,
      },
      data,
      tokens: receivers,
    };
    const res = await this.fcm.sendEachForMulticast(message);
    return res;
  }

  async sendToTopic(sendNotificationDto: SendNotificationDto) {
    const { receiver, title, body, data } = sendNotificationDto;
    const payload: MessagingPayload = {
      notification: {
        title,
        body,
      },
      data,
    };
    const options: MessagingOptions = {
      priority: 'high',
    };
    const res = await this.fcm.sendToTopic(receiver, payload, options);
    return res;
  }

  async sendToMultipleTopics(
    sendMultipleNotificationDto: SendMultipleNotificationDto,
  ) {
    top;
    const { receivers, title, body, data } = sendMultipleNotificationDto;
    const promises = receivers.map((receiver) => {
      const payload: MessagingPayload = {
        notification: {
          title,
          body,
        },
        data,
      };
      const options: MessagingOptions = {
        priority: 'high',
      };
      return this.fcm.sendToTopic(receiver, payload, options);
    });
    const res = await Promise.all(promises);
    return res;
  }

  async subscribeToTopic(topicSubscriptionDto: TopicSubscriptionDto) {
    const { tokens, token, topic } = topicSubscriptionDto;
    const recipients = tokens || [token];
    return await this.fcm.subscribeToTopic(recipients, topic);
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
