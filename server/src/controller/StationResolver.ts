import {
    Arg,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { getManager, getRepository } from "typeorm";
import Bus from "../entities/Bus";
import BusToStation from "../entities/BusToStation";
import Station from "../entities/Station";

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
    @FieldResolver(() => Bus, { nullable: true })
    async bus(@Root() b2s: BusToStation): Promise<Bus | undefined> {
        const manager = getManager();
        return await manager.findOne(Bus, { where: `id = ${b2s.busId}` });
    }

    @Query(() => [Station])
    async getAllStation(): Promise<Station[]> {
        const manager = getManager();
        const stations = await manager.find(Station, {
            relations: ["busToStation"],
        });

        return stations;
    }

    @Query(() => Station, { nullable: true })
    async getStation(@Arg("id") id: number): Promise<Station | undefined> {
        const manager = getManager();
        const station = manager.findOne(Station, {
            where: `id = '${id}'`,
            relations: ["busToStation"],
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
