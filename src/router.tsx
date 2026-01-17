import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import NotFound from "./components/shared/NotFound/NotFound";
import ErrorBoundary from "./components/shared/ErrorBoundary/ErrorBoundary";
import Loading from "./components/shared/Loading/Loading";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ({ error }) => <ErrorBoundary error={error} />,
    defaultPendingComponent: Loading,
  });

  return router;
}

export function createRouter() {
  return getRouter();
}
