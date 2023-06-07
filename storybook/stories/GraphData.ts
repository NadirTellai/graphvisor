
export const circleNodesData = {
    nodes: [
        {id: 1, label: "A", image: "https://i.imgur.com/TLdotG8.png"},
        {id: 2, label: "B", image: "https://i.imgur.com/epYTzoC.png"},
        {id: 3, label: "C", image: "https://i.imgur.com/2znXJH4.png"},
    ],
    links: [
        {source: 1, target: 2},
        {source: 2, target: 3},
    ]
}

export const linkLabelData = {
    nodes: circleNodesData.nodes,
    links: [
        {source: 1, target: 2, label: "100 $"},
        {source: 2, target: 3, label: "125 $"},
    ]
}
export const specificStylingData = {
    nodes: [
        {id: 1, label: "A", className: "blue-color-class", titleClassName: "italic-text"},
        {id: 2, label: "B", className: "red-color-class", titleClassName: "bold-text blue-color-class"},
        {id: 3, label: "C", className: "green-color-class", titleClassName: "green-color-class"},
    ],
    links: [
        {source: 1, target: 2, label: "100 $", labelClassName: "italic-text", linkClassName: "", color: "blue"},
        {source: 2, target: 3, label: "125 $", labelClassName: "green-color-class", linkClassName: "bold-link", color: "green"},
    ]
}

/*
{ id: 0, src: 'https://i.imgur.com/TLdotG8.png' },
{ id: 1, src: 'https://i.imgur.com/epYTzoC.png' },
{ id: 2, src: 'https://i.imgur.com/VXnfTiy.png' },
{ id: 3, src: 'https://i.imgur.com/2znXJH4.png' },
{ id: 4, src: 'https://i.imgur.com/nFXbKat.png' },

 */