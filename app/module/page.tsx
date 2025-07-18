"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Module } from "../interface/Module";
import {
  PlusIcon,
  PlusCircleIcon,
  Trash2Icon,
  PencilIcon,
  CheckIcon,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Category } from "../interface/Category";
import { triggerGlobalToast } from "../components/(common)/toast/showtoast";

const ModulePage = () => {
  const [role, setRole] = useState("STUDENT");
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Module>();

  // All modules
  const [modules, setModules] = useState<Module[]>([]);

  // Module selected in tab
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Add new category
  const [newCategory, setNewCategory] = useState<string>("");
  const categories = watch("categories") || [];
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<
    number | null | string
  >(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>("");

  // Edit Module - add, edit and delete categories
  const [categoriesToBeAdd, setCategoriesToBeAdd] = useState<Category[]>([]);
  const [categoriesToBeEdit, setCategoriesToBeEdit] = useState<Category[]>([]);
  const [categoriesToBeDelete, setCategoriesToBeDelete] = useState<string[]>(
    []
  );

  const fetchModules = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/module/getAllAccessibleModule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        }
      );

      const result = await res.json();
      const data: Module[] = result.data;

      if (!res.ok) {
        throw new Error(
          result.message || result.error || "Failed to fetch module."
        );
      }

      setModules(data);
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast(
          "An unknown error occurred. Please try again later.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("jwt") || "");
    setRole(localStorage.getItem("userRole") || "STUDENT");
  }, []);

  useEffect(() => {
    if (token) {
      fetchModules();
    }
  }, [token]);

  useEffect(() => {
    if (selectedModule) {
      setValue("moduleId", selectedModule.moduleId);
      setValue("moduleName", selectedModule.moduleName);
      setValue("viewPrivilege", selectedModule.viewPrivilege);
      setValue("categories", selectedModule.categories);
    } else {
      reset();
    }
  }, [selectedModule, setValue, reset]);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      // Check if category already exists 
      const categoryExists = categories.some(
        (cat) =>
          cat.categoryName.toLowerCase() === newCategory.trim().toLowerCase()
      );

      if (categoryExists) {
        toast.error("Category already exists!");
        return;
      }

      const newCat: Category = {
        categoryName: newCategory.trim(),
      };
      setValue("categories", [...categories, newCat]);
      setNewCategory("");
      setCategoriesToBeAdd((prev) => [...prev, newCat]);
    }
  };

  const deleteCategory = (deleteCategory: string) => {
    setValue(
      "categories",
      categories.filter((cat) => cat.categoryName !== deleteCategory)
    );
  };

  const handleAddSubmit = async (data: Module) => {
    console.log("Submit data: ", data);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/module/addModule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            moduleName: data.moduleName,
            viewPrivilege: data.viewPrivilege,
            categories: categoriesToBeAdd,
          }),
        }
      );

      const response = await res.json();

      if (res.ok) {
        await fetchModules();

        setSelectedModule(() =>
          data.moduleName
            ? modules.find((m) => m.moduleName === data.moduleName) || null
            : null
        );

        setCategoriesToBeAdd([]);
        // await fetchModules();
        // setSelectedModule(null);
        reset();
        triggerGlobalToast(
          response.message || "Module added successfully!",
          "success"
        );
      } else {
        throw new Error(
          response.message || response.error || "Failed to delete module."
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast(
          "An unknown error occurred. Please try again later.",
          "error"
        );
      }
    }
  };

  const handleEditSubmit = async (data: Module) => {
    console.log(
      JSON.stringify({
        moduleId: data.moduleId,
        moduleName: data.moduleName,
        viewPrivilege: data.viewPrivilege,
        categories: categoriesToBeAdd,
        categoriesToEdit: categoriesToBeEdit,
        categoriesToDelete: categoriesToBeDelete,
      })
    );
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/module/editModule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            moduleId: data.moduleId,
            moduleName: data.moduleName,
            viewPrivilege: data.viewPrivilege,
            categories: categoriesToBeAdd,
            categoriesToEdit: categoriesToBeEdit,
            categoriesToDelete: categoriesToBeDelete.map((categoryId) => ({
              categoryId: categoryId,
            })),
          }),
        }
      );

      const response = await res.json();

      if (res.ok) {
        await fetchModules();
        setSelectedModule(null);
        setCategoriesToBeAdd([]);
        setCategoriesToBeEdit([]);
        setCategoriesToBeDelete([]);

        reset();
        triggerGlobalToast(
          response.message || "Module edited successfully!",
          "success"
        );
      } else {
        throw new Error(
          response.message || response.error || "Failed to delete module."
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast(
          "An unknown error occurred. Please try again later.",
          "error"
        );
      }
    }
  };

  const deleteModule = async (moduleId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this module?"
    );
    if (!confirmDelete) {
      return; // If user cancels, do nothing
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/module/deleteModule`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ moduleId }),
        }
      );

      const response = await res.json();

      if (res.ok) {
        triggerGlobalToast(
          response.message || "Module deleted successfully!",
          "success"
        );
        await fetchModules(); // Refresh module list
        setSelectedModule(null); // Clear selected module
      } else {
        throw new Error(
          response.message || response.error || "Failed to delete module."
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        triggerGlobalToast(error.message, "error");
      } else {
        triggerGlobalToast(
          "An unknown error occurred. Please try again later.",
          "error"
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-12">
      <div className="text-4xl font-extrabold mb-7">Module List</div>
      <div className="w-full px-25">
        <div className="flex border border-gray-500 rounded-lg w-full h-auto">
          <div className="max-h-full bg-gray-100 border-r">
            <div className="tabs bg-gray-100 flex w-55 max-h-fit overflow-y-auto">
              <button
                onClick={() => setSelectedModule(null)}
                className={`tab tab-lift h-15 w-full flex items-center font-semibold hover:bg-blue-100 ${
                  selectedModule === null
                    ? "bg-white font-bold border-l-4 border-[#C67A83] !text-black"
                    : ""
                }`}
              >
                <PlusCircleIcon className="mr-1"></PlusCircleIcon> Add
              </button>
              {modules?.map((module) => (
                <button
                  key={module.moduleName}
                  onClick={() => {
                    setSelectedModule(module);
                  }}
                  className={`tab tab-lift h-15 w-full flex items-center font-semibold hover:bg-blue-100 ${
                    selectedModule === module
                      ? "bg-white font-bold border-l-4 border-[#C67A83] !text-black"
                      : ""
                  }`}
                >
                  {module.moduleName}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full p-5 overflow-y-auto max-h-fit pb-0">
            {selectedModule == null ? (
              <form onSubmit={handleSubmit(handleAddSubmit)}>
                <div className="mb-5">
                  <h3 className="font-extrabold text-2xl my-3 text-center">
                    Add Module
                  </h3>
                  <fieldset className="flex items-center gap-2 py-3 mr-25">
                    <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                      Module Name:
                    </legend>
                    <input
                      type="text"
                      {...register("moduleName", {
                        required: "Module Name is required.",
                      })}
                      className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
                    />
                  </fieldset>
                  {errors.moduleName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.moduleName.message}
                    </p>
                  )}

                  <fieldset className="fieldset w-full py-3 relative px-1">
                    <legend className="fieldset-legend text-base font-semibold">
                      View Privilege:
                    </legend>
                    <label className="fieldset-label text-base font-medium text-black">
                      <input
                        type="checkbox"
                        className="checkbox h-5 w-5 rounded-none border border-gray-500"
                        value="STUDENT"
                        {...register("viewPrivilege", {
                          required: "Must have at least one role selected.",
                        })}
                      />
                      Student
                    </label>
                    <label className="fieldset-label text-base font-medium text-black">
                      <input
                        type="checkbox"
                        className="checkbox h-5 w-5 rounded-none border border-gray-500"
                        value="ACADEMIC_STAFF"
                        {...register("viewPrivilege", {
                          required: "Must have at least one role selected.",
                        })}
                      />
                      Academic Staff
                    </label>
                    <label className="fieldset-label text-base font-medium text-black">
                      <input
                        type="checkbox"
                        className="checkbox h-5 w-5 rounded-none border border-gray-500"
                        value="NON_ACADEMIC_STAFF"
                        {...register("viewPrivilege", {
                          required: "Must have at least one role selected.",
                        })}
                      />
                      Non-Academic Staff
                    </label>
                    {errors.viewPrivilege && (
                      <p className="text-sm text-red-500">
                        {errors.viewPrivilege.message}
                      </p>
                    )}
                  </fieldset>

                  <fieldset className="w-full flex items-center gap-2 pt-3 pb-2 pr-150">
                    <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                      Category:
                    </legend>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
                    />

                    <button
                      type="button"
                      className="bg-[#C67A83] rounded-full"
                      onClick={handleAddCategory}
                    >
                      <PlusIcon className="h-5 w-5 m-1 text-white" />
                    </button>
                  </fieldset>

                  <div className="mx-8">
                    <ul className=" list-disc">
                      {categories.map((cat, index) => (
                        <div key={index} className="flex items-center">
                          {editingCategoryIndex === index ? (
                            <>
                              <input
                                type="text"
                                value={editedCategoryName}
                                onChange={(e) =>
                                  setEditedCategoryName(e.target.value)
                                }
                                className="border border-gray-400 rounded px-2 py-1 mr-2"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedCategories = [...categories];
                                  updatedCategories[index].categoryName =
                                    editedCategoryName;
                                  setValue("categories", updatedCategories);
                                  setEditingCategoryIndex(null); // Exit editing mode
                                }}
                                className="text-green-600"
                              >
                                <CheckIcon></CheckIcon>
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingCategoryIndex(null)}
                                className="text-gray-500 ml-2"
                              >
                                <X></X>
                              </button>
                            </>
                          ) : (
                            <>
                              <li className="pr-2 my-1.5">
                                {cat.categoryName}
                              </li>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCategoryIndex(index);
                                  setEditedCategoryName(cat.categoryName);
                                }}
                                className="mx-1.5"
                              >
                                <PencilIcon></PencilIcon>
                              </button>

                              <button
                                type="button"
                                onClick={() => deleteCategory(cat.categoryName)}
                                className="mx-1.5"
                              >
                                <Trash2Icon></Trash2Icon>
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full flex justify-center mt-5 mb-3">
                    <button
                      type="submit"
                      className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit(handleEditSubmit)}>
                <div className="mb-5">
                  <h3 className="font-extrabold text-2xl my-3 text-center">
                    Edit Module
                  </h3>
                  <fieldset className="flex items-center gap-2 py-3 mr-25">
                    <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                      Module Name:
                    </legend>
                    <input
                      type="text"
                      {...register("moduleName", {
                        required: "Module Name is required.",
                      })}
                      className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
                    />
                  </fieldset>
                  {errors.moduleName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.moduleName.message}
                    </p>
                  )}

                  <fieldset className="fieldset w-full py-3 relative px-1">
                    <legend className="fieldset-legend text-base font-semibold">
                      View Privilege:
                    </legend>
                    <label className="fieldset-label text-base font-medium text-black">
                      <input
                        type="checkbox"
                        className="checkbox h-5 w-5 rounded-none border border-gray-500"
                        value="STUDENT"
                        {...register("viewPrivilege", {
                          required: "Must have at least one role selected.",
                        })}
                      />
                      Student
                    </label>
                    <label className="fieldset-label text-base font-medium text-black">
                      <input
                        type="checkbox"
                        className="checkbox h-5 w-5 rounded-none border border-gray-500"
                        value="ACADEMIC_STAFF"
                        {...register("viewPrivilege", {
                          required: "Must have at least one role selected.",
                        })}
                      />
                      Academic Staff
                    </label>
                    <label className="fieldset-label text-base font-medium text-black">
                      <input
                        type="checkbox"
                        className="checkbox h-5 w-5 rounded-none border border-gray-500"
                        value="NON_ACADEMIC_STAFF"
                        {...register("viewPrivilege", {
                          required: "Must have at least one role selected.",
                        })}
                      />
                      Non-Academic Staff
                    </label>
                    {errors.viewPrivilege && (
                      <p className="text-sm text-red-500">
                        {errors.viewPrivilege.message}
                      </p>
                    )}
                  </fieldset>

                  <fieldset className="w-full flex items-center gap-2 pt-3 pb-2 pr-150">
                    <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                      Category:
                    </legend>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
                    />

                    <button
                      type="button"
                      className="bg-[#C67A83] rounded-full"
                      onClick={handleAddCategory}
                    >
                      <PlusIcon className="h-5 w-5 m-1 text-white" />
                    </button>
                  </fieldset>

                  <div className="mx-8">
                    <ul className=" list-disc">
                      {categories.map((cat, index) => (
                        <div key={index} className="flex items-center">
                          {editingCategoryIndex === index ? (
                            <>
                              <input
                                type="text"
                                value={editedCategoryName}
                                onChange={(e) =>
                                  setEditedCategoryName(e.target.value)
                                }
                                className="border border-gray-400 rounded px-2 py-1 mr-2"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedCategories = [...categories];
                                  const categoryExists = categories.some(
                                    (cat) =>
                                      cat.categoryName.toLowerCase() ===
                                      editedCategoryName.trim().toLowerCase()
                                  );

                                  if (categoryExists) {
                                    toast.error("Category already exists!");
                                    return;
                                  }
                                  updatedCategories[index].categoryName =
                                    editedCategoryName;
                                  setValue("categories", updatedCategories);

                                  const editCategory: Category = {
                                    categoryId:
                                      updatedCategories[index].categoryId,
                                    categoryName: editedCategoryName,
                                  };

                                  setCategoriesToBeEdit((prev) => {
                                    const existingIndex = prev.findIndex(
                                      (cat) =>
                                        cat.categoryId ===
                                        editCategory.categoryId
                                    );
                                    if (existingIndex !== -1) {
                                      // Exists: update it
                                      const newCategories = [...prev];
                                      newCategories[existingIndex] =
                                        editCategory;
                                      return newCategories;
                                    } else {
                                      // Not exists: add it
                                      return [...prev, editCategory];
                                    }
                                  });

                                  setEditingCategoryIndex(null); // Exit editing mode
                                }}
                                className="text-green-600"
                              >
                                <CheckIcon></CheckIcon>
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingCategoryIndex(null)}
                                className="text-gray-500 ml-2"
                              >
                                <X></X>
                              </button>
                            </>
                          ) : (
                            <>
                              <li className="pr-2 my-1.5">
                                {cat.categoryName}
                              </li>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCategoryIndex(index);
                                  setEditedCategoryName(cat.categoryName);
                                }}
                                className="mx-1.5"
                              >
                                <PencilIcon></PencilIcon>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (cat.categoryId !== undefined) {
                                    setCategoriesToBeDelete((prev) => [
                                      ...prev,
                                      cat.categoryId!,
                                    ]);
                                  }
                                  deleteCategory(cat.categoryName);
                                }}
                                className="mx-1.5"
                              >
                                <Trash2Icon></Trash2Icon>
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>

                  <input type="hidden" {...register("categories")}></input>

                  <div className="w-full flex justify-center mt-5 mb-3">
                    <button
                      type="submit"
                      className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670] mx-3"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="btn bg-red-600 text-white border-0  mx-3"
                      onClick={() => {
                        if (selectedModule.moduleId) {
                          deleteModule(selectedModule.moduleId);
                        } else {
                          console.error("moduleId is undefined");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
