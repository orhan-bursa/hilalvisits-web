import { ExternalFileType, FileType, FilesType, BlogPageObject, PhotoPageObject, MenuPageObject } from "@/types";

export function getUrlFromFilesType(item: FilesType) {
    return (item?.files as ExternalFileType[])?.[0]?.external?.url ??
        (item?.files as FileType[])?.[0]?.file?.url;
}

function decodeCategories(_text: string | null | undefined) {
    return _text ?
        _text
            .split(",")
            .map((itemArr: string) => ({
                title: itemArr.split("#")[0],
                href: itemArr.split("#")[1],
            })) : []
}

export function destructureBlogProps(blog: BlogPageObject) {
    return {
        title: blog?.properties?.title?.title?.[0]?.plain_text,
        status: blog?.properties?.status?.status,
        slug: blog?.properties?.slug?.rich_text?.[0]?.plain_text,
        author: blog?.properties?.author?.select?.name,
        cover: getUrlFromFilesType(blog?.properties?.cover),
        description: blog?.properties?.description?.rich_text?.[0]?.plain_text,
        menu: blog?.properties?.menu?.relation?.[0]?.id,
        menu_path: blog?.properties?.menu_path?.rollup?.array?.[0]?.formula?.string,
        categories: decodeCategories(blog?.properties?.categories?.formula?.string)
    }
}

export function destructurePhotoProps(photo: PhotoPageObject) {
    return {
        title: photo?.properties?.title?.title?.[0]?.plain_text,
        image: getUrlFromFilesType(photo.properties.image),
        status: photo?.properties?.status?.status,
        continent: photo?.properties?.continent?.select?.name,
        country: photo?.properties?.country?.multi_select?.[0]?.name,
        city: photo?.properties?.city?.multi_select?.[0]?.name,
        albums: photo?.properties?.albums?.relation,
        district: photo?.properties?.district?.multi_select?.[0]?.name,
    }
}

export function destructureMenuProps(menu: MenuPageObject) {
    return {
        title: menu?.properties?.title?.title?.[0]?.plain_text,
        path: menu?.properties?.path?.formula?.string ?? "#",
        slug: menu?.properties?.slug?.rich_text?.[0]?.plain_text,
        parent: menu?.properties?.parent?.relation,
        subs: menu?.properties?.subs?.relation,
        categories: decodeCategories(menu?.properties?.categories?.formula?.string),
        children: decodeCategories(menu?.properties?.children?.formula?.string)
    }
}
