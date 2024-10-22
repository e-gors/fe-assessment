import React, { lazy, Suspense } from "react";
import Loader from "../modules/layouts/Loader";
import { isAuth } from "../utils/helpers";
import { Navigate } from "react-router-dom";

function Private({ component }) {
  const Component = lazy(() => import(`../${component}`));

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}

export default Private;
