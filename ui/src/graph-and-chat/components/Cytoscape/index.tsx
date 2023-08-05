import React, { useEffect, FC } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscapejs from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { fcoseBilkentOptions, initStylesheet } from './utils'

Cytoscapejs.use(fcose);

const data = [
  { data: { id: 'one', label: 'Node 1' } },
  { data: { id: 'two', label: 'Node 2' } },
  { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
];

const CytoscapeComp: FC = () => {
  useEffect(() => {}, []);
  return (
    <CytoscapeComponent
      elements={data}
      style={{ height: '100vh' }}
      layout={fcoseBilkentOptions}
      minZoom={0.5}
      maxZoom={2}
      stylesheet={initStylesheet}
    />
  );
};

export default CytoscapeComp;
