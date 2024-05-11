import "./MainPage.css";

import Bio from "./Bio";
import LoadingPage from "./LoadingPage";
import { useEffect, useState } from "react";
import { ObjectDocument, load } from "../lib/0xd14";

export default function MainPage() {
  const [object, setObject] = useState<ObjectDocument>();
  useEffect(() => {
    load().then((object) => setObject(object));
  });

  // return (
  // <main id="main-page">
  // </div>
  // )
  return object ? <Bio object={object} /> : <LoadingPage />;
}
