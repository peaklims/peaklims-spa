import { LoadingSpinner } from "@/components/loading-spinner";
import { Notification } from "@/components/notifications";
import { AuthLayout } from "@/layouts/auth-layout";
import { ReactQueryDevtools } from "@/lib/dev-tools";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useAuthUser } from "@/services/auth";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ClickToComponent } from "click-to-react-component";
import { Helmet } from "react-helmet";

function Loading() {
  return (
    <div className="relative flex items-center justify-center w-full bg-white isolate min-h-svh max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <LoadingSpinner />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});

const runInDemoMode = false;

function RootComponent() {
  const { isLoading } = useAuthUser();
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet
        titleTemplate={`%s | ${siteConfig.name}`}
        defaultTitle={siteConfig.name}
      >
        {/* <meta name="description" content={siteConfig.description} />
        <meta name="authhor" content="bachiitter" />
        <link rel="author" href="https://bachitter.dev" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shoubhit Dash" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.name} />
        <meta property="og:image" content={siteConfig.ogImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteConfig.url} />
        <meta property="twitter:title" content={siteConfig.name} />
        <meta
          property="twitter:description"
          content={siteConfig.description}
        />
        <meta property="twitter:image" content={siteConfig.ogImage} /> */}
      </Helmet>

      <div
        className={cn(
          "min-h-svh font-sans antialiased scroll-smooth [font-feature-settings:'ss01']",
          !runInDemoMode && "debug-screens"
        )}
      >
        <AuthLayout>
          <Outlet />
        </AuthLayout>
        <ScrollRestoration />
        <Notification />
        <ClickToComponent />
        {!runInDemoMode && (
          <>
            <div className="hidden md:block">
              <TanStackRouterDevtools
                position="bottom-right"
                toggleButtonProps={{
                  style: {
                    marginRight: "5rem",
                    marginBottom: ".75rem",
                  },
                }}
              />
              <ReactQueryDevtools buttonPosition="bottom-right" />
            </div>
            <div className="block md:hidden">
              <TanStackRouterDevtools
                position="bottom-left"
                toggleButtonProps={{
                  style: {
                    marginLeft: "5rem",
                    marginBottom: ".75rem",
                  },
                }}
              />
              <div className="mb-6 ml-24">
                <ReactQueryDevtools buttonPosition="bottom-left" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
