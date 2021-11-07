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

@Entity()
class Bus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: true, default: "not-given" })
    name: string;

    @Column({ type: "enum", enum: busType })
    type: busType;

    @Column()
    route: string;

    /* all the station and timing for the bus */
    @OneToMany(() => BusToStation, (bsts) => bsts.bus)
    busToStation: BusToStation[];

    @UpdateDateColumn()
    updatedDate: Date;

    @CreateDateColumn()
    createdDate: Date;
}

export default Bus;
