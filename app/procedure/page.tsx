"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Procedure, ProcedureFormData } from "../interface/Procedure";


const ProceduresPage = () => {
  // const token = localStorage.getItem("jwt") || "";
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  const fetchProcedures = async () => {
    try {
      console.log("token" + localStorage.getItem("jwt"));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch procedures");
      }
      const result = await res.json();
      const data: Procedure[] = result.data;

      setProcedures(data);
      setIsLoading(false);

      console.log("result", result);
    } catch (err) {
      console.log("Error occurs. Please try again later");
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

    fetchProcedures();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner text-[#C67A83] loading-xl"></span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 w-full">
          <div className="text-4xl font-extrabold mb-5">Procedures</div>
          <div className="flex w-full justify-center">
            <div className="m-5 w-9/10 rounded-box border border-base-content/5 bg-base-100">
              <table className="table w-full">
                <thead className="">
                  <tr className="bg-[#C67A83] rounded-2xl">
                    <th className="py-4 px-8 text-white">No.</th>
                    <th className="py-4 px-8 text-white">Document No.</th>
                    <th className="py-4 px-8 text-white ">Procedure</th>
                    <th className="py-4 px-8 text-white">Module</th>
                  </tr>
                </thead>
                <tbody>
                  {procedures.map((procedure, index) => (
                    <tr
                      key={procedure.procedureId}
                      className="hover:bg-base-300"
                    >
                      <td className="px-8">{index + 1}</td>
                      <td className="px-8">{procedure.procedureNumber}</td>
                      <td className="px-8">
                        {role === "ADMIN" ||
                        role === "SPK_MANAGER" ||
                        (userId !== "" &&
                          procedure.approver?.userId === userId) ||
                        (userId !== "" &&
                          Array.isArray(procedure.assignedTo) &&
                          procedure.assignedTo.some(
                            (user) => user.userId === userId
                          )) ? (
                          <Link
                            href={`/procedure/proceduremanagementform/edit/${procedure.procedureId}`}
                          >
                            {procedure.procedureName}
                          </Link>
                        ) : (
                          <>
                            {role === "STUDENT" ? (
                              <span>{procedure.procedureName}</span>
                            ) : (
                              <Link
                                href={`/procedure/view/${procedure.procedureId}`}
                              >
                                {procedure.procedureName}
                              </Link>
                            )}
                          </>
                        )}
                      </td>
                      <td className="px-8">{procedure.module.moduleName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProceduresPage;
