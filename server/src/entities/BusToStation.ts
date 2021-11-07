import { Field, ObjectType } from "type-graphql";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import Bus from "./Bus";
import Station from "./Station";

@ObjectType()
@Entity()
class BusToStation {
    @Field()
    @PrimaryGeneratedColumn()
    public busToStationId!: number;

    @Field()
    @Column()
    public busId!: number;

    @Field()
    @Column()
    public stationId!: number;

    @Field()
    @Column()
    public time!: string;

    @Field(() => Bus, { nullable: true })
    @ManyToOne(() => Bus, (bus) => bus.busToStation, { onDelete: "CASCADE" })
    @JoinColumn({ name: "busId" })
    public bus!: Bus;

    @Field(() => Station, { nullable: true })
    @ManyToOne(() => Station, (st) => st.busToStation, { onDelete: "CASCADE" })
    @JoinColumn({ name: "stationId" })
    public station!: Station;
}

export default BusToStation;
