import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import firebaseConfig from 'src/configs/firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.get<string>('type'),
      project_id: configService.get<string>('project_id'),
      private_key_id: configService.get<string>('private_key_id'),
      private_key: configService.get<string>('private_key'),
      client_email: configService.get<string>('client_email'),
      client_id: configService.get<string>('client_id'),
      auth_uri: configService.get<string>('auth_uri'),
      token_uri: configService.get<string>('token_uri'),
      auth_provider_x509_cert_url: configService.get<string>(
        'auth_provider_x509_cert_url',
      ),
      client_x509_cert_url: configService.get<string>('client_x509_cert_url'),
      universe_domain: configService.get<string>('universe_domain'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};
@Module({
  imports: [ConfigModule.forFeature(firebaseConfig)],

  controllers: [NotificationController],
  providers: [firebaseProvider, NotificationService],
})
export class NotificationModule {}
