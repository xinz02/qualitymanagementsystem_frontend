// components/UserAsyncSelect.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";
import { SelectOption } from "@/app/interface/SelectOption";
import { useUserContext } from "../(context)/usercontext";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface UserAsyncSelectProps {
  isMulti?: boolean;
  value: SelectOption | SelectOption[] | null;
  onChange: (value: unknown) => void;
  // label: string;
  // error?: string;
  // allUsers: User[];
  placeholder?: string;
  isApprover?: boolean;
  isFullWidth?: boolean;
}

const UserAsyncSelect: React.FC<UserAsyncSelectProps> = ({
  isMulti = false,
  value,
  onChange,
  // label,
  // error,
  // allUsers,
  isApprover = false,
  isFullWidth = false,
}) => {
  const { allUsers } = useUserContext();
  const loadOptions = async (inputValue: string) => {
    let filtered = null;

    if (isApprover) {
      filtered = allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(inputValue.toLowerCase()) &&
          user.role === "APPROVER"
      );
    } else {
      filtered = allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(inputValue.toLowerCase()) &&
          user.role !== "ADMIN" &&
          user.role !== "SPK_MANAGER" &&
          user.role !== "APPROVER"
      );
    }

    // const filtered = allUsers.filter(
    //   (user) =>
    //     user.username.toLowerCase().includes(inputValue.toLowerCase()) &&
    //     user.role !== "ADMIN" &&
    //     user.role !== "SPK_MANAGER"
    // );

    return filtered.map((user) => ({
      value: user.userId!,
      label: user.username,
    }));
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      isMulti={isMulti}
      isClearable
      value={value}
      onChange={onChange}
      placeholder={isMulti ? "Select User(s)" : "Select User"}
      styles={{
        container: (base) => ({
          ...base,

          width: isFullWidth ? "100%" : "auto", // <-- optional fallback
        }),
        control: (base) => ({
          ...base,
          borderColor: "#6b7280",
          borderRadius: "0.5rem",
          paddingTop: "0",
          paddingBottom: "0",
          minWidth: isFullWidth ? "100%" : "250px", // <-- fixed this
          width: isFullWidth ? "100%" : "auto", // <-- optional fallback
          "&:hover": {
            borderColor: "#6b7280",
          },
        }),
        menu: (base) => ({
          ...base,
          zIndex: 999,
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: "150px",
          overflowY: "auto",
        }),
      }}
    />
  );
};

export default UserAsyncSelect;
