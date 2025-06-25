"use client";

import React from "react";
import { useEffect, useState } from "react";
import { User } from "../interface/User";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { triggerGlobalToast } from "../components/(common)/toast/showtoast";

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/getAllUsers`,
        {
          method: "GET",
        }
      );

      console.log("Fetched");

      const data = await res.json();
      const user: User[] = data.data;

      console.log(data);
      setUsers(user);

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to fetch users");
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    (
      document.getElementById("edit_user_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(editingUser);

    if (!editingUser) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/editUser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: editingUser }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUsers(
          users.map((user) =>
            // user.userId === editingUser.userId ? editingUser : user
            user.userId === data.data.userId ? data.data : user
          )
        );

        (
          document.getElementById("edit_user_modal") as HTMLDialogElement
        )?.close();
        setEditingUser(null);
        triggerGlobalToast(
          data.message || "User updated successfully",
          "success"
        );
      } else {
        throw new Error(data.message || data.error || "Failed to update user");
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

  const handleAddUser = () => {
    (
      document.getElementById("add_user_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleAddSubmit = async (newUser: User) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/addUser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: newUser }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUsers([...users, data.data]);

        (
          document.getElementById("add_user_modal") as HTMLDialogElement
        )?.close();

        reset();

        triggerGlobalToast(
          data.message || "User added successfully",
          "success"
        );
      } else {
        throw new Error(data.message || data.error || "Failed to add user");
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

  const handleDeleteUser = (user: User) => {
    (
      document.getElementById("delete_user_modal") as HTMLDialogElement
    )?.showModal();
    setDeleteUser(user);
  };

  const handleDeleteSubmit = async () => {
    console.log(deleteUser);

    if (!deleteUser) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/deleteUser`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: deleteUser.userId }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // setUsers(users.filter((user) => user.userId !== deleteUser.userId));
        fetchUsers();

        (
          document.getElementById("delete_user_modal") as HTMLDialogElement
        )?.close();
        setDeleteUser(null);

        triggerGlobalToast(
          data.message || "User deleted successfully",
          "success"
        );
      } else {
        throw new Error(data.message || data.error || "Failed to delete user");
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

  return (
    <div className="flex flex-col items-center justify-center m-12">
      <div className="text-4xl font-extrabold mb-7">User List</div>
      <div className="w-full px-15">
        <div className="flex justify-end mb-5">
          <button
            className="btn px-4 bg-[#C67A83] text-white text-sm border-0 hover:bg-[#b96670]"
            onClick={handleAddUser}
          >
            <Plus className="h-4 w-4" /> Add User
          </button>
        </div>
        <div className="rounded-box border border-base-content/5 bg-base-100 w-full">
          <table className="table">
            <thead>
              <tr>
                <th className="px-8 py-4 font-bold text-sm">No.</th>
                <th className="px-8 py-4 font-bold">Name</th>
                <th className="px-8 py-4 font-bold">Username</th>
                <th className="px-8 py-4 font-bold">Email</th>
                <th className="px-8 py-4 font-bold">Role</th>
                <th className="px-8 py-4 font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr className="hover:bg-base-300" key={user.userId}>
                  <td className="px-8">{index + 1}</td>
                  <td className="px-8">{user.name}</td>
                  <td className="px-8">{user.username}</td>
                  <td className="px-8">{user.email}</td>
                  <td className="px-8">{user.role}</td>
                  <td className="px-8">
                    <div className="dropdown dropdown-hover">
                      <div
                        className="text-xl font-extrabold cursor-pointer w-3 text-center"
                        tabIndex={0}
                      >
                        ⋮
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto shadow-sm"
                      >
                        <li>
                          <button onClick={() => handleEditUser(user)}>
                            Edit
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleDeleteUser(user)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* edit user modal */}
      <dialog id="edit_user_modal" className="modal">
        <div className="modal-box w-1/3 max-w-5xl">
          <h3 className="font-bold text-lg mb-2">Edit User</h3>
          {editingUser && (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-5">
                <fieldset className="fieldset w-full pt-2 pb-2 relative">
                  <legend className="fieldset-legend font-thin text-sm text-gray-600">
                    Name
                  </legend>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    name="name"
                    required
                    className="input rounded-lg pr-10 w-full"
                  />
                </fieldset>

                <fieldset className="fieldset w-full pt-2 pb-2 relative">
                  <legend className="fieldset-legend font-thin text-sm text-gray-600">
                    Username
                  </legend>
                  <input
                    type="text"
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        username: e.target.value,
                      })
                    }
                    name="username"
                    required
                    className="input rounded-lg pr-10 w-full"
                  />
                </fieldset>

                <fieldset className="fieldset w-full pt-2 pb-2 relative">
                  <legend className="fieldset-legend font-thin text-sm text-gray-600">
                    Email
                  </legend>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    name="email"
                    required
                    className="input rounded-lg pr-10 w-full"
                  />
                </fieldset>

                <fieldset className="fieldset w-full pt-2 pb-2 relative">
                  <legend className="fieldset-legend font-thin text-sm text-gray-600">
                    Role
                  </legend>
                  <select
                    defaultValue={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="select input rounded-lg pr-10 w-full"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="SPK_MANAGER">SPK Manager</option>
                    <option value="ACADEMIC_STAFF">Academic Staff</option>
                    <option value="NON_ACADEMIC_STAFF">
                      Non-Academic Staff
                    </option>
                    <option value="APPROVER">Approver</option>
                  </select>
                </fieldset>
                <div className="modal-action">
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
                          "edit_user_modal"
                        ) as HTMLDialogElement
                      )?.close();
                      setEditingUser(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* add user modal */}
      <dialog id="add_user_modal" className="modal">
        <div className="modal-box w-1/3 max-w-5xl">
          <h3 className="font-bold text-lg mb-2">Add User</h3>
          <form onSubmit={handleSubmit(handleAddSubmit)}>
            <div className="mb-5">
              <fieldset className="fieldset w-full pt-2 pb-2 relative">
                <legend className="fieldset-legend font-thin text-sm text-gray-600">
                  Name
                </legend>
                <input
                  type="text"
                  {...register("name", { required: "Name is required." })}
                  className="input rounded-lg pr-10 w-full"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </fieldset>

              <fieldset className="fieldset w-full pt-2 pb-2 relative">
                <legend className="fieldset-legend font-thin text-sm text-gray-600">
                  Username
                </legend>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required.",
                  })}
                  className="input rounded-lg pr-10 w-full"
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset w-full pt-2 pb-2 relative">
                <legend className="fieldset-legend font-thin text-sm text-gray-600">
                  Email
                </legend>
                <input
                  type="email"
                  {...register("email", { required: "Email is required." })}
                  className="input rounded-lg pr-10 w-full"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </fieldset>

              <fieldset className="fieldset w-full pt-2 pb-2 relative">
                <legend className="fieldset-legend font-thin text-sm text-gray-600">
                  Role
                </legend>
                <select
                  {...register("role", {
                    required: "Role is required.",
                    validate: (value) =>
                      value !== "Select a role" ||
                      "Please select a valid role.",
                  })}
                  className="select input rounded-lg pr-10 w-full"
                  defaultValue="Select a role"
                >
                  <option disabled value="Select a role">
                    Select a role
                  </option>

                  <option value="ADMIN">Admin</option>
                  <option value="SPK_MANAGER">SPK Manager</option>
                  <option value="ACADEMIC_STAFF">Academic Staff</option>
                  <option value="NON_ACADEMIC_STAFF">Non-Academic Staff</option>
                  <option value="APPROVER">Approver</option>
                </select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </fieldset>
              <div className="modal-action">
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
                        "add_user_modal"
                      ) as HTMLDialogElement
                    )?.close();
                    setEditingUser(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>

      {/* delete user modal */}
      <dialog id="delete_user_modal" className="modal">
        <div className="modal-box w-1/3 max-w-5xl">
          <h3 className="font-bold text-lg mb-2">Delete User</h3>
          {deleteUser && (
            // <form onSubmit={handleDeleteSubmit}>
            <div className="mb-5">
              <p>Confirm delete this user?</p>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
                  onClick={handleDeleteSubmit}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    (
                      document.getElementById(
                        "delete_user_modal"
                      ) as HTMLDialogElement
                    )?.close();
                    setDeleteUser(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
            // </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default UserManagementPage;
