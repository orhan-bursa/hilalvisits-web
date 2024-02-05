import { ExternalFileType, FileType, FilesType, BlogPageObject, PhotoPageObject } from "@/types";

export function destructureBlogProps(blog: BlogPageObject) {
    return {
        status: blog?.properties?.status?.status,
        parent_category_key: blog?.properties?.parent_category_key?.select?.name,
        category_key: blog?.properties?.parent_category_key?.select?.name,
        sub_category_key: blog?.properties?.parent_category_key?.select?.name,
        author: blog?.properties?.author?.select?.name,
        cover: getUrlFromFilesType(blog?.properties?.cover),
        description: blog?.properties?.description?.rich_text?.[0]?.plain_text,
        continent: blog?.properties?.continent?.select?.name,
        country: blog?.properties?.country?.multi_select?.[0]?.name,
        city: blog?.properties?.city?.multi_select?.[0]?.name,
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

export function getUrlFromFilesType(item: FilesType) {
    return (item?.files as ExternalFileType[])?.[0]?.external?.url ??
        (item?.files as FileType[])?.[0]?.file?.url;
}

