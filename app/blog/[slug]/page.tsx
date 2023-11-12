export default function PostDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return <div>{slug}</div>;
}
