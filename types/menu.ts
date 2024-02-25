import {
    PageObjectBase,
    RelationType,
    StringFormulaType,
    TitleType,
} from "./core";

export type MenuPageObject = PageObjectBase & {
    properties: MenuProperties
}

export type MenuProperties = {
    slug: StringFormulaType;
    path: StringFormulaType;
    title: TitleType;
    parent: RelationType;
    subs: RelationType;
};
