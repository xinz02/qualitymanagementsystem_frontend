// components/VersionHistoryPanel.jsx
import React, { useEffect, useState } from "react";
import { History, Clock, UserPen, Eye, Download, X, Plus } from "lucide-react";
import { PindaanDokumenVO } from "@/app/interface/ProcedureTemplateFormData";
import { User } from "@/app/interface/User";
import CreateProcedureModal from "./createproceduremodal";
import CreateNewVersionModal from "./createnewversion";
import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";

interface VersionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  versions?: PindaanDokumenVO[];
  procedureName?: string;
  selectedVersion?: number;
  setSelectedVersion?: (version: number) => void;
  procedureId: string;
}

const VersionHistoryPanel = ({
  isOpen,
  onClose,
  versions = [],
  procedureId,
  procedureName,
  selectedVersion,
  setSelectedVersion,
}: VersionHistoryPanelProps) => {
  console.log("Versions:", versions);
  const role = localStorage.getItem("userRole") || "";

  const [modalVersion, setModalVersion] = useState<number>(1); // default version
  // const [selectedVersionNumber, setSelectedVersionNumber] = useState<number | null>(null);

  // const [modalAssignTos, setModalAssignTos] = useState<string[]>([]);
  const [modalAssignTos, setModalAssignTos] = useState<User[]>([]);

  //   const formatDate = (dateString: any) => {
  //     return new Date(dateString).toLocaleDateString('en-US', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric',
  //       hour: '2-digit',
  //       minute: '2-digit'
  //     });
  //   };
  const formatDate = (dateString: string) => {
    if (dateString === null || dateString === undefined || dateString === "") {
      return "N/A";
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleVersionView = (version: number) => {
    console.log("Viewing version:", version);
    setSelectedVersion?.(version);
  };

  const handleAddNewVersion = () => {
    const latestVersionWithStatus = versions?.reduce((max, current) => {
      return Number(current.versi) > Number(max.versi) ? current : max;
    }, versions?.[0]);

    if (latestVersionWithStatus.approveStatus !== "APPROVE") {
      triggerGlobalToast(
        "The latest version must be approved before adding a new version.",
        "error"
      );
      return;
    }

    const nextVersion = Number(latestVersionWithStatus.versi) + 1;

    // const userIds: string[] =
    //   latestVersionWithStatus.assignTo
    //     ?.map((user) => user.userId)
    //     .filter((id): id is string => id !== undefined) ?? [];
    // latestVersionWithStatus.assignTo?.map((user) => user.userId) ?? [];

    setModalVersion(nextVersion);
    // setModalAssignTos(userIds); // or pre-fill with data if needed
    setModalAssignTos(latestVersionWithStatus.assignTo ?? []);

    (
      document.getElementById(
        "create_procedure_version_modal"
      ) as HTMLDialogElement
    )?.showModal();
  };

  useEffect(() => {
    versions = versions?.sort((a, b) => Number(b.versi) - Number(a.versi));
  }, [versions]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-20 z-40" onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-base-100 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "450px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-base-content" />
            <h3 className="font-semibold text-lg text-base-content">
              Procedure Versions
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Document Info */}
        <div className="p-4 border-b border-base-300 bg-base-200/50">
          <h4
            className="font-medium text-base-content truncate"
            title={procedureName}
          >
            {procedureName}
          </h4>
          <p className="text-sm text-base-content/70">
            {versions.length} version{versions.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        {(role === "ADMIN" || role === "SPK_MANAGER") && (
          <div className="flex gap-2 mt-3 px-4">
            <button
              className="btn btn-sm btn-outline btn-primary flex-1"
              onClick={handleAddNewVersion}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add New Version
            </button>
          </div>
        )}

        {/* Version List */}
        <div className="flex-1 overflow-y-auto p-4">
          {versions.length === 0 ? (
            <div className="text-center py-8">
              <History className="h-12 w-12 mx-auto text-base-content/30 mb-4" />
              <p className="text-base-content/60">
                No version history available
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version, index) => (
                <div
                  key={version.versi}
                  className={`card bg-base-100 shadow-sm border cursor-pointer hover:shadow-md transition-all ${
                    Number(version.versi) === (selectedVersion || 0)
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-base-300 hover:border-base-content/20"
                  }`}
                >
                  <div className="card-body p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`badge badge-sm ${
                              Number(version.versi) === (selectedVersion || 0)
                                ? "badge-primary"
                                : "badge-outline"
                            }`}
                          >
                            v{version.versi}
                          </span>
                          {Number(version.versi) === (selectedVersion || 0) && (
                            <span className="badge badge-accent badge-sm">
                              Current
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
                          <Clock className="h-3 w-3" />
                          {/* <span>{formatDate(version.tarikh)}</span> */}
                          <span>{formatDate(version.tarikh)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
                          <UserPen className="h-3 w-3" />
                          <span>
                            {Array.isArray(version.assignTo) &&
                            version.assignTo.length > 0
                              ? version.assignTo
                                  .map((user) => user.name)
                                  .join(", ")
                              : "N/A"}
                          </span>
                        </div>

                        <p className="text-md font-bold text-base-content mb-2 line-clamp-2">
                          {version.butiran}
                        </p>

                        <p className="text-sm text-base-content mb-2 line-clamp-2">
                          <span className="font-bold">
                            Perubahan Deskripsi:
                          </span>{" "}
                          <br />
                          {version.deskripsiPerubahan}
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="font-bold">Approve Status:</span>
                          <div
                            className={`border-1 border-gray-400 w-[85px] h-[24px] flex items-center justify-center rounded ${
                              version.approveStatus === "PENDING"
                                ? "bg-yellow-400"
                                : version.approveStatus === "REJECT"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          >
                            <p className="text-sm text-base-content text-center w-full">
                              {version.approveStatus}
                            </p>
                          </div>
                        </div>

                        {version.approver &&
                          version.approveStatus !== "PENDING" && (
                            <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
                              <UserPen className="h-3 w-3" />
                              <span>{version.approver.name}</span>
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        className="btn btn-sm btn-outline btn-primary flex-1"
                        onClick={() => handleVersionView(Number(version.versi))}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CreateNewVersionModal
        procedureId={procedureId}
        latestversion={modalVersion}
        assignTos={modalAssignTos}
      />
    </>
  );
};

export default VersionHistoryPanel;
