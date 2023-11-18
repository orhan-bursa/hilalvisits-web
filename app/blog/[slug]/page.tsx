export default function BlogDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return <div>{slug}</div>;
}
