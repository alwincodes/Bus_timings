import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import BusToStation from "./BusToStation";

export enum BusType {
    PRIVATE = "private",
    KSRTC = "ksrtc",
}
registerEnumType(BusType, {
    name: "BusType",
    description: "Types of buses either state owned or private",
});

@ObjectType()
@Entity()
class Bus {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: "varchar", nullable: true, default: "not-given" })
    name: string;

    @Field(() => BusType)
    @Column({ type: "enum", enum: BusType })
    type: BusType;

    @Field()
    @Column()
    route: string;

    /* all the station and timing for the bus */
    @Field(() => [BusToStation], { nullable: true })
    @OneToMany(() => BusToStation, (bsts) => bsts.bus)
    busToStation: BusToStation[];

    @Field()
    @UpdateDateColumn()
    updatedDate: Date;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}

export default Bus;
