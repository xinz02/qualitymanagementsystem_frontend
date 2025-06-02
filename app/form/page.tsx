"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Form } from "../interface/form";
import { Download, SquarePen, Trash2 } from "lucide-react";

const FormPage = () => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [forms, setForms] = useState<Form[]>([]);

  const fetchForms = async () => {
    try {
      const mockData: Form = {
        formId: "1",
        formName: "123",
        formNumber: "12345",
        module: {
          moduleId: "123",
          moduleName: "test",
          categories: [],
          viewPrivilege: [],
        },
        category: {
          categoryId: "555",
          categoryName: "i can do it",
        },
        viewPrivilege: [],
      };
      //   console.log("token" + localStorage.getItem("jwt"));

      //   const res = await fetch(
      //     `${process.env.NEXT_PUBLIC_API_URL}/form/getForm`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );

      //   if (!res.ok) {
      //     throw new Error("Failed to fetch procedures");
      //   }
      //   const result = await res.json();
      //   const data: Form[] = result.data;

      setForms([mockData]);
      setIsLoading(false);

      //   console.log("result", result);
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

    fetchForms();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner text-[#C67A83] loading-xl"></span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 w-full">
          <div className="text-4xl font-extrabold mb-5">Forms</div>
          <div className="flex w-full justify-center">
            <div className="m-5 w-9/10 rounded-box border border-base-content/5 bg-base-100">
              <table className="table w-full">
                <thead className="">
                  <tr className="bg-[#C67A83] rounded-2xl">
                    <th className="py-4 px-8 text-white">No.</th>
                    <th className="py-4 px-8 text-white">Form</th>
                    <th className="py-4 px-8 text-white ">Module</th>
                    <th className="py-4 px-8 text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((forms, index) => (
                    <tr key={forms.formId} className="hover:bg-base-300">
                      <td className="px-8">{index + 1}</td>
                      <td className="px-8">{forms.formName}</td>
                      <td className="px-8">{forms.module.moduleName}</td>
                      <td className="px-8">
                        <div className="flex gap-2">
                          <button className="btn" type="button">
                            <Download className="h-5 w-5 " />
                          </button>
                          {(role === "ADMIN" || role === "SPK_MANAGER") && (
                            <div className="flex gap-2">
                              <button className="btn" type="button">
                                <SquarePen className="h-5 w-5 " />
                              </button>
                              <button className="btn" type="button">
                                <Trash2 className="h-5 w-5 " />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
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

export default FormPage;
