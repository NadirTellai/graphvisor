import type { Meta, StoryObj } from '@storybook/react';

import {Graph} from './Graph';
import {circleNodesData, linkLabelData, specificStylingData} from "./GraphData"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'GraphVisor',
  component: Graph,
  argTypes: {
      nodeType: { control: 'radio', options: ['circle', 'image'] },
      nodeClassName: {
          control: 'select',
          options: ['Default (no class)', 'red-color-class', 'blue-color-class', 'green-color-class'],
      },
      linkClassName: {
          control: 'select',
          options: ['Default (no class)', 'red-color-class', 'blue-color-class', 'green-color-class'],
          mapping: {'red-color-class': 'red-link ', 'blue-color-class': 'blue-link', 'green-color-class': 'green-link', 'Default (no class)': ''}
      },
      linkLabelClassName: {
          control: 'select',
          options: ['Default (no class)', 'red-color-class', 'blue-color-class', 'green-color-class'],
      },
      titleClassName: {
          control: 'select',
          options: ['Default (no class)', 'red-color-class', 'blue-color-class', 'green-color-class'],
      }
  }
} satisfies Meta<typeof Graph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CircleNodes: Story = {
  args: {
      data: circleNodesData,
      nodeSize: 30,
      distance: 200,
      color: '#25274d',
      nodeType: "circle",
      directedLinks: false,
      enableDrag: true,
//      onClick?: (node: node) => any
  },
};

export const ImageNodes: Story = {
    args: {
        ...CircleNodes.args,
        nodeType: 'image'
    }
}

export const DirectedLinks: Story = {
    args: {
        ...CircleNodes.args,
        nodeSize: 20,
        directedLinks: true
    }
}

export const LinkLabel: Story = {
    args: {
        ...CircleNodes.args,
        data: linkLabelData
    }
}

export const GlobalStyling: Story = {
    args: {
        ...CircleNodes.args,
        data: linkLabelData,
        nodeClassName: "red-color-class",
        linkClassName: "blue-color-class",
        linkLabelClassName: "green-color-class",
        titleClassName: "red-color-class",
    }
}

export const SpecificStyling: Story = {
    args: {
        ...CircleNodes.args,
        data: specificStylingData
    }
}