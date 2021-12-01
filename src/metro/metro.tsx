import React from "react";
import { gql, useQuery } from "@apollo/client"
import { Alert, Badge, Card, Spinner } from "react-bootstrap";


// Define the query
const METRO = gql`
    query metro {
        metro {
            id
            display_name
        }
    }
`;


export default function Metro({cardClicked}:any) {
    const { loading, data, error} = useQuery(METRO);
    console.log("Data: ", data, error)
    if(loading) return <h3>Loading <Spinner animation="grow" variant="primary"/></h3>
    // if(error) return <p>Something went wrong: {error.message}</p>
    if(error) return (
        <Alert variant="danger">
            {error.message}
        </Alert>
    )
    return (
        <div style={{display: 'flex', flexWrap: "wrap", justifyContent:"flex-start", margin:"auto"}}>
            {data && data.metro && data.metro.map((route: any) => (
                <Card border="primary" key={route.id} style={{width: "16rem", margin: "1rem", cursor: 'pointer'}} className="mb-2" onClick={() => cardClicked(route.id)}>
                    <Card.Body>
                        <Card.Title>Route <Badge pill>{route.id}</Badge></Card.Title>
                        <Card.Text>{route.display_name}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}