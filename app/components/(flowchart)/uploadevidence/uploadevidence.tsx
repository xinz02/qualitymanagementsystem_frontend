import {
  EvidenceFileData,
  EvidenceFileFormData,
} from "@/app/interface/EvidenceFile";
import { FileX, SquarePen, Trash2, Upload } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import UserAsyncSelect from "../../(dropdownselect)/userselect";
import { SelectOption } from "@/app/interface/SelectOption";
import { useUserContext } from "../../(context)/usercontext";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Node } from "@xyflow/react";
import { fetchEvidenceFilesByNode } from "@/app/procedure/proceduremanagement";
import EvidenceUploadRow from "./uploadevidencerow";

interface UploadEvidenceProps {
  selectedNode: Node;
}

const UploadEvidence = ({
  selectedNode,
}: 
UploadEvidenceProps) => {

  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileData[]>([]);
  const [editFileId, setEditFileId] = useState<string | null>(null);

  const fetchEvidence = async (nodeId: string) => {
    try {
      console.log("evidence fetching 123");
      const data = await fetchEvidenceFilesByNode(nodeId);
      setEvidenceFiles(data);
    } catch (err) {
      console.log(err);
      setEvidenceFiles([]);
      toast.error((err as Error).message);
    }
  };

  const handleEvidenceFileDelete = async (fileId: string) => {
    try {
      if (!selectedNode) {
        throw new Error("Failed to delete file. Please refresh and try again.");
      } else if (!fileId) {
        throw new Error("Failed to delete file. File Id is empty.");
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this file?"
      );

      if (!confirmDelete) {
        return; // If user cancels, do nothing
      }

      const jwtToken = localStorage.getItem("jwt") || "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/deleteEvidence/${selectedNode.id}/${fileId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const result = await res.json();

      if (res.ok) {
        fetchEvidence(selectedNode.id);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        console.log("Error occured. Please try again later");
        toast.error("Error occured. Please try again later");
      }
    }
  };

  useEffect(() => {
    if (selectedNode) {
      console.log("upload evidence: ", selectedNode);
      fetchEvidence(selectedNode.id);
    }
  }, [selectedNode]);

  return (
    <>
      <div key={selectedNode.id} className="h-full my-1">
        <div className="my-3">
          <table className="table">
            <thead>
              <tr>
                <th>File</th>
                <th>Person In Charge</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {evidenceFiles.length > 0 &&
                evidenceFiles.map((evidence) => {
                  return editFileId === evidence.fileId ? (
                    <EvidenceUploadRow
                      key={evidence.fileId}
                      selectedNode={selectedNode}
                      fetchEvidence={fetchEvidence}
                      mode="edit"
                      evidence={evidence}
                      onCancel={() => {
                        setEditFileId(null);
                      }}
                    />
                  ) : (
                    <tr key={evidence.fileId}>
                      <td>
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${process.env.NEXT_PUBLIC_API_URL}${evidence.fileDownloadUrl}`}
                        >
                          {evidence.fileName}
                        </Link>
                      </td>
                      <td>{evidence.personInCharge.name}</td>
                      <td>{evidence.semester}</td>
                      <td className="h-full">
                        <div className="flex gap-2 items-center h-full">
                          <button
                            type="button"
                            className="btn bg-[#FEE502] hover:bg-[#E6CF02] text-[#181600]"
                            onClick={() => {
                              setEditFileId(evidence.fileId);
                            }}
                          >
                            <SquarePen className="h-5 w-5" />
                            {/* Edit */}
                          </button>
                          <button
                            type="button"
                            className="btn bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => {
                              handleEvidenceFileDelete(evidence.fileId);
                            }}
                          >
                            <Trash2 className="h-5 w-5" />
                            {/* Delete */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              <EvidenceUploadRow
                selectedNode={selectedNode}
                fetchEvidence={fetchEvidence}
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UploadEvidence;
