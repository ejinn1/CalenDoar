import { Option } from "@/store/options";

export function getOptionIdOfPath(path: string, options: Option[]) {
  const mathedOption = options.find((option) => option.link === path);

  if (mathedOption) {
    return mathedOption.id;
  }

  const optionIdMath = path.match(/\/options\/(.*)/);

  if (optionIdMath) {
    return optionIdMath[1];
  }

  return undefined;
}
