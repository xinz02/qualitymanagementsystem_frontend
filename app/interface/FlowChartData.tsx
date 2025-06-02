import { Edge, Node } from "@xyflow/react";

export type FlowChartData = {
    id: string;
    title: string;
    nodes: Node[];
    edges: Edge[];
};