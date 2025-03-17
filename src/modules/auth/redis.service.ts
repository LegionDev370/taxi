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
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
    });
  }
  async setOtp(phone_number: string, otp: string, ttl = 30) {
    await this.redis.setex(`user:${phone_number}`, ttl, otp);
  }
  async getOtp(key: string) {
    return await this.redis.get(key);
  }

  async setTempUser(user: { phone_number: string; password: string }) {
    await this.redis.setex(
      `temp_user:${user.phone_number}`,
      100,
      JSON.stringify(user),
    );
  }

  async setIncrementKey(phone_number: string) {
    await this.redis.incr(`attempts_user:${phone_number}`);
    await this.redis.expire(`attempts_user:${phone_number}`, 50);
  }

  async delOtp(phone_number: string) {
    await this.redis.del(`user:${phone_number}`);
  }

  async delTempUser(key: string) {
    await this.redis.del(`temp_user:${key}`);
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
