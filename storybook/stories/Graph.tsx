import React from 'react';
import {propsType} from "../../src/types"
import GraphVisor from "graphvisor";
import "./graph.css"

export const Graph = (props: propsType) => {
  return (
      <div style={{height: 350, width: "90%", marginRight: "auto", marginLeft: "auto"}}>
        <GraphVisor
            {...props}
            className="graph"
            style={{height: "100%", width: "100%"}}
        />
      </div>

  );
};