import { Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import Station from "../entities/Station";

@Resolver(() => Station)
class StationResolver {
    @Query(() => [Station])
    async getAllStation(): Promise<Station[]> {
        const manager = getManager();
        const stations = await manager.find(Station);
        console.log(stations);
        return stations;
    }
}

export default StationResolver;
