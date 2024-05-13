import { useData } from "vike-react/useData";
import type { Data } from "./+data";

import Bio from "components/Bio";

export default function MainPage() {
  const { object } = useData<Data>();
  return <Bio object={object} />;
}
