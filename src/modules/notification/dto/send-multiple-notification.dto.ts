export class SendMultipleNotificationDto {
  title: string;
  body: string;
  receivers: string[];
  data: Record<string, any>;
}
