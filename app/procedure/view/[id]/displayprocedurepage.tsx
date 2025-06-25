"use client";

import LoadingSpinner from "@/app/components/(common)/loadingspinner";
// import ProcedurePDFViewer from "@/app/components/(pdf)/pdfviewer";
import { FlowChartsEvidenceFileData } from "@/app/interface/EvidenceFile";
import { Procedure, ProcedureVersion } from "@/app/interface/Procedure";
import { PindaanDokumenSimplified } from "@/app/interface/ProcedureTemplateFormData";
import {
  CornerDownLeft,
  File,
  FileCheck,
  FileText,
  FileX,
  SquarePen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import EvidenceTable from "./evidencetable";
import { FlowChart } from "@/app/interface/FlowChartData";
import {
  bytesToMB,
  fetchEvidenceFilesByFlowChart,
  handleDeleteProcedure,
} from "../../proceduremanagement";
import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import UpdateProcedureStatusModal from "./updateprocedurestatusmodal";

import dynamic from "next/dynamic";

const ProcedurePDFViewer = dynamic(
  () => import("@/app/components/(pdf)/pdfviewer"),
  {
    ssr: false,
  }
);

interface DisplayProcedurePageProps {
  procedure: Procedure | null;
  displayProcedureVersion?: ProcedureVersion | null;
}

const DisplayProcedurePage = ({
  procedure,
  displayProcedureVersion,
}: DisplayProcedurePageProps) => {
  console.log("DisplayProcedurePage Props: ", displayProcedureVersion);
  const role = localStorage.getItem("userRole") || "STUDENT";
  const userId = localStorage.getItem("userId") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [evidenceFiles, setEvidenceFiles] =
    useState<FlowChartsEvidenceFileData | null>(null);
  const [flowCharts, setFlowCharts] = useState<FlowChart>();

  const simplifiedVersions: PindaanDokumenSimplified[] = useMemo(() => {
    const maxVerToDisplay = displayProcedureVersion?.pindaanDokumen?.versi || 0;

    const displayPindaan = procedure?.pindaanDokumen
      ?.filter((procedure) => procedure.versi <= maxVerToDisplay)
      ?.sort((a, b) => Number(a.versi) - Number(b.versi)); // ascending order

    return (
      displayPindaan?.map((version) => ({
        versi: version.versi,
        butiran: version.butiran,
        tarikh: version.tarikh,
        deskripsiPerubahan: version.deskripsiPerubahan,
        disediakan: version.disediakan,
        diluluskan: version.diluluskan,
      })) || []
    );
  }, [procedure, displayProcedureVersion]);

  const fetchEvidenceFiles = async (flowChartId: string) => {
    try {
      const data = await fetchEvidenceFilesByFlowChart(flowChartId);
      setEvidenceFiles(data);
    } catch (err) {
      console.log(err);
      setEvidenceFiles(null);
      triggerGlobalToast((err as Error).message, "error");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  }, [displayProcedureVersion]);

  useEffect(() => {
    if (
      procedure &&
      displayProcedureVersion?.pindaanDokumen?.procedureTemplateData &&
      displayProcedureVersion.pindaanDokumen.procedureTemplateData
        .cartaFungsi &&
      displayProcedureVersion.pindaanDokumen.procedureTemplateData.cartaFungsi
        .flowChartId
    ) {
      setFlowCharts(
        displayProcedureVersion.pindaanDokumen.procedureTemplateData.cartaFungsi
      );
      fetchEvidenceFiles(
        displayProcedureVersion.pindaanDokumen.procedureTemplateData.cartaFungsi
          .flowChartId
      );
    }
  }, [procedure, displayProcedureVersion]);

  console.log("displayProcedureVersion", displayProcedureVersion);

  console.log(
    "displayProcedureVersion?.pindaanDokumen?.procedureTemplateData",
    displayProcedureVersion?.pindaanDokumen?.procedureTemplateData
  );
  console.log(
    "displayProcedureVersion?.fileDownloadUrl",
    displayProcedureVersion?.fileDownloadUrl
  );

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col w-full justify-center items-center mb-5">
          <div className="flex items-center justify-center w-full ">
            {!procedure ? (
              <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
                <FileX className="h-20 w-20" />
                <span className="font-bold text-lg">Procedure not exists.</span>
              </div>
            ) : !displayProcedureVersion?.pindaanDokumen
                ?.procedureTemplateData &&
              !displayProcedureVersion?.fileDownloadUrl ? (
              <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
                <FileX className="h-20 w-20" />
                <span className="font-bold text-lg">
                  Procedure not ready yet.
                </span>
              </div>
            ) : displayProcedureVersion?.pindaanDokumen
                ?.procedureTemplateData ? (
              <>
                <div className="w-full">
                  {(role === "ADMIN" ||
                    role === "SPK_MANAGER" ||
                    (userId !== "" &&
                      displayProcedureVersion?.pindaanDokumen.assignTo?.some(
                        (user) => user.userId === userId
                        //procedure?.approver?.userId === userId
                      ))) && (
                    <div className="mt-3 mb-4 w-full flex justify-center gap-2 items-center">
                      <span className="font-semibold text-lg">
                        Approve Status:
                      </span>
                      <div
                        className={`border-1 border-gray-400 p-2 ${
                          displayProcedureVersion?.pindaanDokumen
                            .approveStatus === "PENDING"
                            ? `bg-yellow-400`
                            : displayProcedureVersion?.pindaanDokumen
                                .approveStatus === "REJECT"
                            ? `bg-red-500`
                            : `bg-green-500`
                        }`}
                      >
                        <span className="font-semibold text-lg">
                          {
                            displayProcedureVersion?.pindaanDokumen
                              .approveStatus
                          }
                        </span>
                      </div>
                    </div>
                  )}

                  {(role === "ADMIN" ||
                    role === "SPK_MANAGER" ||
                    (userId !== "" &&
                      displayProcedureVersion?.pindaanDokumen.assignTo?.some(
                        (user) => user.userId === userId
                        //procedure?.approver?.userId === userId
                      ))) &&
                    displayProcedureVersion.pindaanDokumen.approveStatus !==
                      "APPROVE" &&
                    displayProcedureVersion.pindaanDokumen.description && (
                      <div className="mt-3 mb-4 w-full flex justify-center gap-2 items-center">
                        <span className="font-semibold text-lg">
                          Reject Description:
                        </span>

                        <span className="font-semibold text-lg">
                          {displayProcedureVersion?.pindaanDokumen.description}
                        </span>
                      </div>
                    )}

                  <div className="tabs tabs-bordered justify-center mb-6">
                    <input
                      type="radio"
                      name="procedure_tabs"
                      role="tab"
                      className="tab text-lg font-semibold"
                      aria-label="📄 Procedure"
                      defaultChecked
                    />
                    <div
                      role="tabpanel"
                      className="tab-content bg-base-100 border-base-300 rounded-box w-full min-h-[100vh]"
                    >
                      <ProcedurePDFViewer
                        key={
                          displayProcedureVersion?.pindaanDokumen?.versi ||
                          "unknown"
                        }
                        pindaanDokumen={simplifiedVersions}
                        templateData={
                          displayProcedureVersion.pindaanDokumen
                            .procedureTemplateData
                        }
                        onPDFReady={() => {
                          setIsLoading(false);
                        }}
                      />
                      {/* </div> */}
                    </div>
                    {(role === "ADMIN" || role === "SPK_MANAGER") &&
                      displayProcedureVersion.pindaanDokumen && (
                        // ||
                        // (userId !== "" &&
                        //   procedure?.approver?.userId === userId)
                        <>
                          <input
                            type="radio"
                            name="procedure_tabs"
                            role="tab"
                            className="tab text-lg font-semibold"
                            aria-label="📁 Evidence Files"
                          />
                          <div
                            role="tabpanel"
                            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                          >
                            <div className="w-full min-h-[100vh]">
                              {evidenceFiles && (
                                <div className="w-full h-full overflow-y-auto space-y-5">
                                  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                                    <input
                                      type="radio"
                                      name="my-accordion-2"
                                      defaultChecked
                                      className="peer"
                                    />
                                    <div className="collapse-title font-bold text-lg text-white bg-[#C67A83] peer-checked:bg-[#b8636d]">
                                      Main Flow Chart
                                    </div>
                                    <div className="collapse-content text-sm">
                                      <EvidenceTable
                                        nodes={
                                          flowCharts?.mainFlowChart?.nodes ?? []
                                        }
                                        nodeFiles={
                                          evidenceFiles
                                            ?.mainFlowChartEvidenceFile
                                            ?.nodeFiles
                                        }
                                      />
                                    </div>
                                  </div>
                                  {flowCharts?.subFlowCharts.map(
                                    (subFlowChart, index) => {
                                      const matchingSubEvidence =
                                        evidenceFiles?.subFlowChartsEvidenceFile.find(
                                          (evidence) =>
                                            evidence.flowChart ===
                                            subFlowChart.id
                                        );

                                      return (
                                        <div
                                          key={subFlowChart.id}
                                          className="w-full h-full overflow-y-auto space-y-5"
                                        >
                                          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                                            <input
                                              type="radio"
                                              name="my-accordion-2"
                                              className="peer"
                                            />
                                            <div className="collapse-title font-bold text-lg text-white bg-[#C67A83] peer-checked:bg-[#b8636d]">
                                              {subFlowChart.title ||
                                                `Sub Flow Chart ${index + 1}`}
                                            </div>
                                            <div className="collapse-content text-sm">
                                              <EvidenceTable
                                                nodes={
                                                  subFlowChart?.nodes ?? []
                                                }
                                                nodeFiles={
                                                  matchingSubEvidence?.nodeFiles ??
                                                  []
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                  </div>

                  {/* <div className="tabs tabs-bordered justify-center mb-6">
                      <input
                        type="radio"
                        name="procedure_tabs"
                        role="tab"
                        className="tab text-lg font-semibold"
                        aria-label="📄 Procedure"
                        checked={selectedTab === "procedure"}
                        onChange={() => setSelectedTab("procedure")}
                      />
                      <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box w-full min-h-[100vh]"
                      >
                        {selectedTab === "procedure" && (
                          <ProcedurePDFViewer
                            templateData={procedure.procedureTemplateData}
                            onPDFReady={() => {
                              setIsLoading(false);
                            }}
                          />
                        )}
                      </div>

                      <input
                        type="radio"
                        name="procedure_tabs"
                        role="tab"
                        className="tab text-lg font-semibold"
                        aria-label="📁 Evidence Files"
                        checked={selectedTab === "evidence"}
                        onChange={() => setSelectedTab("evidence")}
                      />
                      <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                      >
                        {selectedTab === "evidence" && (
                          <div className="w-full min-h-[100vh]">
                            <span>HI</span>
                          </div>
                        )}
                      </div>
                    </div> */}
                </div>
              </>
            ) : displayProcedureVersion?.fileDownloadUrl ? (
              displayProcedureVersion.fileType === "application/pdf" ? (
                <iframe
                  src={`${process.env.NEXT_PUBLIC_API_URL}${displayProcedureVersion.fileDownloadUrl}`}
                  style={{
                    border: "1px solid #ccc",
                    width: "80%",
                    height: "100vh",
                  }}
                  onLoad={() => setIsLoading(false)}
                ></iframe>
              ) : (
                <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
                  <FileText className="h-20 w-20" />
                  <span className="font-bold text-lg">
                    Preview for this filetype is currently not supported.
                  </span>
                  <span>Click the file below to download.</span>
                  <div className="bg-[#eeeeee] hover:bg-[#dedede] p-3 rounded-xl flex items-center justify-between w-fit">
                    <div className="flex items-center">
                      <File className="w-6 h-6 mx-2" />
                      <div className="flex flex-col justify-start pl-3 pr-5">
                        <span className="font-semibold text-[15px]">
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}${displayProcedureVersion.fileDownloadUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {displayProcedureVersion.fileName}
                          </a>
                        </span>
                        <span className="font-normal text-[13px]">
                          {procedure.fileSize !== undefined
                            ? bytesToMB(displayProcedureVersion.fileSize ?? 0)
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : null}
          </div>
        </div>
      )}

      {displayProcedureVersion ? (
        <div className="flex justify-center items-center gap-5 flex-wrap">
          {(role === "SPK_MANAGER" || role === "APPROVER") &&
            displayProcedureVersion.pindaanDokumen?.approveStatus !==
              "APPROVE" && (
              <button
                type="button"
                className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
                onClick={() => {
                  if (displayProcedureVersion.procedureId) {
                    if (
                      displayProcedureVersion.pindaanDokumen?.approveStatus !==
                      "APPROVE"
                    ) {
                      (
                        document.getElementById(
                          "update_procedure_status_modal"
                        ) as HTMLDialogElement
                      )?.showModal();
                    } else {
                      triggerGlobalToast(
                        "Procedure has been approved! Please refresh again.",
                        "error"
                      );
                    }
                  } else {
                    triggerGlobalToast("Procedure does not exist.", "error");
                  }
                }}
              >
                <FileCheck className="h-5 w-5" />
                Update Procedure Status
              </button>
            )}
          {(role === "ADMIN" ||
            role === "SPK_MANAGER" ||
            (userId &&
              Array.isArray(displayProcedureVersion.pindaanDokumen?.assignTo) &&
              displayProcedureVersion.pindaanDokumen.assignTo.some(
                (user) => user.userId === userId
              ))) && (
            <>
              {displayProcedureVersion.pindaanDokumen?.approveStatus !==
                "APPROVE" && (
                <button
                  type="button"
                  className="btn bg-[#C67A83] hover:bg-[#b96670] text-white"
                >
                  <Link
                    className="w-full h-full flex justify-center items-center gap-2"
                    href={`/procedure/proceduremanagementform/edit/${displayProcedureVersion.procedureId}/${displayProcedureVersion.pindaanDokumen?.versi}`}
                  >
                    <SquarePen className="h-5 w-5" />
                    Edit
                  </Link>
                </button>
              )}

              <button
                type="button"
                className="btn bg-red-600 hover:bg-red-700 text-white gap-2 flex justify-center items-center"
                onClick={() => {
                  if (displayProcedureVersion.procedureId) {
                    handleDeleteProcedure(displayProcedureVersion.procedureId);
                  } else {
                    triggerGlobalToast("Procedure does not exist.", "error");
                  }
                }}
              >
                <Trash2 className="h-5 w-5" />
                Delete
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-5">
          <button
            type="button"
            className="btn bg-[#C67A83] hover:bg-[#b96670] text-white"
          >
            <Link
              className="w-full h-full flex justify-center items-center gap-2"
              href={`/procedure`}
            >
              <CornerDownLeft className="h-5 w-5" />
              Return
            </Link>
          </button>
        </div>
      )}

      {displayProcedureVersion && (
        <UpdateProcedureStatusModal procedure={displayProcedureVersion} />
      )}
    </div>
  );
};

export default DisplayProcedurePage;
