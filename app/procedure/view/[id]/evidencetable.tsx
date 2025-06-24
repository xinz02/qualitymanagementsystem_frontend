import React from "react";
import Link from "next/link";
import { NodeEvidenceFile } from "@/app/interface/EvidenceFile";
import { Node } from "@xyflow/react";
import { FlowChartData } from "@/app/interface/FlowChartData";

interface EvidenceTableProps {
  nodes: Node[];
  nodeFiles: NodeEvidenceFile[];
}

const EvidenceTable = ({ nodes, nodeFiles }: EvidenceTableProps) => {
  return (
    <table className="table table-fixed w-full my-2">
      <thead>
        <tr>
          <th className="w-5/8">Files</th>
          <th className="w-1/4">Person In Charge</th>
          <th className="w-1/8">Semester</th>
        </tr>
      </thead>
      <tbody>
        {nodes?.some((node) => node.type === "process") ? (
          nodes.map((node) => {
            if (node.type !== "process") {
              return null;
            }

            const matchingNodeEvidence = nodeFiles?.find(
              (nodeFile) => nodeFile.nodeId === node.id
            );

            const matchingFiles = matchingNodeEvidence?.nodeFiles || [];

            return (
              <React.Fragment key={node.id}>
                <tr className="bg-gray-100">
                  <td className="font-semibold" colSpan={4}>
                    {node.data.content as string}
                  </td>
                </tr>
                {matchingFiles.length > 0 ? (
                  matchingFiles.map((file, idx) => (
                    <tr key={`${node.id}-${idx}`}>
                      <td className="w-5/8 break-words">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${process.env.NEXT_PUBLIC_API_URL}${file.fileDownloadUrl}`}
                        >
                          {file.fileName}
                        </Link>
                      </td>
                      <td className="w-1/4">
                        {file.personInCharge?.name || "-"}
                      </td>
                      <td className="w-1/8">{file.semester}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="italic text-gray-500">
                      No evidence files found for this node.
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <tr>
            <td colSpan={4} className="italic text-gray-500">
              No process node yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EvidenceTable;
