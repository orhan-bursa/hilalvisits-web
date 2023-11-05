import { Home as FeatureHome } from "@/components/features";

const fetchFromNotion = async () => {
  const data = await fetch("http://localhost:3030/api/notion").then(
    (res) => res
  );
  console.log(data);

  return data;
};
export default async function Home() {
  const data = await fetchFromNotion();
  return <div>Home</div>;
  // return <FeatureHome data={data} />;
}
