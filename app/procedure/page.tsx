"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProcedureList, ProcedureListInfo } from "../interface/Procedure";
import LoadingSpinner from "../components/(common)/loadingspinner";
import { Plus } from "lucide-react";
import {
  ModuleProvider,
  useModuleContext,
} from "../components/(context)/modulecontext";
import { Module } from "../interface/Module";
import CreateProcedureModal from "./view/[id]/createproceduremodal";
import { triggerGlobalToast } from "../components/(common)/toast/showtoast";

const ProceduresPageDisplay = () => {
  const { allModules } = useModuleContext();
  // const { jwtToken, isAuthReady } = useAuth();

  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [accessibleProcedures, setAccessibleProcedures] = useState<
    ProcedureListInfo[]
  >([]);
  const [assignedProcedures, setAssignedProcedures] = useState<
    ProcedureListInfo[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Customize as needed
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProcedures, setDisplayProcedures] = useState<
    ProcedureListInfo[]
  >([]);
  const [filterModule, setFilterModule] = useState<Module | null>(null);
  const [approveStatus, setApproveStatus] = useState<
    "All" | "Approve" | "Pending" | "Reject"
  >("Approve");
  const [activeTab, setActiveTab] = useState<"accessible" | "assigned">(
    "accessible"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProcedures = displayProcedures.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(displayProcedures.length / itemsPerPage);

  const fetchProcedures = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt") || "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        throw new Error(errorData.error || "Failed to fetch procedures");
      }
      const result = await res.json();
      const data: ProcedureList = result.data;

      setAccessibleProcedures(data.accessibleProcedures);
      setAssignedProcedures(data.assignedProcedures);
      setDisplayProcedures(data.accessibleProcedures);

      console.log("result", result);
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast("An unknown error occurred", "error");
      }
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (isAuthReady) {
  //     fetchProcedures();
  //   }
  // }, [isAuthReady]);

  useEffect(() => {
    fetchProcedures();
  }, []);

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "STUDENT");
  }, []);

  useEffect(() => {
    if (activeTab === "assigned") {
      if (role === "APPROVER") {
        setApproveStatus("Pending");
      } else if (role === "ADMIN" || role === "SPK_MANAGER") {
        setApproveStatus("All");
      } else {
        setApproveStatus("Approve");
      }
    } else {
      if (role === "APPROVER") {
        setApproveStatus("Pending");
      } else if (role === "ADMIN" || role === "SPK_MANAGER") {
        setApproveStatus("All");
      } else {
        setApproveStatus("All");
      }
    }
  }, [role]);

  useEffect(() => {
    // Decide the source list based on the selected tab
    const sourceProcedures =
      activeTab === "assigned" ? assignedProcedures : accessibleProcedures;

    // Initial filter by non-null approve status
    let filtered = sourceProcedures.filter(
      (procedure) => procedure.procedureApproveStatus !== null
    );

    // Approve Status filter
    if (approveStatus !== "All") {
      filtered = filtered.filter(
        (procedure) =>
          procedure.procedureApproveStatus?.toLowerCase() ===
          approveStatus.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (procedure) =>
          procedure.procedureName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          procedure.procedureNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Module filter
    if (filterModule) {
      filtered = filtered.filter(
        (procedure) => procedure.module.moduleId === filterModule.moduleId
      );
    }

    setDisplayProcedures(filtered);
    setCurrentPage(1);
  }, [
    activeTab,
    searchQuery,
    filterModule,
    approveStatus,
    accessibleProcedures,
    assignedProcedures,
  ]);

  useEffect(() => {
    const sourceProcedures =
      activeTab === "assigned" ? assignedProcedures : accessibleProcedures;

    let filtered = sourceProcedures;

    if (searchQuery) {
      filtered = filtered.filter(
        (procedure) =>
          procedure.procedureName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          procedure.procedureNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    if (filterModule) {
      filtered = filtered.filter(
        (procedure) => procedure.module.moduleId === filterModule.moduleId
      );
    }

    if (approveStatus !== "All") {
      filtered = filtered.filter(
        (procedure) =>
          procedure.procedureApproveStatus?.toLowerCase() ===
          approveStatus.toLowerCase()
      );
    }

    setDisplayProcedures(filtered);
    setCurrentPage(1);
  }, [
    activeTab,
    searchQuery,
    filterModule,
    approveStatus,
    accessibleProcedures,
    assignedProcedures,
  ]);

  console.log("Role: ", role);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-10 w-full">
          <div className="text-4xl font-extrabold mb-5">Procedures</div>

          <div className="w-9/10 flex justify-between items-center gap-5">
            <div className="flex items-center gap-5 flex-grow">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap">Items per page:</span>
                <select
                  className="select w-[70px]"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    if (totalPages < 2) {
                      setCurrentPage(1);
                    }
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap">Module:</span>
                <select
                  className="select"
                  value={filterModule?.moduleId || ""}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    if (selectedId === "") {
                      setFilterModule(null); // "All" selected
                    } else {
                      const selectedModule = allModules.find(
                        (module) => module.moduleId === selectedId
                      );
                      setFilterModule(selectedModule || null);
                    }
                  }}
                >
                  <option value="">All</option>
                  {allModules.map((module) => (
                    <option key={module.moduleId} value={module.moduleId}>
                      {module.moduleName}
                    </option>
                  ))}
                </select>
              </div>

              {(role === "APPROVER" ||
                role === "ADMIN" ||
                role === "SPK_MANAGER") && (
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">Approve Status:</span>
                  <select
                    className="select"
                    value={approveStatus}
                    onChange={(e) => {
                      if (
                        e.target.value === "All" ||
                        e.target.value === "Approve" ||
                        e.target.value === "Pending" ||
                        e.target.value === "Reject"
                      ) {
                        setApproveStatus(e.target.value);
                      }
                    }}
                  >
                    {role !== "APPROVER" && <option value="All">All</option>}
                    <option value="Approve">Approve</option>
                    <option value="Pending">Pending</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
              )}

              {/* search bar */}
              <label className="input flex-grow">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  className="grow"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </label>
            </div>

            {role === "ADMIN" || role === "SPK_MANAGER" && (
              <div>
                <button
                  className="btn px-4 bg-[#C67A83] text-white text-sm border-0 hover:bg-[#b96670]"
                  onClick={() => {
                    (
                      document.getElementById(
                        "create_procedure_modal"
                      ) as HTMLDialogElement
                    )?.show();
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Procedure
                </button>
              </div>
            )}
          </div>

          {assignedProcedures && assignedProcedures.length > 0 && (
            <>
              <div role="tablist" className="tabs tabs-border mt-5">
                <button
                  role="tab"
                  className={`tab ${
                    activeTab === "accessible" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("accessible")}
                >
                  Accessible Procedures
                </button>
                <button
                  role="tab"
                  // className="tab"
                  className={`tab ${
                    activeTab === "assigned" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("assigned")}
                >
                  Assigned Procedures
                </button>
              </div>
            </>
          )}

          <div className="flex w-full justify-center">
            <div className="mx-5 my-2 w-9/10 rounded-box border border-base-content/5 bg-base-100">
              <table className="table w-full">
                <thead className="">
                  <tr className="bg-[#C67A83] rounded-2xl">
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-1/15"
                          : "w-1/10"
                      }`}
                    >
                      No.
                    </th>
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-2/15"
                          : "w-1/5"
                      }`}
                    >
                      Document No.
                    </th>
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-1/3"
                          : "w-1/2"
                      }`}
                    >
                      Procedure
                    </th>
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-1/15"
                          : "w-1/5"
                      }`}
                    >
                      Module
                    </th>
                    {(role === "ADMIN" ||
                      role === "SPK_MANAGER" ||
                      (activeTab === "assigned" &&
                        assignedProcedures.length > 0)) && (
                      <>
                        <th className="py-4 px-8 text-white w-1/15">
                          Approve Status
                        </th>
                        <th className="py-4 px-8 text-white w-3/15">
                          Last Modified
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentProcedures.map((procedure, index) => (
                    <tr
                      key={procedure.procedureId}
                      className="hover:bg-base-300"
                    >
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-1/15"
                            : "w-1/10"
                        }`}
                      >
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-2/15"
                            : "w-1/5"
                        }`}
                      >
                        {procedure.procedureNumber}
                      </td>
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-1/3"
                            : "w-1/2"
                        }`}
                      >
                        {role === "STUDENT" ? (
                          <span>{procedure.procedureName}</span>
                        ) : (
                          <Link
                            target="_blank" // Open in new tab
                            rel="noopener noreferrer"
                            href={`/procedure/view/${procedure.procedureId}`}
                          >
                            {procedure.procedureName}
                          </Link>
                        )}
                      </td>
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-1/15"
                            : "w-1/5"
                        }`}
                      >
                        {procedure.module.moduleName}
                      </td>
                      {(role === "ADMIN" ||
                        role === "SPK_MANAGER" ||
                        (activeTab === "assigned" &&
                          assignedProcedures.length > 0)) && (
                        <>
                          <td className="px-8 w-1/15 text-center">
                            {procedure.procedureApproveStatus}
                          </td>
                          <td className="px-8 w-3/15">
                            {procedure.lastModified}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 w-full flex justify-center">
            <div className="join">
              <button
                className="join-item btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                «
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`join-item btn ${
                    currentPage === i + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="join-item btn"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}

      <CreateProcedureModal />
    </div>
  );
};

const ProceduresPage = () => {
  return (
    <ModuleProvider>
      <ProceduresPageDisplay />
    </ModuleProvider>
  );
};

export default ProceduresPage;
