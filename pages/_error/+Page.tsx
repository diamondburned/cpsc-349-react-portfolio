import ErrorPage from "components/ErrorPage";
import { usePageContext } from "vike-react/usePageContext";

export function Page() {
  const pageContext = usePageContext();
  return <ErrorPage error={pageContext.abortReason} />;
}
