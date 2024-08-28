import { PartialType } from '@nestjs/mapped-types';
import { SendNotificationDto } from './send-notification.dto';

export class UpdateNotificationDto extends PartialType(SendNotificationDto) {}
