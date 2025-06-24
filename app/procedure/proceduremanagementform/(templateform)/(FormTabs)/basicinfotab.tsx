import React, { use, useEffect } from "react";
import { ProcedureTemplateFormTabData } from "@/app/interface/ProcedureTemplateFormTabData";
import { Trash } from "lucide-react";
import UserAsyncSelect from "@/app/components/(dropdownselect)/userselect";
import { useState } from "react";
import { SelectOption } from "@/app/interface/SelectOption";
import { User } from "@/app/interface/User";

const BasicInfoTab = ({
  formData,
  setFormData,
}: ProcedureTemplateFormTabData) => {
  const [selectedDisediakan, setSelectedDisediakan] = useState<SelectOption[]>(
    []
  );
  const [selectedDiluluskan, setSelectedDiluluskan] =
    useState<SelectOption | null>(null);

  useEffect(() => {
    const disediakanUsers = formData?.pindaanDokumen?.disediakan || [];
    const diluluskanUser = formData?.pindaanDokumen?.diluluskan;

    if (
      disediakanUsers.length > 0 &&
      typeof disediakanUsers[0] === "object" &&
      "userId" in disediakanUsers[0]
    ) {
      const options = (disediakanUsers as any[]).map((user) => ({
        value: user.userId,
        label: user.name,
      }));
      setSelectedDisediakan(options);
    }

    if (
      diluluskanUser &&
      typeof diluluskanUser === "object" &&
      "userId" in diluluskanUser
    ) {
      const user = diluluskanUser as any;
      setSelectedDiluluskan({
        value: user.userId,
        label: user.name,
      });
    }
  }, [formData]);

  useEffect(() => {}, [selectedDiluluskan, selectedDisediakan]);

  const handleUserSelect = (
    newValue: unknown,
    isMulti: boolean,
    key: keyof typeof formData.pindaanDokumen,
    setLocalState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    if (isMulti) {
      const selectedOptions = (newValue as SelectOption[]) || [];
      setLocalState(selectedOptions);
      const userIds = selectedOptions.map((user) => user.value);
      setFormData({
        ...formData,
        pindaanDokumen: {
          ...formData.pindaanDokumen,
          [key]: userIds,
        },
      });
    } else {
      const selectedOption = newValue as SelectOption | null;
      setLocalState(selectedOption);
      setFormData({
        ...formData,
        pindaanDokumen: {
          ...formData.pindaanDokumen,
          [key]: selectedOption?.value || "",
        },
      });
    }
  };

  return (
    <div className=" bg-base-100 border-base-300 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <fieldset className="flex items-center gap-2 mb-2">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Nama Dokumen:
          </legend>
          <input
            type="text"
            value={formData.namaDokumen ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, namaDokumen: e.target.value })
            }
            className="input border border-gray-500 rounded-md px-2 py-0.5 text-base w-auto flex-1"
          />
        </fieldset>

        <fieldset className="flex items-center gap-2 mb-2">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Nombor Dokumen:
          </legend>
          <input
            type="text"
            value={formData.nomborDokumen ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, nomborDokumen: e.target.value })
            }
            className="input border border-gray-500 rounded-md px-2 py-0.5 text-base w-auto flex-1"
          />
        </fieldset>

        <fieldset className="flex items-center gap-2 mb-2">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Versi:
          </legend>
          <input
            readOnly
            type="text"
            value={formData.pindaanDokumen.versi ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                pindaanDokumen: {
                  ...formData.pindaanDokumen,
                  versi: e.target.value,
                },
              })
            }
            className="input border border-gray-500 rounded-md px-2 py-0.5 text-base w-auto flex-1"
          />
        </fieldset>

        <fieldset className="flex items-center gap-2 mb-2">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Tarikh:
          </legend>
          <input
            type="date"
            value={formData.pindaanDokumen.tarikh ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                pindaanDokumen: {
                  ...formData.pindaanDokumen,
                  tarikh: e.target.value,
                },
              })
            }
            className="input border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
          />
        </fieldset>

        <fieldset className="flex items-center gap-2 mb-2">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Butiran:
          </legend>
          <input
            type="text"
            value={formData.pindaanDokumen.butiran ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                pindaanDokumen: {
                  ...formData.pindaanDokumen,
                  butiran: e.target.value,
                },
              })
            }
            className="input border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
          />
        </fieldset>

        <fieldset className="flex items-center gap-2 mb-2 w-full">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Disediakan:
          </legend>

          {/* <UserAsyncSelect
            isMulti
            label="Disediakan"
            value={selectedDisediakan}
            onChange={handleSelectDisediakan}
            isFullWidth
          /> */}
          <UserAsyncSelect
            isMulti
            label="Disediakan"
            value={selectedDisediakan}
            onChange={(val) =>
              handleUserSelect(val, true, "disediakan", setSelectedDisediakan)
            }
            isFullWidth
          />
        </fieldset>

        {/* <fieldset className="flex items-center gap-2 mb-2">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Diluluskan:
          </legend>
          <input
            type="text"
            value={formData.pindaanDokumen.diluluskan}
            onChange={(e) =>
              setFormData({
                ...formData,
                pindaanDokumen: {
                  ...formData.pindaanDokumen,
                  diluluskan: e.target.value,
                },
              })
            }
            className="input border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
          />
        </fieldset> */}
        <fieldset className="flex items-center gap-2 mb-2 w-full">
          <legend className="fieldset-legend text-base font-semibold w-full px-1">
            Diluluskan:
          </legend>

          {/* <UserAsyncSelect
            label="Diluluskan"
            value={selectedDiluluskan}
            onChange={handleSelectDiluluskan}
            isFullWidth
          /> */}
          <UserAsyncSelect
            isMulti={false}
            label="Diluluskan"
            value={selectedDiluluskan}
            onChange={(val) =>
              handleUserSelect(val, false, "diluluskan", setSelectedDiluluskan)
            }
            isFullWidth
          />
        </fieldset>
      </div>
      <fieldset className="flex items-center gap-2 mb-2">
        <legend className="fieldset-legend text-base font-semibold w-full px-1">
          Deskripsi Perubahan:
        </legend>
        <textarea
          className="textarea border border-gray-500 rounded-lg px-2 py-0.5 text-base w-full"
          placeholder="Changes Description"
          value={formData.pindaanDokumen.deskripsiPerubahan ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              pindaanDokumen: {
                ...formData.pindaanDokumen,
                deskripsiPerubahan: e.target.value,
              },
            })
          }
        ></textarea>
      </fieldset>
      {/* <div className="w-full flex justify-center items-center mt-5 mb-2">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Add Row
        </button>
      </div> */}
    </div>
  );
};

export default BasicInfoTab;
