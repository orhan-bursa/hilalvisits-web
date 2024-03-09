import {
    NumberFormulaType,
    PageObjectBase,
    RelationType,
    RichTextType,
    StringFormulaType,
    TitleType,
} from "./core";

export type MenuPageObject = PageObjectBase & {
    properties: MenuProperties
}

export type MenuProperties = {
    slug: RichTextType;
    path: StringFormulaType;
    depth: NumberFormulaType;
    title: TitleType;
    parent: RelationType;
    subs: RelationType;
    categories: StringFormulaType;
    children: StringFormulaType;
};
