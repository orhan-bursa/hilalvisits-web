import Link from "next/link";
import { whisper } from "@/utils/fonts";
import cn from "classnames";
import { Button, Tooltip } from "@mui/material";
import { shortenText } from "@/utils/text";
import InstagramIcon from "@mui/icons-material/Instagram";

type MappedInstagramPost = {
  id: string;
  title: string;
  url: string;
  src: string;
};
export default async function Instagram() {
  const mapPosts: (response: any) => MappedInstagramPost[] = (
    response: any
  ) => {
    const mappedItems = response?.media?.data?.map((post: any) => {
      return {
        id: post.id,
        title: post.caption,
        url: post.permalink,
        src: post.thumbnail_url || post.media_url,
      };
    });
    return mappedItems;
  };

  const fetchInstagramData = async () => {
    const instaID = process.env.INSTAGRAM_ID;
    const instaToken = process.env.INSTAGRAM_TOKEN;
    const instaFields =
      "profile_picture_url,name,username,biography,media.limit(6){caption,media_url,permalink,thumbnail_url,timestamp,comments_count,like_count,media_type,children{media_url}}";
    const url = `https://graph.facebook.com/v16.0/${instaID}?fields=${instaFields}&access_token=${instaToken}`;
    const res = await fetch(url, {
      cache: "no-store",
    });

    return await res.json();
  };
  const data = await fetchInstagramData();
  const posts = mapPosts(data);

  return (
    <div className="w-full bg-amber-50 h-max flex flex-col items-center p-4">
      <div className="max-w-[1200px] w-full h-full">
        <div className="w-full flex items-center justify-center ">
          <h1
            className={cn(
              whisper.className,
              "mb-1 z-30 text-center text-amber-400 cursor-default",
              "text-6xl sm:text-[80px]"
            )}
          >
            Instagram
          </h1>
        </div>
        <div
          className={cn(
            "w-full border-2 border-amber-400 p-2 my-4",
            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2",
          )}
        >
          {posts?.map((post) => {
            const titleWithoutHashtags = post?.title?.split("#")[0];
            const _postTitle = shortenText(titleWithoutHashtags, 100, 15);
            return (
              <Tooltip key={post.id} title={_postTitle}>
                <Link
                  href={post.url}
                  target="blank"
                  style={{ height: "100%" }}
                >
                  {post.src && (
                    <img src={post.src} alt={post.title} />
                  )}
                </Link>
              </Tooltip>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button
            LinkComponent={Link}
            href={"https://www.instagram.com/hilalvisits/"}
            color="inherit"
            startIcon={<InstagramIcon />}
            sx={{
              color: "#fbbf24",
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 2,
              borderColor: "#fbbf24",
              borderRadius: 0,
              transition: 'all 700ms',
              ':hover': {
                borderWidth: 2,
                backgroundColor: "#fbbf24",
                color: "#fff",
                borderRadius: '6px'
              },
            }}
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}
