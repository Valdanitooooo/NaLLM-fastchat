const pixelRatio = 1;
const EDGE_COLOR = 'rgb(156, 156, 156)';
const BLUR_COLOR = 'rgb(130,130,130)';
const OVERLAY_COLOR = '#0088cc';
const OVERLAY_OPACITY = 0.4;
const OVERLAY_NODE_PADDING = 10 * pixelRatio;
const GROUP_COLOR = '#555555';
export const GROUP_NODE_COLOR = 'rgb(64, 184, 191)';

const getPropertyValue = (ele: any, key: string, defaultValue: any) => {
  let value = defaultValue;

  if (ele && ele._private && ele._private.data && ele._private.data[key]) {
    value = ele._private.data[key];
  }
  return value || '';
};

export const initStylesheet: any = [
  {
    selector: 'node',
    style: {
      'font-size': '12px',
      'text-wrap': 'ellipsis',
      'text-valign': 'bottom',
      'text-max-width': '80px',
      'background-width': '60%',
      'background-height': '60%',
      label: (ele: any) => getPropertyValue(ele, 'title', '-'),
      color: (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
      'background-image': (ele: any) => getPropertyValue(ele, 'icon', 'question-circle'),
      'background-color': (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
      'text-outline-width': 2,
      'text-margin-y': 4,
      'text-outline-color': '#fff',
    },
  },
  {
    selector: 'node.nowrap',
    style: {
      'text-max-width': '80px',
      'text-wrap': 'wrap',
    },
  },
  {
    selector: 'node:selected',
    css: {
      opacity: 1,
      'background-image-opacity': 1,
      'overlay-color': OVERLAY_COLOR,
      'overlay-opacity': OVERLAY_OPACITY,
      'overlay-padding': OVERLAY_NODE_PADDING,
      // 'border-width': 6,
      // 'bounds-expansion': 4,
      // 'border-style': 'double',
      'border-opacity': 1,
      // 'border-color': (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
    },
  },
  {
    selector: 'node.dount-style',
    css: {
      'text-margin-y': 8,
    },
  },
  {
    selector: 'node.dount-style:selected',
    css: {
      'border-width': 0,
      'bounds-expansion': 0,
    },
  },
  {
    selector: 'edge',
    style: {
      opacity: 1,
      'curve-style': 'bezier',
      'source-arrow-shape': 'none',
      'line-dash-pattern': [8, 4],
      'target-arrow-shape':(ele: any) => getPropertyValue(ele, 'arrow', 'triangle'),
      width: 1,
      'font-size': '10px',
      label: (ele: any) => getPropertyValue(ele, 'title', '-'),
      color: (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
      'line-color': (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
      'text-background-color': 'green', // (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
      'text-rotation': 'autorotate',
      'text-outline-width': 2,
      'text-outline-color': '#fff',
      'text-wrap': 'wrap',
      'line-height': 1.5,
    },
  },
  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'background-color': 'red',
      'line-color': 'red',
      'target-arrow-color': 'red',
      'source-arrow-color': 'red',
      'line-style': 'dotted',
    },
  },
  {
    selector: 'edge:selected',
    css: {
      opacity: 1,
      'background-image-opacity': 1,
      'overlay-color': OVERLAY_COLOR,
      'overlay-opacity': OVERLAY_OPACITY,
      'overlay-padding': OVERLAY_NODE_PADDING,
    },
  },
  {
    selector: ':parent',
    style: {
      shape: 'barrel',
      'border-width': 2,
      'font-size': '14px',
      'text-margin-y': '10px',
      'text-valign': 'bottom',
      'background-image': null,
      'background-opacity': 0.333,
      'border-color': GROUP_COLOR,
      color: GROUP_COLOR,
      'overlay-color': 'transparent',
      'background-color': '#ffffff',
      'overlay-opacity': 0,
      'overlay-padding': 0,
      'font-weight': 'bold',
    },
  },
  {
    selector: ':parent:selected',
    style: {
      color: '#ffffff',
      'border-style': 'solid',
      'border-width': 4,
      'font-size': '16px',
      'text-outline-width': 0,
      'text-background-opacity': 1,
      'text-background-padding': 1,
      'text-outline-color': '#ffffff',
      'background-color': EDGE_COLOR,
      'border-color': (ele: any) => getPropertyValue(ele, 'color', GROUP_COLOR),
      'text-background-color': (ele: any) => getPropertyValue(ele, 'color', GROUP_COLOR),
    },
  },
  {
    selector: 'node.cy-expand-collapse-collapsed-node',
    style: {
      'text-max-width': '160px',
      color: (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
      label: (ele: any) => getPropertyValue(ele, 'title', null),
      'background-color': (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
      'background-image': (ele: any) => getPropertyValue(ele, 'icon', 'object-group'),
      'border-width': 6,
      'bounds-expansion': 4,
      'border-style': 'double',
      'border-opacity': 1,
      'border-color': (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
    },
  },
  {
    selector: 'node.cy-expand-collapse-collapsed-node:selected',
    style: {
      color: '#ffffff',
      'text-outline-width': 0,
      'text-background-opacity': 1,
      'text-background-padding': 1,
      'text-outline-color': '#ffffff',
      'text-background-color': (ele: any) => getPropertyValue(ele, 'color', EDGE_COLOR),
    },
  },
  {
    selector: 'node.timeline-expand-node-blur',
    style: {
      opacity: 0.6,
      color: BLUR_COLOR,
      'background-color': BLUR_COLOR,
      'text-outline-color': BLUR_COLOR,
      'text-outline-width': 0,
    },
  },
  {
    selector: 'edge.timeline-expand-edge-blur',
    style: {
      opacity: 0.6,
      color: BLUR_COLOR,
      'line-style': 'dashed',
      'line-color': BLUR_COLOR,
      'target-arrow-color': BLUR_COLOR,
      'source-arrow-color': BLUR_COLOR,
    },
  },
  {
    selector: 'node.drop-group-node',
    style: {
      'border-style': 'dashed',
      'background-color': () => 'rgb(255, 67, 67)',
    },
  },
  {
    selector: '.hide-label',
    style: {
      label: '',
    },
  },
  {
    selector: '.eh-handle',
    style: {
      opacity: 0,
      width: 0,
      height: 0,
    },
  },
  {
    selector: '.disabled',
    style: {
      opacity: 0.1,
    },
  },
];

export const fcoseBilkentOptions = {
  name: 'fcose',
  quality: 'proof',
  randomize: true,
  animate: true,
  animationDuration: 1000,
  animationEasing: undefined,
  fit: true,
  padding: 16,
  nodeDimensionsIncludeLabels: false,
  uniformNodeDimensions: false,
  packComponents: true,
  samplingType: true,
  sampleSize: 25,
  nodeSeparation: 75,
  piTol: 0.0000001,
  nodeRepulsion: 50000,
  idealEdgeLength: 150,
  edgeElasticity: 0.45,
  nestingFactor: 0.1,
  numIter: 2500,
  tile: true,
  tilingPaddingVertical: 100,
  tilingPaddingHorizontal: 100,
  gravity: 0.25,
  gravityRangeCompound: 1.5,
  gravityCompound: 1.0,
  gravityRange: 3.8,
  initialEnergyOnIncremental: 0.3,
};
