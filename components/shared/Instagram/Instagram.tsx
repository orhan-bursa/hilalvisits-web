import Link from "next/link"
import { babylonica } from "@/utils/fonts";
import Image from "next/image";
import cn from "classnames";
import { CustomButton } from "@/components/shared/custom";

type MappedInstagramPost = {
  id: string
  title: string
  url: string
  src: string
}
export default async function Instagram() {

  const mapPosts: (response: any) => MappedInstagramPost[] = (response: any) => {

    return response.media.data.map((post: any) => ({
      id: post.id,
      title: post.caption,
      url: post.permalink,
      src: post.thumbnail_url || post.media_url
    }))
  }

  const fetchInstagramData = async () => {
    const instaID = process.env.INSTAGRAM_ID
    const instaToken = process.env.INSTAGRAM_TOKEN
    const instaFields = "profile_picture_url,name,username,biography,media.limit(6){caption,media_url,permalink,thumbnail_url}"

    const url = `https://graph.facebook.com/v16.0/${instaID}?fields=${instaFields}&access_token=${instaToken}`
    const res = await fetch(url, {
      cache: "no-store",
    })

    return await res.json()
  }
  const data = await fetchInstagramData()
  const allPosts = mapPosts(data)
  const posts = allPosts.slice(1)
  const latestPost = allPosts[0]

  return <div className="w-full bg-amber-50 h-max flex flex-col items-center p-4">
    <div className="w-[1200px] h-full space-y-4">
      <h1
        className={cn(
          babylonica.className,
          "text-[80px] z-30 text-amber-400 text-center"
        )
        }
      >
        Instagram
      </h1>
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="relative w-[50%] h-full border-2 p-2" >
          {latestPost.src && <Image src={latestPost.src} alt={latestPost.title} fill objectFit="cover" />}
        </div>
        <div className="w-[50%]">
          <p>I regularly post on instagram, before during and after my trips. Feel free to follow to see where I will be visiting next! Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, qui.</p>
          <CustomButton title="Follow on Instagram" />
        </div>

      </div>
      <div className="w-full h-[150px]">
        <div className="relative flex justify-center w-full h-full gap-2">
          {posts.map((post) => {

            return <Link
              href={post.url}
              key={post.id}
              className="aspect-square w-full"
            >
              <div className="relative w-full h-full" >
                {post.src && <Image src={post.src} alt={post.title} fill objectFit="cover" />}
              </div>
            </Link>
          }
          )}
        </div>
      </div>
    </div>
  </div>
}
