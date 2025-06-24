"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Download, Plus, SquarePen, Trash2 } from "lucide-react";
import { FormInfo } from "../interface/FormInterface";
import { triggerGlobalToast } from "../components/(common)/toast/showtoast";
import { Module } from "../interface/Module";
import Link from "next/link";
import {
  ModuleProvider,
  useModuleContext,
} from "../components/(context)/modulecontext";

const FormPageDisplay = () => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [forms, setForms] = useState<FormInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Customize as needed
  const [searchQuery, setSearchQuery] = useState("");
  const [displayForms, setDisplayForms] = useState<FormInfo[]>([]);
  const [filterModule, setFilterModule] = useState<Module | null>(null);

  const { allModules } = useModuleContext();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentForms = displayForms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayForms.length / itemsPerPage);

  const fetchForms = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt") || "";

      if (jwtToken !== "") {
        setRole(localStorage.getItem("userRole") || "");
        setUserId(localStorage.getItem("userId") || "");
      } else {
        setRole("STUDENT");
        setUserId("");
      }
      console.log("role", localStorage.getItem("userRole"));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/form/getForms`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json(); // Parse the backend's JSON error
        console.log(errorData);
        throw new Error(errorData.error || "Failed to fetch forms");
      }
      const result = await res.json();
      const data: FormInfo[] = result.data;

      setForms(data);
      setDisplayForms(data);
      setIsLoading(false);

      console.log("result", result);
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast("An unknown error occurred", "error");
      }
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt") || "";
    setToken(jwtToken);

    if (jwtToken !== "") {
      const userRole = localStorage.getItem("userRole") || "";
      setRole(userRole);
      setUserId(localStorage.getItem("userId") || "");
    } else {
      setRole("STUDENT");
      setUserId("");
    }

    fetchForms();
  }, []);

  useEffect(() => {
    let filtered = forms;

    console.log(searchQuery);

    if (searchQuery) {
      filtered = filtered.filter(
        (form) =>
          form.formName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          form.formNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterModule) {
      filtered = filtered.filter(
        (form) => form.module.moduleId === filterModule.moduleId
      );
    }

    setDisplayForms(filtered);
    setCurrentPage(1);
  }, [searchQuery, filterModule, forms]);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner text-[#C67A83] loading-xl"></span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 w-full">
          <div className="text-4xl font-extrabold mb-5">Forms</div>

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

            {role === "ADMIN" && (
              <div>
                <button className="btn px-4 bg-[#C67A83] text-white text-sm border-0 hover:bg-[#b96670]">
                  <Link
                    href="/forms/add"
                    className="flex items-center justify-center w-full h-full"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Upload Form
                  </Link>
                </button>
              </div>
            )}
          </div>

          <div className="flex w-full justify-center">
            <div className="m-5 w-9/10 rounded-box border border-base-content/5 bg-base-100">
              <table className="table w-full">
                <thead className="">
                  <tr className="bg-[#C67A83] rounded-2xl">
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-1/10"
                          : "w-1/8"
                      }`}
                    >
                      No.
                    </th>
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-1/5"
                          : "w-1/4"
                      }`}
                    >
                      Form No.
                    </th>
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-3/10"
                          : "w-3/8"
                      }`}
                    >
                      Form
                    </th>
                    <th
                      className={`py-4 px-8 text-white ${
                        role === "ADMIN" || role === "SPK_MANAGER"
                          ? "w-1/5"
                          : "w-2/8"
                      }`}
                    >
                      Module
                    </th>
                    {(role === "ADMIN" || role === "SPK_MANAGER") && (
                      <th className={`py-4 px-8 text-white w-1/5`}>
                        Person In Charge
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {displayForms.map((forms, index) => (
                    <tr key={forms.formId} className="hover:bg-base-300">
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-1/10"
                            : "w-1/8"
                        }`}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-1/5"
                            : "w-1/4"
                        }`}
                      >
                        {forms.formNumber}
                      </td>
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-3/10"
                            : "w-3/8"
                        }`}
                      >
                        <Link
                          target="_blank" // Open in new tab
                          rel="noopener noreferrer"
                          href={
                            role === "ADMIN" ||
                            role === "SPK_MANAGER" ||
                            (userId !== "" &&
                              forms.personInCharge?.userId === userId)
                              ? `/forms/view/${forms.formId}`
                              : `${process.env.NEXT_PUBLIC_API_URL}${forms.fileDownloadUrl}`
                          }
                        >
                          {forms.formName}
                        </Link>
                      </td>
                      <td
                        className={`px-8 ${
                          role === "ADMIN" || role === "SPK_MANAGER"
                            ? "w-1/5"
                            : "w-2/8"
                        }`}
                      >
                        {forms.module.moduleName}
                      </td>
                      {(role === "ADMIN" || role === "SPK_MANAGER") && (
                        <td className={`px-8 w-1/5`}>
                          {forms.personInCharge.name}
                        </td>
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
    </div>
  );
};

const FormPage = () => {
  return (
    <ModuleProvider>
      <FormPageDisplay />
    </ModuleProvider>
  );
};

export default FormPage;
