import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { generate } from 'otp-generator';
@Injectable()
export class RedisService {
  redis: Redis;
  constructor() {
    this.redis = new Redis({
      port: 6379,
      host: '127.0.0.1',
      username: 'default',
      password: '3322',
    });
  }
  setOtp(userId: string, otp: string, ttl = 30) {
    this.redis.setex(`user:${userId}`, ttl, otp);
  }
  getOtp(userId: string) {
    return this.redis.get(`user:${userId}`);
  }
  generateOtpPassword() {
    const password = generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    return password;
  }
}
