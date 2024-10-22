import React, { lazy, Suspense } from "react";
import Loader from "../modules/layouts/Loader";

function Public({ component }) {
  const Component = lazy(() => import(`../${component}`));

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}

export default Public;
