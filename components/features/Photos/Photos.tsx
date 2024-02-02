export default function Photos({ items }: { items?: any }) {
  return <div>{JSON.stringify(items ?? {})}</div>;
}
