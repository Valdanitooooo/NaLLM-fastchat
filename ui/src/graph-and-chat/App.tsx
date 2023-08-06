import React, {useState} from "react";
import { Row, Col } from "antd";
// import Chat from "./components/ChatBot";
import Cytoscape from "./components/Cytoscape";
import Chat from "../chat-with-kg/App";

const App = () => {
  const [graphData, setGraphData] = useState();
  return (
    <Row>
      <Col flex={1}>
        <Cytoscape dataSource={graphData} />
      </Col>
      <Col style={{width: '50%'}}>
        <Chat updateData={setGraphData} />
      </Col>
    </Row>
  );
};

export default App;
