export default function PostDetail({
  params,
}: {
  params: { postSlug: string };
}) {
  const postSlug = params.postSlug;
  return <div>{postSlug}</div>;
}
