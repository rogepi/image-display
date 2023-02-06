/* eslint-disable @next/next/no-img-element */
import useFile from "~/hooks/use-file";

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
  console.log(data);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={data.image} alt="图片" />;
}

export default function Dashboard({ fallback }: { fallback: any }) {
  const { file, setFile, fileInputRef, handleChooseFile, handleChange } =
    useFile();

  const upload = async () => {
    if (file) {
      await fetch("/api/image", {
        method: "post",
        body: JSON.stringify({
          image: file,
        }),
      });
      setFile("");
    }
  };

  const cancel = () => [setFile("")];
  return (
    <SWRConfig value={{ fallback }}>
      <main className="w-full p-5 flex flex-col items-center gap-5">
        <h1 className="font-bold text-3xl text-zinc-50">上传图片</h1>
        <div className="max-w-[1000px] my-4 "></div>
        {!file ? (
          <div className="flex flex-col items-center gap-5">
            <div className="w-9/12 font-bold text-zinc-50">
              (当前图片)
              <NowImage />
            </div>
            <input
              ref={fileInputRef}
              onChange={handleChange}
              type="file"
              hidden
            />
            <button
              onClick={handleChooseFile}
              className="bg-zinc-100 p-2 rounded-md hover:bg-zinc-300"
            >
              上传新图片
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div className="w-9/12">
              <img src={file ? file : ""} alt="图片" />
            </div>
            <div className="space-x-5">
              <button
                onClick={() => upload()}
                className="bg-zinc-100 p-2 rounded-md hover:bg-zinc-300"
              >
                确认上传
              </button>
              <button
                onClick={() => cancel()}
                className="bg-zinc-100 p-2 rounded-md hover:bg-zinc-300"
              >
                取消上传
              </button>
            </div>
          </div>
        )}
      </main>
    </SWRConfig>
  );
}
