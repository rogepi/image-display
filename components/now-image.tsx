/* eslint-disable @next/next/no-img-element */
export default async function NowImage() {
  const res = await fetch("http://localhost:3000/api/image", {
    cache: "no-store",
    next: { revalidate: 5 },
  });
  const json = await res.json();
  return <img src={json.image} alt="图片" />;
}
