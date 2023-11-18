import { Album } from "@/types/ablum"
import { Blog } from "@/types/blog"
import { Photo } from "@/types/photo"

export const blogMapper = (notionBlogs: any[]) => {
  const blogs: Blog[] = notionBlogs.map(blog => {
    const mappedBlog: Blog = {
      id: blog.id,
      created_time: blog.created_time,
      last_edited_time: blog.last_edited_time,
      parent: blog.parent,
      archived: blog.archived,
      city: blog.properties.city,
      cover: blog.properties.cover,
      budget_amount_spent: blog.properties.budget_amount_spent,
      accomodation: blog.properties.accomodation,
      country: blog.properties.country,
      district: blog.properties.district,
      arrival_date: blog.properties.arrival_date,
      budget_currency: blog.properties.budget_currency,
      author: blog.properties.author,
      duration_in_days: blog.properties.duration_in_days,
      status: blog.properties.status,
      continent: blog.properties.continent,
      suggestions: blog.properties.suggestions,
      description: blog.properties.description,
      tags: blog.properties.tags,
      title: blog.properties.title,
    }
    return mappedBlog
  })
  return blogs
}

export const photoMapper = (notionPhotos: any[]) => {
  const photos: Photo[] = notionPhotos.map(photo => {
    const mappedPhoto: Photo = {
      id: photo.id,
      created_time: photo.created_time,
      last_edited_time: photo.last_edited_time,
      parent: photo.parent,
      archived: photo.archived,
      country: photo.properties.country,
      district: photo.properties.district,
      continent: photo.properties.continent,
      status: photo.properties.status,
      image: photo.properties.image,
      albums: photo.properties.albums,
      city: photo.properties.city,
      title: photo.properties.title,
    }
    return mappedPhoto
  })
  return photos
}

export const albumMapper = (notionAblums: any[]) => {
  const photos: Album[] = notionAblums.map(album => {
    const mappedAlbum: Album = {
      id: album.id,
      created_time: album.created_time,
      last_edited_time: album.last_edited_time,
      parent: album.parent,
      archived: album.archived,
      photos: album.properties.photos,
      cover: album.properties.cover,
      city: album.properties.city,
      country: album.properties.country,
      district: album.properties.district,
      description: album.properties.description,
      continent: album.properties.continent,
      status: album.properties.status,
      title: album.properties.title,
    }
    return mappedAlbum
  })
  return photos
}