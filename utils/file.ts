import { writeFileSync, readFileSync } from "fs";
import path from "path";

type Data = {
  image: "";
};
const DATAPATH = path.join(process.cwd(), "data", `image.json`);

export const getData = () => {
  return JSON.parse(readFileSync(DATAPATH, "utf-8")) as Data;
};

export const writeData = (data: Data) => {
  writeFileSync(DATAPATH, JSON.stringify(data));
};
