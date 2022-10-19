type adminFormItemTypes = "string" | "number" | "select" | "upload" | "hidden";

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

export type { adminFormItemTypes };
