import {
    Arg,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { getManager, getRepository } from "typeorm";
import Station from "../entities/Station";
import rateLimiter from "../middleware/rateLimit";

@InputType()
class StationInput {
    @Field()
    name: string;

    @Field()
    location: string;

    @Field()
    address: string;
}

@Resolver(() => Station)
class StationResolver {
    @Query(() => [Station])
    async getAllStation(): Promise<Station[]> {
        const manager = getManager();
        const stations = await manager.find(Station, {
            relations: ["busToStation", "busToStation.bus"],
        });

        return stations;
    }

    @Query(() => Station, { nullable: true })
    @UseMiddleware(rateLimiter)
    async getStation(@Arg("id") id: number): Promise<Station | undefined> {
        const manager = getManager();
        const station = manager.findOne(Station, {
            where: `Station.id = '${id}'`,
            relations: ["busToStation", "busToStation.bus"],
        });
        return station;
    }

    //mutation // todo add auth
    @Mutation(() => Station, { nullable: true })
    async addStation(
        @Arg("stationData") data: StationInput
    ): Promise<Station | undefined> {
        const stRepo = getRepository(Station);
        const station = stRepo.create({ ...data });
        return stRepo.save(station);
    }
}

export default StationResolver;
