import {
  ArrayRollupType,
  CheckboxType,
  FilesType,
  PageObjectBase,
  RelationType,
  RichTextType,
  SelectType,
  StatusType,
  StringFormulaType,
  TitleType,
} from "./core";

export type BlogPageObject = PageObjectBase & {
  properties: BlogProperties
}

export type BlogProperties = {
  title: TitleType;
  status: StatusType;
  slug: RichTextType;
  author: SelectType;
  cover: FilesType;
  description: RichTextType;
  menu: RelationType;
  menu_path: ArrayRollupType;
  categories: StringFormulaType;
  favorite: CheckboxType
};
