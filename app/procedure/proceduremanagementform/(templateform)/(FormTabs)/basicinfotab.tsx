import React from "react";
import { ProcedureTemplateFormTabData } from "@/app/interface/ProcedureTemplateFormTabData";

const BasicInfoTab = ({
  formData,
  setFormData,
}: ProcedureTemplateFormTabData) => {
  return (
    <div className=" bg-base-100 border-base-300 p-6">
      <fieldset className="flex items-center gap-2 py-3 mr-25">
        <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
          Nama Dokumen:
        </legend>
        <input
          type="text"
          value={formData.namaDokumen}
          onChange={
            (e) => setFormData({ ...formData, namaDokumen: e.target.value })
            // setFormData((prev) => {
            //   if (!prev) return null;
            //   return { ...prev, namaDokumen: e.target.value };
            // })
          }
          className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
        />
      </fieldset>

      <fieldset className="flex items-center gap-2 py-3 mr-25">
        <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
          Nombor Dokumen:
        </legend>
        <input
          type="text"
          value={formData.nomborDokumen}
          onChange={
            (e) => setFormData({ ...formData, nomborDokumen: e.target.value })
            // setFormData((prev) => {
            //   if (!prev) return null;
            //   return { ...prev, nomborDokumen: e.target.value };
            // })
          }
          className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
        />
      </fieldset>

      <table className="table w-full border my-4">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-2 py-1">Pindaan</th>
            <th className="border px-2 py-1">Tarikh</th>
            <th className="border px-2 py-1">Butiran</th>
            <th className="border px-2 py-1">Disediakan</th>
            <th className="border px-2 py-1">Diluluskan</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.pindaanDokumen.map((row, index) => (
            <tr key={index}>
              {(
                [
                  "pindaan",
                  "tarikh",
                  "butiran",
                  "disediakan",
                  "diluluskan",
                ] as const
              ).map((field) => (
                <td key={field} className="border px-2 py-1">
                  <input
                    type="text"
                    value={row[field]}
                    onChange={(e) => {
                      const updated = [...formData.pindaanDokumen];
                      updated[index] = {
                        ...updated[index],
                        [field]: e.target.value,
                      };
                      setFormData({ ...formData, pindaanDokumen: updated });
                    }}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </td>
              ))}
              <td className="border px-2 py-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.pindaanDokumen.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, pindaanDokumen: updated });
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() =>
          setFormData({
            ...formData,
            pindaanDokumen: [
              ...formData.pindaanDokumen,
              {
                pindaan: "",
                tarikh: "",
                butiran: "",
                disediakan: "",
                diluluskan: "",
              },
            ],
          })
        }
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
      >
        + Add Row
      </button>
    </div>
  );
};

export default BasicInfoTab;
