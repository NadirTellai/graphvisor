
export type node = {
    id: string | number,
    label: string,
    image?: string,
    className?: string,
    titleClassName?: string,
}
export type link = {
    source: string | number,
    target: string | number,
    label?: string,
    labelClassName?: string,
    linkClassName?: string,
    color?: string
}
export interface  propsType  {
    data: {
        nodes: node[] | [],
        links: link[] | []
    },
    nodeSize?: number,
    nodeType: "image" | "circle",
    distance?: number,
    color?: string,
    nodeClassName?: string,
    linkClassName?: string,
    linkLabelClassName?: string,
    titleClassName?: string,
    directedLinks?: boolean,
    enableDrag?: boolean,
    onClick?: (node: node) => any
}
export type optionsType = {
    nodeSize: number,
    nodeType: "image" | "circle",
    distance: number,
    color: string,
    nodeClassName: string,
    linkClassName: string,
    linkLabelClassName: string,
    titleClassName: string,
    directedLinks: boolean,
    enableDrag: boolean,
    onClick?(node: node): any
}
