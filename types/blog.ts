import {
  DateType,
  FilesType,
  MultiSelectType,
  NumberType,
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
  author: SelectType;
  cover: FilesType;
  description: RichTextType;
  arrival_date: DateType;
  duration_in_days: NumberType;
  accomodation: MultiSelectType;
  budget_currency: RichTextType;
  budget_amount_spent: NumberType;
  continent: SelectType;
  country: MultiSelectType;
  city: MultiSelectType;
  district: MultiSelectType;
  suggestions: RichTextType;
  tags: MultiSelectType;
  title: TitleType;
};
