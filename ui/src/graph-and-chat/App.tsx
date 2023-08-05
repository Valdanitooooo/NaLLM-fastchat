import React from "react";
import { Row, Col } from "antd";
// import Chat from "./components/ChatBot";
import Cytoscape from "./components/Cytoscape";
import Chat from "../chat-with-kg/App";

const App = () => {
  return (
    <Row>
      <Col flex={1}>
        <Cytoscape />
      </Col>
      <Col style={{width: '50%'}}>
        <Chat />
      </Col>
    </Row>
  );
};

export default App;
