import React from "react";
import { useGetStationTimingsQuery } from "../graphql/generated/graphql";

interface BusTimingsProps {
    stationId: number;
}

export const BusTimings: React.FC<BusTimingsProps> = ({ stationId }) => {
    const { data, loading, error } = useGetStationTimingsQuery({
        variables: { getStationId: stationId },
    });

    if (loading) {
        return <h6>Loading..</h6>;
    }
    if (error) {
        return <div>{JSON.stringify(error, null, 2)}</div>;
    }

    return (
        <div>
            <style jsx>
                {`
                    table,
                    th,
                    td {
                        border: 1px solid black;
                    }

                    td {
                        padding: 10px;
                    }
                `}
            </style>
            <table>
                <thead>
                    <tr>
                        <th>time</th>
                        <th>name</th>
                        <th>type</th>
                        <th>route</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.getStation?.busToStation?.map((d) => {
                            return (
                                <tr key={d.busToStationId}>
                                    <td>{d.time}</td>
                                    <td>{d.bus?.name}</td>
                                    <td>{d.bus?.type}</td>
                                    <td>{d.bus?.route}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
