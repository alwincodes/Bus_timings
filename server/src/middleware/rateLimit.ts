import { MiddlewareFn } from "type-graphql";
import Context from "../interface/Context";

const timeWindow = 60 * 10; // 10 minute
//this function will rate limit users based on their ip address
const rateLimiter: MiddlewareFn<Context> = async ({ context, info }, next) => {
    const key = `rate-limit-${context.req.ip}`;
    const increment = await context.redisClient.incr(key);
    if (increment > 15) {
        //15 request per 10 minute limit
        throw new Error("whoah limit exceeded");
    } else if (increment === 1) {
        context.redisClient.expire(key, timeWindow);
    }

    return next();
};

export default rateLimiter;
