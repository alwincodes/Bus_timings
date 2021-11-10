import { MiddlewareFn } from "type-graphql";
import Context from "../interface/Context";

const timeWindow = 60 * 10; // 10 minute
const maxLimit = 100;
//this function will rate limit users based on their ip address
const rateLimiter: MiddlewareFn<Context> = async (
    { context, info: _info },
    next
) => {
    const key = `rate-limit-${context.req.ip}`;
    const increment = await context.redisClient.incr(key);
    if (increment > maxLimit) {
        //15 request per 10 minute limit
        throw new Error("woah limit exceeded! try after 15 minutes");
    } else if (increment === 1) {
        context.redisClient.expire(key, timeWindow);
    }

    return next();
};

export default rateLimiter;
