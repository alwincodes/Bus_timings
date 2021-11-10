import React from "react";
import { useGetAllStationNameQuery } from "../graphql/generated/graphql";

interface StationSelectorProps {
    changeHandler: React.ChangeEventHandler<HTMLSelectElement>;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
    changeHandler,
}) => {
    const { data, loading, error } = useGetAllStationNameQuery();
    return (
        <div>
            {loading && <h6>loading....</h6>}
            <select onChange={changeHandler}>
                <optgroup label="select a station">
                    {data && //if data exists then display options
                        data.getAllStation.map((station) => {
                            return (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            );
                        })}
                </optgroup>
            </select>
        </div>
    );
};
