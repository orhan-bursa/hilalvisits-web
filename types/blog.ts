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
  author: SelectType;
  cover: FilesType;
  description: RichTextType;
  continent: SelectType;
  country: MultiSelectType;
  city: MultiSelectType;
  district: MultiSelectType;
  title: TitleType;
};
