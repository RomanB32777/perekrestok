type adminFormItemTypes = "string" | "number" | "select" | "upload";

export interface IAdminValueItem {
  value: any;
  list?: any[];
}

export interface IAdminFormItem extends IAdminValueItem {
  type: adminFormItemTypes;
  placeholder?: string;
  // items: {
  //   value: any;
  //   list?: any[];
  // }[];
}

export interface IFileInfo {
  preview: string;
  file: File | null;
}

export type { adminFormItemTypes };
