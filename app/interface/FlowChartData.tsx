import { Edge, Node } from "@xyflow/react";

export type FlowChartData = {
  id: string;
  title: string;
  nodes: Node[];
  edges: Edge[];
};

export interface FlowChart {
  flowChartId: string;
  mainFlowChart: FlowChartData;
  subFlowCharts: FlowChartData[];
}
