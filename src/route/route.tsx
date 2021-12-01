import React from "react";
import { gql, useQuery } from "@apollo/client"
import { Alert, Spinner } from "react-bootstrap";

// Define the query
const ROUTE = gql`
    query route($routeId: Int!) {
        route(id: $routeId) {
            id
            display_name
        }
    }
`;

export default function Route({routeId}:any) {
    const { loading, data, error} = useQuery(ROUTE, {
        variables: {routeId}
    });
    console.log("Data: ", data, error)
    if(loading) return <h3>Loading <Spinner animation="grow" variant="warning" /></h3>
    if(error) return (
        <Alert variant="danger">
            {error.message}
        </Alert>
    )
    return (
        <table>
            <tr>
                <th>Train Number</th>
                <th>Source / Destination</th>
            </tr>
            {data && data.route && data.route.map((route: any) => (
                <tr key={route.id}>
                    <td>{route.id}</td>
                    <td>{route.display_name}</td>
                </tr>
            ))}
        </table>
    )
}