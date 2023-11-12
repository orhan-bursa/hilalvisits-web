import {
  DateType,
  FilesType,
  MultiSelectType,
  NotionPageResult,
  NumberType,
  RichTextType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type BlogResult = NotionPageResult & {
  properties: Blog;
};

export type Blog = {
  city: MultiSelectType;
  cover: FilesType;
  continent: SelectType;
  budgetAmountSpent: NumberType;
  accomodation: MultiSelectType;
  country: MultiSelectType;
  district: MultiSelectType;
  arrivalDate: DateType;
  budgetCurrency: RichTextType;
  author: SelectType;
  durationInDays: NumberType;
  status: StatusType;
  suggestions: RichTextType;
  mainDescription: RichTextType;
  tags: MultiSelectType;
  title: TitleType;
};
