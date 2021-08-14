import redis from 'redis';
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
});

const opts = {
    storeClient: redisClient,
    points: 5, // Number of points
    duration: 5, // Per second(s)
    keyPrefix: 'rateLimiter', // must be unique for limiters with different purpose
};

const rateLimiterRedis = new RateLimiterRedis(opts);

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await rateLimiterRedis.consume(request.ip);
        return next();
    } catch (error) {
        throw new AppError("Too many requests", 429);
    }
}
