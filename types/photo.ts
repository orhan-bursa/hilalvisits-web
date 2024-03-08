import {
  FilesType,
  MultiSelectType,
  PageObjectBase,
  RelationType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type PhotoPageObject = PageObjectBase & {
  properties: PhotoProperties
}

export type PhotoProperties = {
  image: FilesType;
  status: StatusType;
  continent: SelectType;
  country: SelectType;
  city: SelectType;
  albums: RelationType;
  district: MultiSelectType;
  title: TitleType;
};
