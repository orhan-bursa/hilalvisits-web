

type Page =
    | "home"
    | "about"
    | "album"
    | "blog"
    | "photo"

export const PAGE_TITLES: Record<Page, string> = {
    home: "Home",
    about: "About",
    album: "Album",
    blog: "Blog",
    photo: "Photo",
}
export const PAGE_LINKS: Record<Page, string> = {
    home: "/",
    about: "/about",
    album: "/album",
    blog: "/blog",
    photo: "/photo",
}

type PageItem = { title: string; href: string };
export const PAGE_ITEMS: PageItem[] = [
    {
        title: PAGE_TITLES.home,
        href: PAGE_LINKS.home,
    },
    {
        title: PAGE_TITLES.blog,
        href: PAGE_LINKS.blog,
    },
    {
        title: PAGE_TITLES.album,
        href: PAGE_LINKS.album,
    },
    {
        title: PAGE_TITLES.photo,
        href: PAGE_LINKS.photo,
    },
    {
        title: PAGE_TITLES.about,
        href: PAGE_LINKS.about,
    },
];