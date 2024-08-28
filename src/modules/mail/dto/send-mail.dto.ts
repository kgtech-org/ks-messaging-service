export class SendMailDto {
  readonly subject: string;
  readonly message: string;
  readonly emails: string[];
  readonly sendingDate?: string;
}
