export default function BlogDetail({ data }: { data?: any }) {
  return <div>{JSON.stringify(data ?? "not found")}</div>;
}
