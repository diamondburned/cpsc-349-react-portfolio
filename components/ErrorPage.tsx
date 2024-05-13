import { useEffect } from "react";
import "./ErrorPage.scss";

export default function ErrorPage({ error }: { error: unknown }) {
  useEffect(() => console.error("PAGE ERROR:", error), [error]);
  return (
    <div id="error-page">
      <div className="error-dialog">
        <span className="prefix">Error!</span>
        <p className="message">{error instanceof Error ? error.message : `${error}`}</p>
      </div>
    </div>
  );
}
