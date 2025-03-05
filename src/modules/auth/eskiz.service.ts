import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EskizService {
  private token: string;
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async login() {
    const formData = new FormData();
    const eskiz_user = this.configService.get('ESKIZ_USER');
    const eskiz_password = this.configService.get('ESKIZ_PASSWORD');
    formData.set('email', eskiz_user);
    formData.set('password', eskiz_password);
    const response = this.httpService.post(
      'https://notify.eskiz.uz/api/auth/login',
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
    console.log(response);
  }
}
