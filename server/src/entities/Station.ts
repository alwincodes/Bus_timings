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

@ObjectType()
@Entity()
class Station {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: "varchar" })
    name: string;

    @Field()
    @Column({ type: "varchar" })
    location: string;

    @Field()
    @Column()
    address: string;

    /* all the buses that interacts with the station */
    @Field()
    @OneToMany(() => BusToStation, (bsts) => bsts.station)
    busToStation: BusToStation[];

    @Field()
    @UpdateDateColumn()
    updatedDate: Date;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}

export default Station;
