export type Base = {
  id:string
  created_time:string
  last_edited_time:string
  parent: ParentDB
  archived: boolean
}

export type User = {
  object: "user";
  id: string;
};

export type RelationType = {
  id: string;
  type: "relation";
  relation: [
    {
      id: string;
    }
  ];
};

export type TitleType = {
  id: string;
  type: "title";
  title: [
    {
      type: "text";
      text: {
        content: string;
        link: string | null;
      };
      annotations: TextAnnotationsType;
      plain_text: string;
      href: string | null;
    }
  ];
};

export type StatusType = {
  id: string;
  type: "status";
  status: {
    id: string;
    name: "draft" | "ready" | "published";
    color: string;
  };
};

export type SelectType = {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  };
};

export type RichTextType = {
  id: string;
  type: "rich_text";
  rich_text: [
    {
      type: "text";
      text: {
        content: string;
        link: string | null;
      };
      annotations: TextAnnotationsType;
      plain_text: string;
      href: string | null;
    }
  ];
};

export type TextAnnotationsType = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

export type DateType = {
  id: string;
  type: "date";
  date: {
    start: string | null;
    end: string | null;
    time_zone: string | null;
  };
};

export type NumberType = {
  id: string;
  type: number;
  number: number;
};

export type MultiSelectType = {
  id: string;
  type: "multi_select";
  multi_select: [
    {
      id: string;
      name: string;
      color: string;
    }
  ];
};

export type FilesType = {
  id: string;
  type: "files";
  files: ExternalFileType[] | DefaultFileType[];
};

export type ExternalFileType = {
  name: string;
  type: "external";
  external: {
    url: string;
  };
};

export type DefaultFileType = {
  name: string;
  type: "file";
  file: {
    url: string;
  };
};

export type ParentDB = {
  type: "database_id";
  database_id: string;
};
