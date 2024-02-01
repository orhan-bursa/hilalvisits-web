import {
  PartialUserObjectResponse,
  RichTextItemResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type PageObjectBase = {
  parent: {
    type: "database_id";
    database_id: string;
  }
  icon: any
  cover: any
  created_by: PartialUserObjectResponse
  last_edited_by: PartialUserObjectResponse
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  url: string;
  public_url: string | null;
}

export type NumberType = {
  type: "number";
  number: number | null;
  id: string;
}
export type UrlType = {
  type: "url";
  url: string | null;
  id: string;
}
export type SelectType = {
  type: "select";
  select: SelectPropertyResponse | null;
  id: string;
}
export type MultiSelectType = {
  type: "multi_select";
  multi_select: Array<SelectPropertyResponse>;
  id: string;
}
export type StatusType = {
  type: "status";
  status: SelectPropertyResponse | null;
  id: string;
}
export type DateType = {
  type: "date";
  date: DateResponse | null;
  id: string;
}
export type EmailType = {
  type: "email";
  email: string | null;
  id: string;
}
export type PhoneNumberType = {
  type: "phone_number";
  phone_number: string | null;
  id: string;
}
export type CheckboxType = {
  type: "checkbox";
  checkbox: boolean;
  id: string;
}
export type FilesType = {
  type: "files";
  files: Array<FileType | ExternalFileType>;
  id: string;
}
export type CreatedByType = {
  type: "created_by";
  created_by: PartialUserObjectResponse | UserObjectResponse;
  id: string;
}
export type CreateTimeType = {
  type: "created_time";
  created_time: string;
  id: string;
}
export type LastEditedByType = {
  type: "last_edited_by";
  last_edited_by: PartialUserObjectResponse | UserObjectResponse;
  id: string;
}
export type LastEditedTimeType = {
  type: "last_edited_time";
  last_edited_time: string;
  id: string;
}
export type FormulaType = {
  type: "formula";
  formula: any;
  id: string;
}
export type UniqueIdType = {
  type: "unique_id";
  unique_id: {
    prefix: string | null;
    number: number | null;
  };
  id: string;
}
export type TitleType = {
  type: "title";
  title: Array<RichTextItemResponse>;
  id: string;
}
export type RichTextType = {
  type: "rich_text";
  rich_text: Array<RichTextItemResponse>;
  id: string;
}
export type PeopleType = {
  type: "people";
  people: Array<PartialUserObjectResponse | UserObjectResponse>;
  id: string;
}
export type RelationType = {
  type: "relation";
  relation: Array<{
    id: string;
  }>;
  id: string;
}

type SelectPropertyResponse = {
  id: string;
  name: string;
  color: SelectColor;
};

type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";

type DateResponse = {
  start: string;
  end: string | null;
  time_zone: any | null;
};

export type FileType = {
  file: {
    url: string;
    expiry_time: string;
  };
  name: string;
  type?: "file";
}

export type ExternalFileType = {
  external: {
    url: string;
  };
  name: string;
  type?: "external";
}
