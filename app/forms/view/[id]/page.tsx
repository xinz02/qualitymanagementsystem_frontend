"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FormInfo } from "@/app/interface/FormInterface";
import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import Link from "next/link";
import {
  CornerDownLeft,
  File,
  FileText,
  FileX,
  SquarePen,
  Trash2,
} from "lucide-react";
import LoadingSpinner from "@/app/components/(common)/loadingspinner";
import { bytesToMB } from "@/app/procedure/proceduremanagement";
import { handleDeleteForm } from "../../formmanagement";

const FormViewPage = () => {
  const id = useParams().id as string;
  console.log("ID in view: ", id);

  const [form, setForm] = useState<FormInfo>();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt") || "";
    const userRole = localStorage.getItem("userRole") || "STUDENT";
    const userID = localStorage.getItem("userId") || "";

    setToken(jwtToken);
    setRole(userRole);
    setUserId(userID);
  }, []);

  const getFormById = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/form/getForm/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Procedure not exists.");
      }

      const formData: FormInfo = result.data;
      console.log("formData: ", result);

      if (!formData) {
        throw new Error(result.message || "Form not exists.");
      } else {
        setForm(formData);
      }
    } catch (error) {
      triggerGlobalToast(
        (error as Error)?.message || "Failed to load procedure data",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFormById(id);
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center p-12 w-full">
      <div className="w-full flex items-center">
        <button type="button" className="btn btn-ghost mb-5">
          <Link href={`/forms`}>
            <CornerDownLeft className="h-6 w-6" />
          </Link>
        </button>

        <div className="text-4xl font-extrabold mb-5 grow text-center mx-5">
          {form?.fileName}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col w-full justify-center items-center mb-5">
          <div className="flex items-center justify-center w-full ">
            {!form ? (
              <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
                <FileX className="h-20 w-20" />
                <span className="font-bold text-lg">Form not exists.</span>
              </div>
            ) : !form.fileDownloadUrl ? (
              <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
                <FileX className="h-20 w-20" />
                <span className="font-bold text-lg">Form not ready yet.</span>
              </div>
            ) : form.fileType === "application/pdf" ? (
              <iframe
                src={`${process.env.NEXT_PUBLIC_API_URL}${form.fileDownloadUrl}`}
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
                          href={`${process.env.NEXT_PUBLIC_API_URL}${form.fileDownloadUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {form.fileName}
                        </a>
                      </span>
                      <span className="font-normal text-[13px]">
                        {form.fileSize !== undefined
                          ? bytesToMB(form.fileSize)
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {form ? (
        (role === "ADMIN" ||
          role === "SPK_MANAGER" ||
          (userId !== "" && form.personInCharge?.userId === userId)) && (
          <div className="flex justify-center items-center gap-5">
            <button
              type="button"
              className="btn bg-[#C67A83] hover:bg-[#b96670] text-white"
            >
              <Link
                className="w-full h-full flex justify-center items-center gap-2"
                href={`/forms/edit/${form.formId}`}
              >
                <SquarePen className="h-5 w-5" />
                Edit
              </Link>
            </button>
            <button
              type="button"
              className="btn bg-red-600 hover:bg-red-700 text-white gap-2 flex justify-center items-center"
              onClick={() => {
                if (form.formId) {
                  handleDeleteForm(form.formId);
                } else {
                  triggerGlobalToast("Procedure does not exist.", "error");
                }
              }}
            >
              <Trash2 className="h-5 w-5" />
              Delete
            </button>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center gap-5">
          <button
            type="button"
            className="btn bg-[#C67A83] hover:bg-[#b96670] text-white"
          >
            <Link
              className="w-full h-full flex justify-center items-center gap-2"
              href={`/forms`}
            >
              <CornerDownLeft className="h-5 w-5" />
              Return
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default FormViewPage;
