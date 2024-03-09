import {
    PageObjectBase,
    RichTextType,
    SelectType,
    StringFormulaType,
    TitleType,
} from "./core";

export type InfoPageObject = PageObjectBase & {
    properties: InfoProperties
}

export type InfoProperties = {
    slug: RichTextType;
    path: StringFormulaType;
    title: TitleType;
    type: SelectType;
};
