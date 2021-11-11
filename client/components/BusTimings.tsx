import { Box } from "@chakra-ui/layout";
import {
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
} from "@chakra-ui/table";
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
        <Box>
            <Table variant="striped" colorScheme="gray" size="sm">
                <TableCaption>Bus Timings</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Time</Th>
                        <Th>Name</Th>
                        <Th>Bus-Type</Th>
                        <Th>Route</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data &&
                        data.getStation?.busToStation?.map((d) => {
                            return (
                                <Tr key={d.busToStationId}>
                                    <Td>{d.time}</Td>
                                    <Td>{d.bus?.name}</Td>
                                    <Td>{d.bus?.type}</Td>
                                    <Td>{d.bus?.route}</Td>
                                </Tr>
                            );
                        })}
                </Tbody>
            </Table>
        </Box>
    );
};
