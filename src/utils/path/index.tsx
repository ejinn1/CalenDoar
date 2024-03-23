import { Option } from "@/store/options";

export function getOptionIdofPath(path: string, options: Option[]) {
  const mathedOption = options.find((option) => option.link === path);

  if (mathedOption) {
    return mathedOption.id;
  }

  const optionIdMath = path.match(/\/options\/([a-zA-Z0-9]+)/);

  if (optionIdMath) {
    return optionIdMath[1];
  }

  return undefined;
}
