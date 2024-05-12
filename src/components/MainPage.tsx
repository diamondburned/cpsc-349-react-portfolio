import Bio from "./Bio";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import { useEffect, useState } from "react";
import { ObjectDocument, load } from "../lib/0xd14";

export default function MainPage() {
  const [object, setObject] = useState<ObjectDocument | { error: string }>();

  useEffect(() => {
    load()
      .then((object) => setObject(object))
      .catch((error) => setObject({ error: `${error}` }));
  }, []);

  if (!object) {
    return <LoadingPage />;
  }
  if (object && "error" in object) {
    return <ErrorPage error={object.error} />;
  }
  return <Bio object={object} />;
}
