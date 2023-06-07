import {link, node} from './types'

export function classNameSetter (
    localClassName: string|undefined,
    globalClassName: string|undefined,
    defaultClassName: string = ''
): string {
    let className: string = defaultClassName;
    if(localClassName) className += ' '+localClassName
    else className += ' '+globalClassName
    return className
}

export function validateData(
    nodes: node[] | [],
    links: link[] | []
): void {
    // check unique id for nodes
    let idMapper: any = {}
    for (let node of nodes){
        if(!idMapper[node.id]) idMapper[node.id] = true
        else throw new Error(`react-graph-visualizer: duplicate id ${node.id}`)
    }
    // check target and source exist in nodes array
    for (let link of links){
        if(!idMapper[link.source])
            throw new Error(`react-graph-visualizer: node with id ${link.source} doesn't exists`)
        if(!idMapper[link.target])
            throw new Error(`react-graph-visualizer: node with id ${link.target} doesn't exists`)
    }
}