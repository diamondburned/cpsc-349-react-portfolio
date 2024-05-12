import "./ErrorPage.scss";

export default function ErrorPage({ error }: { error: unknown }) {
  console.error(error);
  return (
    <div id="error-page">
      <div className="error-dialog">
        <span className="prefix">Error!</span>
        <p className="message">{error instanceof Error ? error.message : `${error}`}</p>
      </div>
    </div>
  );
}
