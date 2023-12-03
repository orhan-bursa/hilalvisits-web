import Image from "next/image"
import Link from "next/link"

export default async function Instagram() {

  const mapPosts = (response: any) => {
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
    const res = await fetch(url)
    // .then(res => res.json())
    // .then(data => data);


    return await res.json()
  }

  const data = await fetchInstagramData()
  const posts = mapPosts(data)

  return <div className="h-20 w-[100%]">
    <p>Instagram</p>
    <div className="flex justify-center bg-amber-50 w-[100%] h-[200px] gap-2 p-2 border-2 border-amber-800">
      {posts.map((post: any) =>
        <Link
          href={post.url}
          key={post.id}
        >
          <div className="h-[100%] aspect-[4/5] relative" >
            <Image
              src={post.src}
              alt={post.title}
              fill
              objectFit="cover"
            />
          </div>
        </Link>
      )}
    </div>
  </div>;
}