import {
  FilesType,
  MultiSelectType,
  NotionPageResult,
  RelationType,
  RichTextType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type AlbumResult = NotionPageResult & {
  properties: Album;
};

export type Album = {
  photos: RelationType;
  cover: FilesType;
  city: MultiSelectType;
  country: MultiSelectType;
  district: MultiSelectType;
  description: RichTextType;
  continent: SelectType;
  status: StatusType;
  title: TitleType;
};
