import {
  declarePeerDependency,
  defineExtension,
  type EditorThemeClasses,
} from "lexical";

function join(...args: string[]) {
  return args.join(" ");
}

const checklistItemCommonClasses = join(
  "relative [&]:mx-[0.5em] px-[1.5em] list-none outline-none block min-h-[1.5em]",
  "before:w-4 before:h-4 before:top-[50%] before:-translate-y-[50%] before:left-0 before:cursor-pointer before:block before:bg-color before:absolute before:border before:border-solid before:rounded-sm",
  "rtl:before:left-auto rtl:before:right-0",
  "focus:before:shadow-[0_0_0_2px_#a6cdfe]",
);

const listCommonClasses = "p-0 m-0 list-outside";

const theme: EditorThemeClasses = {
  // TODO animation
  blockCursor: join(
    "block pointer-events-none absolute",
    "after:block after:absolute after:-top-0.5 after:width-5 after:border-t after:border-solid after:border-black after:animate-lexical-cursor-blink",
  ),
  code: join(
    "bg-slate-100! pl-13 rounded no-wrap text-md text-white font-mono w-full overflow-x-auto block relative ",
    "before:content-[attr(data-gutter)] before:left-1 before:w-10 before:h-full before:text-end before:absolute",
    "whitespace-pre before:whitespace-break-spaces",
    "before:bg-slate-200 before:border-r-1 before:border-solid before:border-r-slate-500 before:pr-1.5",
    "after:content-[attr(data-language)] after:right-1  after:h-full after:text-start after:absolute after:top-1 after:uppercase",
  ),
  heading: {
    h1: "text-[26px] text-neutral-950 font-bold m-0",
    h2: "text-[20px] text-gray-700 font-bold m-0 uppercase underline",
    h3: "text-[18px] m-0 uppercase",
    h4: undefined,
    h5: undefined,
    h6: undefined,
  },
  hr: join(
    "p-0.5 border-none mx-0 my-[1em] cursor-pointer",
    `after:block after:content-[''] after:h-[2px] after:leading-[2px] after:bg-[#ccc]`,
  ),
  hrSelected: "outline-[2px] outline-solid outline-[rgb(60,132,244)]",
  indent: "[--lexical-indent-base-value:40px]",
  link: join("text-blue-600", "hover:underline hover:cursor-pointer"),
  list: {
    checklist: "",
    listitem: join(
      "mx-8 my-0",
      "font-(family-name:--listitem-marker-font-family) text-(length:--listitem-marker-font-size) bg-(--listitem-marker-background-color)",
      "marker:text-(--listitem-marker-color) marker:font-(family-name:--listitem-marker-font-family) marker:text-(length:--listitem-marker-font-size) marker:bg-(--listitem-marker-background-color)",
    ),
    // TODO fix up checked/unchecked
    listitemChecked: join(
      checklistItemCommonClasses,
      "line-through",
      "before:border-[rgb(61,135,245)] before:bg-[#3d87f5] before:bg-no-repeat",
      "after:cursor-pointer after:border-white after:border-solid after:absolute after:block after:top-1.5 after:width-[3px] after:inset-x-[7px] after:height-1.5 after:rotate-45 after:border-t-0 after:border-r-0.5 after:border-b-0.5 after:border-l-0",
    ),
    listitemUnchecked: join(checklistItemCommonClasses, "before:border-[#999]"),
    nested: {
      listitem: join("list-none", "before:hidden", "after:hidden"),
    },
    olDepth: [
      "list-decimal",
      "list-[upper-alpha]",
      "list-[lower-alpha]",
      "list-[upper-roman]",
      "list-[lower-roman]",
    ].map((cls) => join(listCommonClasses, cls)),
    ul: join(listCommonClasses, "list-disc"),
  },
  paragraph: "relative m-0",
  quote:
    "m-0 ml-5 mb-2.5 text-[15px] text-gray-500 border-slate-300 border-l-4 border-solid pl-4",
  table:
    "border-collapse border-spacing-0 overflow-scroll table-fixed w-[calc(100%-50px)] mx-auto mt-0 mb-[30px]",
  tableCell:
    "border border-solid border-[#bbb] w-[75px] min-w-[75px] align-top text-start py-[6px] px-2 relative outline-none",
  tableCellEditing: "shadow-[0_0_5px_rgba(0,0,0,0.4)] rounded-[3px]",
  tableCellHeader: "bg-[#f2f3f5] text-start",
  tableSelection: "selection:bg-transparent",
  text: {
    bold: "font-bold",
    capitalize: "capitalize",
    code: "font-mono text-[94%] py-px px-1 bg-slate-100",
    highlight:
      "bg-[rgba(255,212,0,0.14)] border-solid border-b-[2px] border-[rgba(255,212,0,0.3)]",
    italic: "italic",
    lowercase: "lowercase",
    strikethrough: "line-through",
    subscript: "text-[0.8em] !align-sub",
    superscript: "text-[0.8em] align-super",
    underline: "underline",
    underlineStrikethrough: "[text-decoration:underline_line-through]",
    uppercase: "uppercase",
  },
};

export const TailwindExtension = defineExtension({
    name: '@lexical/tailwind',
    peerDependencies: [
        declarePeerDependency('@lexical/react/TreeView', {
            timeTravelButtonClassName:
                'absolute top-[10px] right-[15px] border-0 p-0 text-xs bg-transparent text-white hover:underline cursor-pointer',
            timeTravelPanelButtonClassName:
                'p-0 border-0 bg-transparent flex-1 text-white text-xs hover:underline cursor-pointer',
            timeTravelPanelClassName: 'overflow-hidden p-0 pb-2.5 mx-auto flex',
            timeTravelPanelSliderClassName: 'p-0 flex-[8]',
            treeTypeButtonClassName:
                'absolute top-[10px] right-[85px] border-0 p-0 text-xs bg-transparent text-white hover:underline cursor-pointer',
            viewClassName:
                'block bg-neutral-950 text-white p-1.5 text-xs whitespace-pre-wrap mx-auto my-1 mb-2.5 max-h-[250px] relative rounded-b-[10px] overflow-auto leading-3.5',
        }),
    ],
    theme,
});
