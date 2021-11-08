import { Redis } from "ioredis";
import { Request, Response } from "express";

export default interface Context {
    req: Request;
    res: Response;
    redisClient: Redis;
}
