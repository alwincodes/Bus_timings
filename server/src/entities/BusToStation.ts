import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Bus from "./Bus";
import Station from "./Station";

@Entity()
class BusToStation {
    @PrimaryGeneratedColumn()
    public busToStationId!: number;

    @Column()
    public busId!: number;

    @Column()
    public stationId!: number;

    @Column()
    public time!: string;

    @ManyToOne(() => Bus, (bus) => bus.busToStation, { onDelete: "CASCADE" })
    public bus!: Bus;

    @ManyToOne(() => Station, (st) => st.busToStation, { onDelete: "CASCADE" })
    public station!: Station;
}

export default BusToStation;
