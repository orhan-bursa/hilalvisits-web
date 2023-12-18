import Link from "next/link"
import { whisper } from "@/utils/fonts";
import Image from "next/image";
import cn from "classnames";
import { Button, Tooltip } from "@mui/material";
import { shortenText } from "@/utils/text";
import InstagramIcon from '@mui/icons-material/Instagram';
import { CustomButton } from "../custom";

type MappedInstagramPost = {
  id: string
  title: string
  url: string
  src: string
}
export default async function Instagram() {

  const mapPosts: (response: any) => MappedInstagramPost[] = (response: any) => {
    const mappedItems = response.media.data.map((post: any) => {
      return {
        id: post.id,
        title: post.caption,
        url: post.permalink,
        src: post.thumbnail_url || post.media_url
      }
    })
    return mappedItems
  }

  const fetchInstagramData = async () => {
    const instaID = process.env.INSTAGRAM_ID
    const instaToken = process.env.INSTAGRAM_TOKEN
    const instaFields = "profile_picture_url,name,username,biography,media.limit(6){caption,media_url,permalink,thumbnail_url,timestamp,comments_count,like_count,media_type,children{media_url}}";
    const url = `https://graph.facebook.com/v16.0/${instaID}?fields=${instaFields}&access_token=${instaToken}`
    const res = await fetch(url, {
      cache: "no-store",
    })

    return await res.json()
  }
  const data = await fetchInstagramData()
  const posts = mapPosts(data)

  return <div className="w-full bg-amber-50 h-max flex flex-col items-center p-4">
    <div className="max-w-[1200px] w-full h-full">
      <div className="w-full flex items-center justify-center ">
        <h1
          className={cn(
            whisper.className,
            "h-28 z-30 text-center text-amber-400 ",
            "text-6xl sm:text-[80px]"
          )
          }
        >
          Instagram
        </h1>
      </div>
      <div className={cn(
        "w-full h-[480px] max-h-[480px] border-2 border-amber-400 p-2 my-4",
        "sm:h-[320px] sm:max-h-[320px]",
        "lg:h-[240px] lg:max-h[240px]"
      )}>
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full h-full gap-2">
          {posts.map((post) => {
            const titleWithoutHashtags = post.title.split("#")[0]
            const _postTitle = shortenText(titleWithoutHashtags, 100, 15)
            return <Tooltip key={post.id} title={_postTitle}>
              <Link
                href={post.url}
                target="blank"
                className="w-full h-full col-span-1"
              >
                <div className="relative w-full h-full" >
                  {post.src && <Image src={post.src} alt={post.title} fill style={{ objectFit: "cover" }} />}
                </div>
              </Link>
            </Tooltip>
          }
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <CustomButton
          LinkComponent={Link}
          href={"https://www.instagram.com/hilalvisits/"}
          startIcon={<InstagramIcon />}
        >
          Follow
        </CustomButton>
      </div>
    </div>
  </div>
}