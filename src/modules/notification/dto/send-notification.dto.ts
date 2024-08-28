export class SendNotificationDto {
  title: string;
  body: string;
  receiver: string;
  data: Record<string, any>;
}
