"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import CreatableSelect from "react-select/creatable";
import { FontSize } from "./fontsizeextension";
// import { CustomTable } from "./tableextension";
import { CustomTableCell } from "./tablecellextension";

import {
  LucideBold,
  LucideItalic,
  LucideList,
  LucideHeading1,
  LucideTable,
  LucideStrikethrough,
  LucideChevronDown,
  LucideHeading,
  LucideHeading2,
  LucideHeading3,
  LucideHeading4,
  LucideHeading5,
  LucideHeading6,
  LucideListOrdered,
  LucideUnderline,
  LucidePilcrow,
  LucideHighlighter,
  LucideBan,
  LucideAlignLeft,
  LucideAlignCenter,
  LucideAlignRight,
  LucideAlignJustify,
  LucideUndo2,
  LucideRedo2,
  LucideSubscript,
  LucideSuperscript,
  LucideGrid2X2Plus,
  LucideGrid2X2X,
  LucideGrid2X2,
  LucideMerge,
  LucideTableCellsMerge,
  LucidePalette,
} from "lucide-react";

const fontSizeOptions = [
  { value: "7pt", label: "7" },
  { value: "7.5pt", label: "7.5" },
  { value: "8pt", label: "8" },
  { value: "9pt", label: "9" },
  { value: "10pt", label: "10" },
  { value: "10.5pt", label: "10.5" },
  { value: "11pt", label: "11" },
  { value: "12pt", label: "12" },
  { value: "14pt", label: "14" },
  { value: "16pt", label: "16" },
  { value: "18pt", label: "18" },
  { value: "20pt", label: "20" },
  { value: "22pt", label: "22" },
  { value: "26pt", label: "26" },
  { value: "28pt", label: "28" },
  { value: "36pt", label: "36" },
  { value: "48pt", label: "48" },
  { value: "56pt", label: "56" },
  { value: "72pt", label: "72" },
];

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  height?: string | number;
};

export default function RichTextEditor({
  value,
  onChange,
  label,
  height,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      FontFamily,
      FontSize,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "prose-table", // Optional: add a custom class
        },
      }),
      TableRow,
      TableHeader,
      // TableCell,
      // CustomTable,
      CustomTableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none overflow-y-auto",
        style: `height: ${typeof height === 'number' ? `${height}px` : height || '250px'};`,
      },
    },
    immediatelyRender: false,
  });

  const [fontOption, setFontOption] = useState(fontSizeOptions);

  const handleCreate = (inputValue: string) => {
    const newOption = { value: inputValue + "pt", label: inputValue };

    setFontOption((prevOptions) => [...prevOptions, newOption]);

    if (editor) {
      editor
        .chain()
        .focus()
        .setMark("textStyle", { fontSize: newOption.value })
        .run();
    }
  };

  useEffect(() => {
    if (editor) {
      editor.chain().focus().setMark("textStyle", { fontSize: "12pt" }).run();
      editor.chain().focus().setFontFamily("arial").run();
    }
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  if (!editor) return null;

  return (
    <div className="space-y-2 mb-5">
      {label && (
        <label className="block text-base font-semibold">{label}:</label>
      )}

      <div className="border-1">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 border-b p-2">
          <div className="tooltip" data-tip="Undo">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              className="btn btn-xs btn-ghost px-1 py-4"
            >
              <LucideUndo2 className="w-5 h-5" />
            </button>
          </div>

          <div className="tooltip" data-tip="Redo">
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              className="btn btn-xs btn-ghost px-1 py-4"
            >
              <LucideRedo2 className="w-5 h-5" />
            </button>
          </div>
          <div className="divider divider-horizontal !w-0 h-auto py-1 px-0 mx-0 "></div>

          {/* font family */}
          <div className="dropdown dropdown-start">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-xs btn-ghost pr-1 pl-2 py-4 w-35 flex justify-between bg-base-300"
            >
              {editor.isActive("textStyle", { fontFamily: "Inter" }) ? (
                <span className="text-sm font-medium text-nowrap font-[Inter]">
                  Inter
                </span>
              ) : editor.isActive("textStyle", {
                  fontFamily: '"Comic Sans MS", "Comic Sans"',
                }) ? (
                <span
                  style={{
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  }}
                  className="text-sm font-medium text-nowrap"
                >
                  Comic Sans
                </span>
              ) : editor.isActive("textStyle", { fontFamily: "serif" }) ? (
                <span className="text-sm font-medium text-nowrap font-[serif]">
                  Serif
                </span>
              ) : editor.isActive("textStyle", { fontFamily: "monospace" }) ? (
                <span className="text-sm font-medium text-nowrap font-[monospace]">
                  Monospace
                </span>
              ) : editor.isActive("textStyle", { fontFamily: "arial" }) ? (
                <span className="text-sm font-medium text-nowrap font-[arial]">
                  Arial
                </span>
              ) : editor.isActive("textStyle", { fontFamily: "verdana" }) ? (
                <span className="text-sm font-medium text-nowrap font-[verdana]">
                  Verdana
                </span>
              ) : editor.isActive("textStyle", { fontFamily: "roboto" }) ? (
                <span className="text-sm font-medium text-nowrap font-[roboto]">
                  Roboto
                </span>
              ) : editor.isActive("textStyle", {
                  fontFamily: "Times New Roman",
                }) ? (
                <span
                  className="text-sm font-medium text-nowrap"
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  Times New Roman
                </span>
              ) : (
                "Default"
              )}
              <LucideChevronDown className="w-3 h-3" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-35 p-2 shadow-sm"
            >
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", { fontFamily: "arial" })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().setFontFamily("arial").run()
                  }
                  data-test-id="arial"
                >
                  <span className="text-sm font-medium text-nowrap font-[arial]">
                    Arial
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", {
                      fontFamily: '"Comic Sans MS", "Comic Sans"',
                    })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setFontFamily('"Comic Sans MS", "Comic Sans"')
                      .run()
                  }
                  data-test-id="inter"
                >
                  <span
                    style={{
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    }}
                    className="text-sm font-medium text-nowrap"
                  >
                    Comic Sans
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", { fontFamily: "Inter" })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().setFontFamily("Inter").run()
                  }
                  data-test-id="inter"
                >
                  <span className="text-sm font-medium text-nowrap font-[Inter]">
                    Inter
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", { fontFamily: "monospace" })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().setFontFamily("monospace").run()
                  }
                  data-test-id="monospace"
                >
                  <span className="text-sm font-medium text-nowrap font-[monospace]">
                    Monospace
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", { fontFamily: "roboto" })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().setFontFamily("roboto").run()
                  }
                  data-test-id="roboto"
                >
                  <span className="text-sm font-medium text-nowrap font-[roboto]">
                    Roboto
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", { fontFamily: "serif" })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().setFontFamily("serif").run()
                  }
                  data-test-id="serif"
                >
                  <span className="text-sm font-medium text-nowrap font-[serif]">
                    Serif
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", {
                      fontFamily: "Times New Roman",
                    })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setFontFamily("Times New Roman")
                      .run()
                  }
                  data-test-id="times-new-roman"
                >
                  <span
                    className="text-sm font-medium text-nowrap"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Times New Roman
                  </span>
                </div>
              </li>

              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost pl-2 pr-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("textStyle", { fontFamily: "verdana" })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().setFontFamily("verdana").run()
                  }
                  data-test-id="verdana"
                >
                  <span className="text-sm font-medium text-nowrap font-[verdana]">
                    Verdana
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* font size */}
          <CreatableSelect
            className="w-40 text-sm"
            placeholder="Font size"
            options={fontOption}
            onCreateOption={handleCreate}
            onChange={(selectedOption) => {
              if (!selectedOption || !editor) return;
              editor.chain().focus().setFontSize(selectedOption.value).run();
            }}
            isClearable
            isSearchable
            value={fontOption.find(
              (option) =>
                editor?.getAttributes("textStyle").fontSize === option.value
            )}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#eee",
                minHeight: "34px",
                height: "34px",
                borderColor: "#eee", // Always #eee
                "&:hover": {
                  borderColor: "#eee", // Also #eee on hover
                },
              }),
              input: (base) => ({
                ...base,
                color: "#eee",
                // height: "34px",
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 8px",
                height: "34px",
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: "34px",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                padding: "4px",
              }),
              clearIndicator: (base) => ({
                ...base,
                padding: "4px",
              }),
            }}
          />

          {/* heading */}
          {/* <div className="dropdown dropdown-start">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-xs btn-ghost px-1 py-4 gap-0 bg-base-300"
            >
              {editor.isActive("heading", { level: 1 }) ? (
                <LucideHeading1 className="w-5 h-5" />
              ) : editor.isActive("heading", { level: 2 }) ? (
                <LucideHeading2 className="w-5 h-5" />
              ) : editor.isActive("heading", { level: 3 }) ? (
                <LucideHeading3 className="w-5 h-5" />
              ) : editor.isActive("heading", { level: 4 }) ? (
                <LucideHeading4 className="w-5 h-5" />
              ) : editor.isActive("heading", { level: 5 }) ? (
                <LucideHeading5 className="w-5 h-5" />
              ) : editor.isActive("heading", { level: 6 }) ? (
                <LucideHeading6 className="w-5 h-5" />
              ) : editor.isActive("paragraph") ? (
                <LucidePilcrow className="w-5 h-5" />
              ) : (
                <LucideHeading className="w-5 h-5" />
              )}
              <LucideChevronDown className="w-3 h-3" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm"
            >
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost px-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <LucideHeading1 className="w-5 h-5 pl-1" />
                  <span className="text-sm font-medium text-nowrap">
                    Heading 1
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost px-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <LucideHeading2 className="w-5 h-5 pl-1" />
                  <span className="text-sm font-medium text-nowrap">
                    Heading 2
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost px-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  <LucideHeading3 className="w-5 h-5 pl-1" />
                  <span className="text-sm font-medium text-nowrap">
                    Heading 3
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost px-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("heading", { level: 4 })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                  }
                >
                  <LucideHeading4 className="w-5 h-5 pl-1" />
                  <span className="text-sm font-medium text-nowrap">
                    Heading 4
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost px-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("heading", { level: 5 })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                  }
                >
                  <LucideHeading5 className="w-5 h-5 pl-1" />
                  <span className="text-sm font-medium text-nowrap">
                    Heading 5
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost px-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("heading", { level: 6 })
                      ? "bg-base-300"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                  }
                >
                  <LucideHeading6 className="w-5 h-5 pl-1" />
                  <span className="text-sm font-medium text-nowrap">
                    Heading 6
                  </span>
                </div>
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-xs btn-ghost px-1 py-4 gap-2 flex items-center justify-start ${
                    editor.isActive("paragraph") ? "bg-base-300" : ""
                  }`}
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  <LucidePilcrow className="w-5 h-5 pl-1" />
                  <span className="text-sm font-medium text-nowrap">
                    Paragraph
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="divider divider-horizontal !w-0 h-auto py-1 px-0 mx-0 "></div> */}

          {/* text style */}
          <div className="tooltip" data-tip="Bold">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive("bold") ? "bg-base-300" : ""
              }`}
            >
              <LucideBold className="w-5 h-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Italic">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive("italic") ? "bg-base-300" : ""
              }`}
            >
              <LucideItalic className="w-5 h-5" />
            </button>
          </div>

          <div className="tooltip" data-tip="Underline">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive("underline") ? "bg-base-300" : ""
              }`}
            >
              <LucideUnderline className="w-5 h-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Strike">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive("strike") ? "bg-base-300" : ""
              }`}
            >
              <LucideStrikethrough className="w-5 h-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Subscript">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive("subscript") ? "bg-base-300" : ""
              }`}
            >
              <LucideSubscript className="w-5 h-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Superscript">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive("superscript") ? "bg-base-300" : ""
              }`}
            >
              <LucideSuperscript className="w-5 h-5" />
            </button>
          </div>

          {/* Highlight */}
          <div className="tooltip" data-tip="Highlight">
            <div className="dropdown dropdown-center">
              <div
                tabIndex={0}
                role="button"
                // className="btn btn-xs btn-ghost px-1 py-4"
                className={`btn btn-xs btn-ghost px-1 py-4 ${
                  editor.isActive("highlight") ? "bg-base-300" : ""
                }`}
              >
                <LucideHighlighter className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-85 p-2 shadow-sm flex flex-row justify-between"
              >
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("highlight", { color: "#faf594" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#faf594" })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-[#faf594]"></div>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("highlight", { color: "#ffc078" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#ffc078" })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-[#ffc078]"></div>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("highlight", { color: "#8ce99a" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#8ce99a" })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-[#8ce99a]"></div>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("highlight", { color: "#74c0fc" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#74c0fc" })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-[#74c0fc]"></div>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("highlight", { color: "#b197fc" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#b197fc" })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-[#b197fc]"></div>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("highlight", { color: "#ffa8a8" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#ffa8a8" })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-[#ffa8a8]"></div>
                  </div>
                </li>
                <div className="divider divider-horizontal !w-0 h-auto py-1 px-0 mx-0 "></div>

                <li>
                  <button
                    type="button"
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center"
                    onClick={() =>
                      editor.chain().focus().unsetHighlight().run()
                    }
                  >
                    <LucideBan className="w-5 h-5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="divider divider-horizontal !w-0 h-auto py-1 px-0 mx-0 "></div>
          {/* list */}
          <div className="tooltip" data-tip="List">
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-xs btn-ghost px-1 py-4 gap-0 ${
                  editor.isActive("orderedList") ||
                  editor.isActive("bulletList")
                    ? "bg-base-300"
                    : ""
                }`}
              >
                <LucideList className="w-5 h-5" />
                <LucideChevronDown className="w-3 h-3" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm"
              >
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost pl-1 pr-2 py-4 gap-2 flex items-center justify-start ${
                      editor.isActive("bulletList") ? "bg-base-300" : ""
                    }`}
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                  >
                    <LucideList className="w-5 h-5 pl-1" />
                    <span className="text-sm font-medium text-nowrap">
                      Bullet List
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost pl-1 pr-2 py-4 gap-2 flex items-center justify-start ${
                      editor.isActive("orderedList") ? "bg-base-300" : ""
                    }`}
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                  >
                    <LucideListOrdered className="w-5 h-5 pl-1" />
                    <span className="text-sm font-medium text-nowrap">
                      Ordered List
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Text Align */}
          <div className="tooltip" data-tip="Left">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive({ textAlign: "left" }) ? "bg-base-300" : ""
              }`}
            >
              <LucideAlignLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Center">
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive({ textAlign: "center" }) ? "bg-base-300" : ""
              }`}
            >
              <LucideAlignCenter className="w-5 h-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Right">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive({ textAlign: "right" }) ? "bg-base-300" : ""
              }`}
            >
              <LucideAlignRight className="w-5 h-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Justify">
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={`btn btn-xs btn-ghost px-1 py-4 ${
                editor.isActive({ textAlign: "justify" }) ? "bg-base-300" : ""
              }`}
            >
              <LucideAlignJustify className="w-5 h-5" />
            </button>
          </div>
          <div className="divider divider-horizontal !w-0 h-auto py-1 px-0 mx-0 "></div>

          {/* table */}
          <div className="tooltip" data-tip="Insert Table">
            <button
              type="button"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
                  .run()
              }
              className="btn btn-xs btn-ghost px-1 py-4"
            >
              <LucideGrid2X2 className="w-5 h-5" />
            </button>
          </div>

          <div className="tooltip" data-tip="Table Addition Operation">
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-xs btn-ghost px-1 py-4 gap-0"
              >
                <LucideGrid2X2Plus className="w-5 h-5" />
                <LucideChevronDown className="w-3 h-3" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm"
              >
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-start"
                    onClick={() =>
                      editor.chain().focus().addColumnBefore().run()
                    }
                  >
                    <span className="text-sm font-medium text-nowrap">
                      Add Column Before
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-start"
                    onClick={() =>
                      editor.chain().focus().addColumnAfter().run()
                    }
                  >
                    <span className="text-sm font-medium text-nowrap">
                      Add Column After
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-start"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                  >
                    <span className="text-sm font-medium text-nowrap">
                      Add Row Before
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-start"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                  >
                    <span className="text-sm font-medium text-nowrap">
                      Add Row After
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="tooltip" data-tip="Table Deletion Operation">
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-xs btn-ghost px-1 py-4 gap-0"
              >
                <LucideGrid2X2X className="w-5 h-5" />
                <LucideChevronDown className="w-3 h-3" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm"
              >
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-start"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                  >
                    <span className="text-sm font-medium text-nowrap">
                      Delete Column
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-start"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                  >
                    <span className="text-sm font-medium text-nowrap">
                      Delete Row
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-xs btn-ghost px-2 py-4 flex items-center justify-start"
                    onClick={() => editor.chain().focus().deleteTable().run()}
                  >
                    <span className="text-sm font-medium text-nowrap">
                      Delete Table
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="tooltip" data-tip="Merge or Split Cell">
            <button
              type="button"
              onClick={() => editor.chain().focus().mergeOrSplit().run()}
              className="btn btn-xs btn-ghost px-1 py-4"
            >
              <LucideTableCellsMerge className="w-5 h-5" />
            </button>
          </div>

          {/* border color */}
          <div className="tooltip" data-tip="Table Border Color">
            <div className="dropdown dropdown-center">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-xs btn-ghost px-1 py-4"
              >
                {editor.isActive("tableCell", { borderColor: "red" }) ? (
                  <LucidePalette className="w-5 h-5 text-red-500" />
                ) : editor.isActive("tableCell", { borderColor: "blue" }) ? (
                  <LucidePalette className="w-5 h-5 text-blue-500" />
                ) : editor.isActive("tableCell", { borderColor: "black" }) ? (
                  <LucidePalette className="w-5 h-5 text-black" />
                ) :editor.isActive("tableCell", { borderColor: "transparent" }) ? (
                  <LucidePalette className="w-5 h-5 text-gray-400" />
                ) : (
                  <LucidePalette className="w-5 h-5 text-black" />
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-45 p-2 shadow-sm flex flex-row justify-between"
              >
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("tableCell", { borderColor: "red" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .updateAttributes("tableCell", {
                          borderColor: "red",
                        })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-red-500"></div>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("tableCell", { borderColor: "blue" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .updateAttributes("tableCell", {
                          borderColor: "blue",
                        })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                  </div>
                </li>
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("tableCell", { borderColor: "black" })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .updateAttributes("tableCell", {
                          borderColor: "black",
                        })
                        .run()
                    }
                  >
                    <div className="h-5 w-5 rounded-full bg-black"></div>
                  </div>
                </li>

                <div className="divider divider-horizontal !w-0 h-auto py-1 px-0 mx-0 "></div>

                <li>
                  <button
                    type="button"
                    tabIndex={0}
                    role="button"
                    className={`btn btn-xs btn-ghost px-2 py-4 flex items-center justify-center ${
                      editor.isActive("tableCell", {
                        borderColor: "transparent",
                      })
                        ? "bg-base-300"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .updateAttributes("tableCell", {
                          borderColor: "transparent",
                        })
                        .run()
                    }
                  >
                    <LucideBan className="w-5 h-5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-3"
        />
      </div>
    </div>
  );
}
