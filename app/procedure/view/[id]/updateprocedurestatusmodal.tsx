import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import {
  ProcedureApproveStatus,
  ProcedureVersion,
} from "@/app/interface/Procedure";
import { version } from "os";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateProcedureStatusModalProps {
  procedure: ProcedureVersion;
  refetchProcedure: () => void;
}

const UpdateProcedureStatusModal = ({
  procedure,
  refetchProcedure,
}: UpdateProcedureStatusModalProps) => {
  const userId = localStorage.getItem("userId") || "";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProcedureApproveStatus>({
    // defaultValues: {
    //   status: procedure?.pindaanDokumen?.approveStatus || "PENDING",
    //   description: procedure?.pindaanDokumen?.description || "",
    // },
  });

  useEffect(() => {
    if (procedure) {
      reset({
        status: procedure?.pindaanDokumen?.approveStatus || "PENDING",
        description: procedure?.pindaanDokumen?.description || "",
      });
    }
  }, [procedure, reset]);

  const updateProcedureStatus = async (data: ProcedureApproveStatus) => {
    if (!procedure?.procedureId || !userId) {
      triggerGlobalToast("Invalid procedure or approver.", "error");
      return;
    }

    try {
      const token = localStorage.getItem("jwt") || "";

      // if (data.status === "APPROVE") {
      //   setValue("description", "");
      // }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/updateProcedureStatus/${procedure?.procedureId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            approverId: userId,
            status: data.status,
            description: data.status === "APPROVE" ? null : data.description,
            version: procedure?.pindaanDokumen?.versi,
          }),
        }
      );

      const response = await res.json();

      if (res.ok) {
        reset();
        // getProcedureById(procedure?.procedureId);
        (
          document.getElementById(
            "update_procedure_status_modal"
          ) as HTMLDialogElement
        )?.close();
        refetchProcedure();
        triggerGlobalToast(
          response.message ||
            "Procedure status updated successfully. Please refresh to view.",
          "success"
        );
      } else {
        triggerGlobalToast(
          response.message ||
            response.error ||
            "Fail to update procedure status. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        triggerGlobalToast(error.message, "error");
      } else {
        triggerGlobalToast("An error occured. Please try again.", "error");
      }
    }
  };

  return (
    <dialog id="update_procedure_status_modal" className="modal z-50">
      <div className="modal-box w-2/3 max-w-5xl z-50 h-4/5 max-h-5/6 flex flex-col justify-start">
        <div className="w-full flex justify-center items-center my-5">
          <span className="font-bold text-2xl">Update Procedure Status</span>
        </div>
        <form className="w-full" onSubmit={handleSubmit(updateProcedureStatus)}>
          <div className="w-full">
            <div className="px-2">
              <>
                <fieldset className="flex flex-col gap-2 my-5">
                  <legend className="text-base font-semibold px-1">
                    Approve Status: {watch("status")}
                  </legend>
                  {/* <select
                    className="select select-bordered w-full"
                    // value={watch("status") || "PENDING"}
                    {...register("status", {
                      required: "Approve status is required.",
                    })}
                  >
                    <option value="PENDING" disabled>
                      PENDING
                    </option>
                    <option value="APPROVE">APPROVE</option>

                    <option value="REJECT">REJECT</option>
                  </select> */}
                  <select
                    className="select select-bordered w-full"
                    {...register("status", {
                      required: "Approve status is required.",
                    })}
                  >
                    <option value="PENDING" disabled>
                      PENDING
                    </option>
                    <option value="APPROVE">APPROVE</option>
                    <option value="REJECT">REJECT</option>
                  </select>

                  {errors.status && (
                    <p className="text-sm text-red-500">
                      {errors.status.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="flex items-center gap-2">
                  <legend className="fieldset-legend text-base font-semibold w-full px-1 pb-2">
                    Description:
                  </legend>

                  <textarea
                    className="textarea rounded-lg pr-10 w-full h-56"
                    placeholder="Reject Description"
                    {...register("description")}
                    disabled={watch("status") !== "REJECT"}
                  ></textarea>
                  {errors.description && (
                    <p className="text-sm pt-1 text-red-500 ">
                      {errors.description.message}
                    </p>
                  )}
                </fieldset>
              </>
            </div>
          </div>

          <div className="modal-action w-full flex justify-center items-center gap-5">
            <button
              type="submit"
              className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
            >
              Save
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                (
                  document.getElementById(
                    "update_procedure_status_modal"
                  ) as HTMLDialogElement
                )?.close();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProcedureStatusModal;
