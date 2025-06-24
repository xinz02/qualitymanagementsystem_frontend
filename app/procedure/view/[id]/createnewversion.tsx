"use client";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/app/components/(context)/usercontext";
import UserAsyncSelect from "@/app/components/(dropdownselect)/userselect";
import { ProcedureFormData } from "@/app/interface/Procedure";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProcedureFormFields } from "../../proceduremanagement";
import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import { User } from "@/app/interface/User";

// interface CreateNewVersionModalProps {
//   procedureId: string;
//   latestversion: number;
//   assignTos: string[];
// }
interface CreateNewVersionModalProps {
  procedureId: string;
  latestversion: number;
  assignTos: User[];
}

const CreateNewVersionModal = ({
  procedureId,
  latestversion,
  assignTos,
}: CreateNewVersionModalProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProcedureFormData>();

  const { selectedUsers, handleSelectUser, setSelectedUsers } =
    useProcedureFormFields(setValue);

  //   useEffect(() => {
  //     setValue("pindaanDokumen.versi", latestversion.toString());

  //     // 👇 This is new: auto set selectedUsers when assignTos changes
  //     if (assignTos && assignTos.length > 0) {
  //       const userOptions = assignTos.map((id) => ({
  //         value: id,
  //         label: "", // you can fetch and map names if needed
  //       }));
  //       setSelectedUsers(userOptions);
  //       setValue("pindaanDokumen.assignedTo", assignTos);
  //     }
  //   }, [latestversion, assignTos, setValue, setSelectedUsers]);

  useEffect(() => {
    setValue("pindaanDokumen.versi", latestversion.toString());

    // if (assignTos && assignTos.length > 0) {
    //   const userOptions = assignTos.map((user) => ({
    //     value: user.userId,
    //     label: user.name,
    //   }));
    //   setSelectedUsers(userOptions);
    //   setValue(
    //     "pindaanDokumen.assignedTo",
    //     userOptions.map((u) => u.value)
    //   );
    // }
    if (assignTos && assignTos.length > 0) {
      const userOptions = assignTos
        .filter(
          (user): user is typeof user & { userId: string } => !!user.userId
        )
        .map((user) => ({
          value: user.userId,
          label: user.name,
        }));

      setSelectedUsers(userOptions);

      setValue(
        "pindaanDokumen.assignedTo",
        userOptions.map((u) => u.value)
      );
    }
  }, [latestversion, assignTos, setSelectedUsers, setValue]);

  const handleProcedureVersionSubmit = async (data: ProcedureFormData) => {
    const token = localStorage.getItem("jwt") || "";
    const role = localStorage.getItem("userRole") || "";

    if (!token) {
      triggerGlobalToast("Please login to create new procedure version.");
      return;
    }

    if (role !== "ADMIN" && role !== "SPK_MANAGER") {
      triggerGlobalToast(
        "Only Admin or Manager are allowed to create new version",
        "error"
      );
      return;
    }

    // if (
    //   data.pindaanDokumen.assignedTo &&
    //   data.pindaanDokumen.assignedTo.length > 0
    // ) {
    //   const userOptions = data.pindaanDokumen.assignedTo.map((user: any) => ({
    //     value: user.userId,
    //     label: user.name,
    //   }));
    //   setSelectedUsers(userOptions);
    //   setValue(
    //     "pindaanDokumen.assignedTo",
    //     userOptions.map((u: any) => u.value)
    //   );
    // }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/addNewVersion/${procedureId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            versi: data.pindaanDokumen.versi,
            assignedTo: data.pindaanDokumen.assignedTo,
          }),
        }
      );
      const response = await res.json();
      if (res.ok) {
        triggerGlobalToast(
          response.message || "New procedure version created successfully!",
          "success"
        );
        (
          document.getElementById(
            "create_procedure_version_modal"
          ) as HTMLDialogElement
        )?.close();
        router.push(
          `/procedure/proceduremanagementform/edit/${response.data.procedureId}/${response.data.pindaanDokumen.versi}`
        );
      } else {
        triggerGlobalToast(response.message || response.error, "error");
      }
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast("An error occured. Please try again.", "error");
      }
    }
  };

  return (
    <UserProvider>
      <div>
        {/* dialog */}
        <dialog id="create_procedure_version_modal" className="modal z-50">
          <div className="modal-box w-1/2 max-w-5xl z-50 h-3/5 max-h-7/8 flex flex-col p-6">
            {/* Header Section */}
            <div className="w-full flex justify-center items-center mb-6">
              <span className="font-bold text-2xl">
                Create New Procedure Version
              </span>
            </div>

            {/* Form Section - Takes up available space */}
            <form
              className="w-full flex-1 flex flex-col"
              onSubmit={handleSubmit(handleProcedureVersionSubmit)}
            >
              {/* Form Fields */}
              <div className="w-full space-y-4 flex-1">
                <fieldset className="flex items-center gap-3">
                  <legend className="fieldset-legend text-base font-semibold w-24 px-1 shrink-0">
                    Version:
                  </legend>
                  <input
                    type="text"
                    {...register("pindaanDokumen.versi", {
                      required: "Version is required.",
                    })}
                    className="border border-gray-500 bg-white rounded-lg px-3 py-2 text-base flex-1"
                    readOnly
                  />
                </fieldset>

                {errors.pindaanDokumen?.versi && (
                  <p className="text-sm text-red-500 ml-[calc(6rem_+_0.75rem)]">
                    {errors.pindaanDokumen.versi.message}
                  </p>
                )}

                <fieldset className="flex items-start gap-3 pt-2">
                  <legend className="fieldset-legend text-base font-semibold w-24 px-1 pt-2 shrink-0">
                    Assign To:
                  </legend>
                  <div className="flex-1">
                    <UserAsyncSelect
                      isMulti
                      label="Assign To"
                      value={selectedUsers}
                      {...register("pindaanDokumen.assignedTo", {
                        required: "Must assign at least one user.",
                      })}
                      onChange={handleSelectUser}
                      isFullWidth
                    />
                    {errors.pindaanDokumen?.assignedTo && (
                      <p className="text-sm mt-1 text-red-500">
                        {errors.pindaanDokumen?.assignedTo.message}
                      </p>
                    )}
                  </div>
                </fieldset>
              </div>

              {/* Action Buttons - Fixed at bottom */}
              <div className="w-full flex justify-center items-center gap-4 pt-6 mt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670] px-6"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn px-6"
                  onClick={() => {
                    (
                      document.getElementById(
                        "create_procedure_version_modal"
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
      </div>
    </UserProvider>
  );
};

export default CreateNewVersionModal;
