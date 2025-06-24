import { Check, Upload, X } from "lucide-react";
import UserAsyncSelect from "../../(dropdownselect)/userselect";
import { SelectOption } from "@/app/interface/SelectOption";
import { useForm } from "react-hook-form";
import {
  EvidenceFileData,
  EvidenceFileFormData,
} from "@/app/interface/EvidenceFile";
import { useUserContext } from "../../(context)/usercontext";
import { useEffect, useState } from "react";
import { Node } from "@xyflow/react";
import { toast } from "react-toastify";
import Link from "next/link";

interface Props {
  fetchEvidence: (nodeId: string) => void;
  selectedNode: Node;
  mode?: "upload" | "edit";
  onCancel?: () => void;
  evidence?: EvidenceFileData;
}

const EvidenceUploadRow = ({
  fetchEvidence,
  selectedNode,
  mode = "upload",
  onCancel,
  evidence,
}: Props) => {
  const { allUsers } = useUserContext();
  const [selectedPersonInCharge, setSelectedPersonInCharge] =
    useState<SelectOption | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<EvidenceFileFormData>();

  const handleSelectPersonInCharge = (newValue: unknown) => {
    const selectedOption = newValue as SelectOption | null;
    setSelectedPersonInCharge(selectedOption);

    if (selectedOption) {
      setValue("evidenceInfoData.personInCharge", selectedOption.value);
    }
  };

  const handleEvidenceFileUpload = async (data: EvidenceFileFormData) => {
    console.log("Uploading: ", data);
    try {
      if (!selectedNode) {
        throw new Error("Failed to upload file. Please refresh and try again.");
      }

      if (mode === "edit" && evidence == null) {
        throw new Error("Unable to edit. Please refresh and try again.");
      }

      const jwtToken = localStorage.getItem("jwt") || "";

      const formData = new FormData();

      const evidenceInfoData = JSON.stringify({
        flowChartId: selectedNode.data.flowChartId,
        nodeId: selectedNode.id,
        flowChart: selectedNode.data.flowChart,
        personInCharge: data.evidenceInfoData.personInCharge,
        semester: data.evidenceInfoData.semester,
      });

      formData.append("evidenceInfoData", evidenceInfoData);

      let res = null;

      if (mode === "upload") {
        const fileList = data.evidenceFile as any;
        const file = fileList[0] as File;

        formData.append("evidenceFile", file);

        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/procedure/uploadEvidence`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            body: formData,
          }
        );
      } else {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/procedure/editEvidence/${evidence?.fileId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            body: formData,
          }
        );
      }

      const result = await res.json();
      console.log("json result: ", result);

      if (res.ok) {
        resetField("evidenceFile");
        resetField("evidenceInfoData.semester");
        resetField("evidenceInfoData.personInCharge");

        handleSelectPersonInCharge(null);
        fetchEvidence(selectedNode.id);
        toast.success(result.message);
      } else {
        console.log(result.message);
        toast.error(result.message);
      }
      console.log("result", result);
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
    if (mode === "edit" && evidence) {
      // Set form field values
      reset({
        evidenceInfoData: {
          personInCharge: evidence.personInCharge.userId,
          semester: evidence.semester,
        },
      });

      // Set the currently selected person in charge in dropdown
      setSelectedPersonInCharge({
        label: evidence.personInCharge.name,
        value: evidence.personInCharge.userId!,
      });
    }
  }, [evidence, mode]);

  return (
    <tr className="py-2">
      <td className="px-1">
        {mode === "edit" && evidence?.fileDownloadUrl ? (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.NEXT_PUBLIC_API_URL}${evidence.fileDownloadUrl}`}
          >
            {evidence.fileName}
          </Link>
        ) : (
          <fieldset className="flex flex-col justify-center gap-2 min-w-[250px]">
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              className="file-input"
              {...register("evidenceFile", {
                required: "File is required.",
              })}
            />
          </fieldset>
        )}
        {errors.evidenceFile && (
          <p className="text-sm text-red-500 pt-1">
            {errors.evidenceFile.message}
          </p>
        )}
      </td>
      <td>
        <fieldset className="flex items-center gap-2">
          <UserAsyncSelect
            {...register("evidenceInfoData.personInCharge", {
              required: "Person In Charge is required.",
            })}
            label="Person In Charge:"
            value={selectedPersonInCharge}
            onChange={handleSelectPersonInCharge}
            // allUsers={allUsers}
          />
        </fieldset>
        {errors.evidenceInfoData?.personInCharge && (
          <p className="text-sm text-red-500 pt-1">
            {errors.evidenceInfoData.personInCharge.message}
          </p>
        )}
      </td>
      <td>
        <fieldset className="flex flex-col justify-center gap-2">
          <input
            type="text"
            {...register("evidenceInfoData.semester", {
              required: "Semester is required.",
            })}
            className="border border-gray-500 bg-white rounded-lg px-3 py-1 text-base w-auto flex-1"
          />
        </fieldset>
        {errors.evidenceInfoData?.semester && (
          <p className="text-sm text-red-500 pt-1">
            {errors.evidenceInfoData.semester.message}
          </p>
        )}
      </td>
      <td className="h-full">
        <div className="flex gap-2 items-center h-full">
          <button
            type="button"
            className={`btn  text-white ${
              mode == "upload"
                ? "w-full bg-[#C67A83] hover:bg-[#b96670]"
                : "bg-[#03C755]"
            }  `}
            onClick={handleSubmit(handleEvidenceFileUpload)}
          >
            {mode === "edit" ? (
              <Check className="h-5 w-5" />
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Upload
              </>
            )}
          </button>
          {mode === "edit" && (
            <button type="button" className="btn" onClick={onCancel}>
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EvidenceUploadRow;
