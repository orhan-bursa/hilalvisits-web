import {
  FilesType,
  MultiSelectType,
  Base,
  RelationType,
  RichTextType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type Album = Base & {
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
