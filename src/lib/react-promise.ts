export function wrapPromise<T>(promise: Promise<T>): () => T {
  let status: "pending" | "success" | "error" = "pending";
  let response: any;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    },
  );

  return () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };
}
