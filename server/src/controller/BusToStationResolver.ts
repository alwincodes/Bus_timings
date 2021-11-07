import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import BusToStation from "../entities/BusToStation";

@InputType()
class BusToStationInput {
    @Field()
    busId: number;

    @Field()
    stationId: number;

    @Field({ description: "Time in 24H format eg: (10:45)" })
    time: string;
}

@Resolver(() => BusToStation)
class BusToStationResolver {
    //mutation // todo add auth
    @Mutation(() => BusToStation, { nullable: true })
    async addBusToStation(
        @Arg("bustostation") data: BusToStationInput
    ): Promise<BusToStation | undefined> {
        const bstostRepo = getRepository(BusToStation);
        const bus2st = bstostRepo.create({ ...data });
        return bstostRepo.save(bus2st);
    }
}

export default BusToStationResolver;
