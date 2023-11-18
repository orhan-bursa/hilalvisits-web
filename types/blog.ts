import {
  Base,
  DateType,
  FilesType,
  MultiSelectType,
  NumberType,
  RichTextType,
  SelectType,
  StatusType,
  TitleType,
} from "./core";

export type Blog = Base & {
  city: MultiSelectType;
  cover: FilesType;
  continent: SelectType;
  budget_amount_spent: NumberType;
  accomodation: MultiSelectType;
  country: MultiSelectType;
  district: MultiSelectType;
  arrival_date: DateType;
  budget_currency: RichTextType;
  author: SelectType;
  duration_in_days: NumberType;
  status: StatusType;
  suggestions: RichTextType;
  description: RichTextType;
  tags: MultiSelectType;
  title: TitleType;
};
