import useSWR, { SWRConfig } from "swr";
import { getData } from "~/utils/file";

export async function getStaticProps() {
  const image = getData();

  return {
    props: {
      fallback: {
        "/api/image": image,
      },
    },
  };
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
function NowImage() {
  const { data } = useSWR("/api/image", fetcher, { refreshInterval: 1000 });
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={data.image} alt="图片" />;
}

export default function Home({ fallback }: { fallback: any }) {
  return (
    <SWRConfig value={{ fallback }}>
      <main className="w-full p-5 flex flex-col items-center gap-5">
        <h1 className="font-bold text-3xl text-zinc-50">当前图片</h1>
        <div className="position">
          <NowImage />
        </div>
      </main>
    </SWRConfig>
  );
}
