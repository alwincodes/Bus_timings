import { Select } from "@chakra-ui/react";
import React from "react";
import { useGetAllStationNameQuery } from "../graphql/generated/graphql";

interface StationSelectorProps {
    changeHandler: React.ChangeEventHandler<HTMLSelectElement>;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
    changeHandler,
}) => {
    const { data, loading, error } = useGetAllStationNameQuery();
    if (error) {
        return (
            <div>
                <h5>{error.message}</h5>
            </div>
        );
    }
    return (
        <div>
            {loading && <h6>loading....</h6>}
            <Select
                onChange={changeHandler}
                placeholder="select a station"
                style={{ margin: "20px 0px" }}
            >
                {data && //if data exists then display options
                    data.getAllStation.map((station) => {
                        return (
                            <option key={station.id} value={station.id}>
                                {station.name}
                            </option>
                        );
                    })}
            </Select>
        </div>
    );
};
