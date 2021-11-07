import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import BusToStation from "./BusToStation";

export enum busType {
    PRIVATE = "private",
    KSRTC = "ksrtc",
}

@ObjectType()
@Entity()
class Bus {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: "varchar", nullable: true, default: "not-given" })
    name: string;

    @Field()
    @Column({ type: "enum", enum: busType })
    type: busType;

    @Field()
    @Column()
    route: string;

    /* all the station and timing for the bus */
    @Field(() => [BusToStation])
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
