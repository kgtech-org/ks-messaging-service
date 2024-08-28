import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { SendNotificationDto } from './dto/send-notification.dto';
import { SendMultipleNotificationDto } from './dto/send-multiple-notification.dto';
import { TopicSubscriptionDto } from './dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/device')
  sendToDevice(@Body() createNotificationDto: SendNotificationDto) {
    return this.notificationService.sendToDevice(createNotificationDto);
  }

  @Post('/devices')
  sendToDevices(@Body() createNotificationDto: SendMultipleNotificationDto) {
    return this.notificationService.sendToMultipleDevices(
      createNotificationDto,
    );
  }

  @Post('/topic')
  sendToTopic(@Body() createNotificationDto: SendNotificationDto) {
    return this.notificationService.sendToTopic(createNotificationDto);
  }

  @Post('/topics')
  sendToTopics(@Body() createNotificationDto: SendMultipleNotificationDto) {
    return this.notificationService.sendToMultipleTopics(createNotificationDto);
  }

  @Post('/subscribe')
  subscribeToTopic(@Body() subscribeToTopicDto: TopicSubscriptionDto) {
    return this.notificationService.subscribeToTopic(subscribeToTopicDto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
