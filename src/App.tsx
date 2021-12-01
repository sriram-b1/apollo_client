import React, { useState } from 'react';
import './App.css';

import  {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client"
import Metro from './metro/metro';
import Route from './route/route';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Offcanvas } from 'react-bootstrap';

// Initialize Apollo Client

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000"
  }),
  credentials: "same-origin"
})

function App() {
  const [toggleCanvas, setToggle] = useState(false)
  const [selectedRoute, setRoute] = useState("")

  const onCardClicked = (id: string) => {
    setRoute(id)
    setToggle(true)
  }


  return (
    <ApolloProvider client = {client}>
    <div>
      <Metro cardClicked={onCardClicked}/>
      <Offcanvas show={toggleCanvas} onHide={()=>setToggle(!toggleCanvas)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Route: <Badge bg="warning">{selectedRoute}</Badge></Offcanvas.Title>
      </Offcanvas.Header>
        <Offcanvas.Body>
          <Route routeId={Number(selectedRoute)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
    </ApolloProvider>
  );
}

export default App;
