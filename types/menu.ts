import {
    PageObjectBase,
    RelationType,
    RichTextType,
    TitleType,
} from "./core";

export type MenuPageObject = PageObjectBase & {
    properties: MenuProperties
}

export type MenuProperties = {
    slug: RichTextType;
    key: RichTextType;
    title: TitleType;
    parent: RelationType;
    subs: RelationType;
};
