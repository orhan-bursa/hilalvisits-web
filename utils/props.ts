import { ExternalFileType, FileType, FilesType, BlogPageObject, PhotoPageObject, MenuPageObject } from "@/types";

export function destructureBlogProps(blog: BlogPageObject) {
    return {
        status: blog?.properties?.status?.status,
        parent_category_key: blog?.properties?.parent_category_key?.select?.name,
        category_key: blog?.properties?.category_key?.select?.name,
        slug: blog?.properties?.slug?.rich_text?.[0]?.plain_text,
        sub_category_key: blog?.properties?.sub_category_key?.select?.name,
        author: blog?.properties?.author?.select?.name,
        cover: getUrlFromFilesType(blog?.properties?.cover),
        description: blog?.properties?.description?.rich_text?.[0]?.plain_text,
        parent_category: blog?.properties?.parent_category?.select?.name,
        category: blog?.properties?.category?.select?.name,
        sub_category: blog?.properties?.sub_category?.select?.name,
        district: blog?.properties?.district?.multi_select?.[0]?.name,
        title: blog?.properties?.title?.title?.[0]?.plain_text,
    }
}

export function destructurePhotoProps(photo: PhotoPageObject) {
    return {
        image: getUrlFromFilesType(photo.properties.image),
        status: photo?.properties?.status?.status,
        continent: photo?.properties?.continent?.select?.name,
        country: photo?.properties?.country?.multi_select?.[0]?.name,
        city: photo?.properties?.city?.multi_select?.[0]?.name,
        albums: photo?.properties?.albums?.relation,
        district: photo?.properties?.district?.multi_select?.[0]?.name,
        title: photo?.properties?.title?.title?.[0]?.plain_text,
    }
}

export function destructureMenuProps(menu: MenuPageObject) {
    return {
        key: menu?.properties?.key?.rich_text?.[0]?.plain_text,
        slug: menu?.properties?.slug?.rich_text?.[0]?.plain_text,
        title: menu?.properties?.title?.title?.[0]?.plain_text,
        parent: menu?.properties?.parent?.relation,
        subs: menu?.properties?.subs?.relation,
    }
}

export function getUrlFromFilesType(item: FilesType) {
    return (item?.files as ExternalFileType[])?.[0]?.external?.url ??
        (item?.files as FileType[])?.[0]?.file?.url;
}

