import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { generate } from 'otp-generator';
@Injectable()
export class RedisService {
  redis: Redis;
  constructor() {
    this.redis = new Redis({
      port: process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT, 10)
        : 6379,
      host: 'redis',
      password: '3322',
    });
  }
  setOtp(phone_number: string, otp: string, ttl = 30) {
    this.redis.setex(`user:${phone_number}`, ttl, otp);
  }
  getOtp(key: string) {
    return this.redis.get(key);
  }

  setTempUser(user: { phone_number: string; password: string }) {
    this.redis.setex(
      `temp_user:${user.phone_number}`,
      100,
      JSON.stringify(user),
    );
  }

  setIncrementKey(phone_number: string) {
    this.redis.incr(`attempts_user:${phone_number}`);
    this.redis.expire(`attempts_user:${phone_number}`, 50);
  }

  delOtp(phone_number: string) {
    this.redis.del(`user:${phone_number}`);
  }

  delTempUser(key: string) {
    this.redis.del(`temp_user:${key}`);
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
