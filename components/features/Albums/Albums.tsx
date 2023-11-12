export default function Albums({ data }: { data: any }) {
  return <div>{JSON.stringify(data ?? {})}</div>;
}
