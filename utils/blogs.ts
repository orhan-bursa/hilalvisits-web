export const getBlogImageUrl = (blogItem: any) => {
  return (
    blogItem?.cover?.files?.[0]?.external?.url ??
    blogItem?.cover?.files?.[0]?.file?.url
  );
};
