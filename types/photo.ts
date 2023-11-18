import {
  Base,
  FilesType,
  MultiSelectType,
  RelationType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type Photo = Base & {
  continent: SelectType;
  country: MultiSelectType;
  city: MultiSelectType;
  district: MultiSelectType;
  status: StatusType;
  image: FilesType;
  albums: RelationType;
  title: TitleType;
};
