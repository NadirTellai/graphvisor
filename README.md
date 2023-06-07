# GraphVisor

> GraphVisor is a React component that facilitates the visualization of interactive, customizable, directed, and weighted graphs.

## Examples
Check out the interactive examples on the component's [Storybook page](https://graphvisor.storybook.nadir-tellai.com). 

## API

### GraphVisor

| Property | Description | Type | Default |
| --- | --- | --- |--- |
| **data** | The graph data object | {nodes: [node](#Nodes)[], links: [link](#Links)[]} |/|
| **nodeType** | The type of the node: circle or image. If it's an image, the image source must be provided in each node object | "image" / "circle" | "circle" |
| **nodeSize** | The size of the nodes | number | 25 |
| **directedLinks** | Specifies whether the link (edge) is directed or not | boolean | true |
| **enableDrag** | Specifies whether the nodes are draggable or not | boolean | true |
| **distance** | The distance between two nodes, or the length of the link | number | 200 |
| **color** | The color applied to the nodes and links | string | black |
| **nodeClassName** | The class name applied to all nodes | string | / |
| **linkClassName** | The class name applied to all links | string | / |
| **linkLabelClassName** | The class name applied to all link labels | string | / |
| **titleClassName** | The class name applied to all node titles | string | / |
| **onClick** | The function to be called when a node is clicked | ([node](#Nodes)) => void; | / |

### Nodes

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| **id** | The unique identifier of the node | string / number | / |
| **label** | The text shown under the node | string | / |
| **image** | The source of the image of the node (only used if **option.type** is 'image') | string | null |
| **className** | The class name given to the node | string | null |
| **titleClassName** | The class name given to the label of the node | string | null |

### Links

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| **source** | The ID of the source node | string / number | / |
| **target** | The ID of the target node | string / number | / |
| **label** | The label shown on the link | string | null |
| **labelClassName** | The class name given to the label of the link | string | null |
| **linkClassName** | The class name given to the link | string | null |
| **color** | The color of the link | string | by default, it uses the **options.color** |


