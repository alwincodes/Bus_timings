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

@Resolver()
class BusResolver {
    //mutation // todo add auth
    @Mutation(() => Bus, { nullable: true })
    async addStation(@Arg("busData") data: BusInput): Promise<Bus | undefined> {
        const bsRepo = await getRepository(Bus);
        const bus = bsRepo.create({ ...data });
        return bsRepo.save(bus);
    }
}

export default BusResolver;
