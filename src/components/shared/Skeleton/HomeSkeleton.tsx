import Skeleton from "@/components/shared/Skeleton/Skeleton";

/**
 * Skeleton for the home page layout
 * Mimics: Sidebar + About, Experience, Projects, Blog sections
 */
function HomeSkeleton() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* Sidebar Skeleton */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            {/* Name */}
            <Skeleton className="h-12 w-64 mb-2" />
            {/* Title */}
            <Skeleton className="h-6 w-48 mb-4" />
            {/* Bio */}
            <Skeleton className="h-4 w-72 mb-8" />

            {/* Nav items */}
            <nav className="hidden lg:block">
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <Skeleton className="h-4 w-24" />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social links */}
          <div className="mt-8 flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="pt-24 lg:w-1/2 lg:py-24">
          {/* About Section */}
          <section className="mb-16 md:mb-24 lg:mb-36">
            <Skeleton className="h-4 w-16 mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mt-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-16 md:mb-24 lg:mb-36">
            <Skeleton className="h-4 w-24 mb-6" />
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <div className="sm:col-span-2">
                    <Skeleton className="h-3 w-24 mb-2" />
                  </div>
                  <div className="sm:col-span-6">
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <Skeleton key={j} className="h-6 w-16 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-16 md:mb-24 lg:mb-36">
            <Skeleton className="h-4 w-20 mb-6" />
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <div className="sm:col-span-2">
                    <Skeleton className="h-20 w-full rounded-md" />
                  </div>
                  <div className="sm:col-span-6">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="h-6 w-14 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Blog Section */}
          <section className="mb-16 md:mb-24 lg:mb-36">
            <Skeleton className="h-4 w-12 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="grid sm:grid-cols-8 sm:gap-4 sm:items-center"
                >
                  <div className="hidden sm:block sm:col-span-2">
                    <Skeleton className="aspect-video w-full rounded-md" />
                  </div>
                  <div className="sm:col-span-6">
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

HomeSkeleton.displayName = "HomeSkeleton";

export default HomeSkeleton;
