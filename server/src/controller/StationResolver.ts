import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { getManager } from "typeorm";
import Bus from "../entities/Bus";
import BusToStation from "../entities/BusToStation";
import Station from "../entities/Station";

@Resolver(() => BusToStation)
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
}

export default StationResolver;
