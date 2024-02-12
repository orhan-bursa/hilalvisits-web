import {
  FilesType,
  MultiSelectType,
  PageObjectBase,
  RichTextType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type BlogPageObject = PageObjectBase & {
  properties: BlogProperties
}

export type BlogProperties = {
  status: StatusType;
  parent_category_key: SelectType;
  category_key: SelectType;
  sub_category_key: SelectType;
  slug: RichTextType;
  author: SelectType;
  cover: FilesType;
  description: RichTextType;
  parent_category: SelectType;
  category: SelectType;
  sub_category: SelectType;
  district: MultiSelectType;
  title: TitleType;
};
