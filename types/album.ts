import {
  FilesType,
  MultiSelectType,
  PageObjectBase,
  RichTextType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type AlbumPageObject = PageObjectBase & {
  properties: AlbumProperties
}

export type AlbumProperties = {
  status: StatusType;
  description: RichTextType;
  cover: FilesType;
  continent: SelectType;
  country: MultiSelectType;
  city: MultiSelectType;
  district: MultiSelectType;
  title: TitleType;
};
