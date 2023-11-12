export default function Photos({ data }: { data?: any }) {
  return <div>{JSON.stringify(data ?? {})}</div>;
}
