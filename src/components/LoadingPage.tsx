import "./LoadingPage.scss";

export default function LoadingPage() {
  return (
    <aside id="loading-page">
      <div className="spinner"></div>
      <p>
        <code>
          Fetching{" "}
          <a href="https://0xd14.id" target="_blank">
            0xd14.id
          </a>
          ...
        </code>
      </p>
    </aside>
  );
}
