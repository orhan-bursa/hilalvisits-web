import {
  FilesType,
  MultiSelectType,
  NotionPageResult,
  RelationType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type PhotoResult = NotionPageResult & {
  properties: Photo;
};

export type Photo = {
  continent: SelectType;
  country: MultiSelectType;
  city: MultiSelectType;
  district: MultiSelectType;
  status: StatusType;
  image: FilesType;
  albums: RelationType;
  title: TitleType;
};
