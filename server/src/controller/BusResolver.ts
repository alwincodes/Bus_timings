import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import Bus, { BusType } from "../entities/Bus";

@InputType()
class BusInput {
    @Field()
    name: string;

    @Field()
    type: BusType;

    @Field()
    route: string;
}

@Resolver(() => Bus)
class BusResolver {
    //mutation // todo add auth
    @Mutation(() => Bus, { nullable: true })
    async addBus(@Arg("busData") data: BusInput): Promise<Bus | undefined> {
        const bsRepo = getRepository(Bus);
        const bus = bsRepo.create({ ...data });
        return bsRepo.save(bus);
    }
}

export default BusResolver;
