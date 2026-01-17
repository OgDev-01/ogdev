---
name: react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. Use when writing, reviewing, or refactoring React/Next.js code for optimal performance patterns. Covers eliminating waterfalls, bundle optimization, server/client performance, re-render optimization, and rendering best practices.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, from Vercel Engineering. Contains 45 rules across 8 categories, prioritized by impact.

## When to Apply

Reference these guidelines when:

- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category                  | Impact      |
| -------- | ------------------------- | ----------- |
| 1        | Eliminating Waterfalls    | CRITICAL    |
| 2        | Bundle Size Optimization  | CRITICAL    |
| 3        | Server-Side Performance   | HIGH        |
| 4        | Client-Side Data Fetching | MEDIUM-HIGH |
| 5        | Re-render Optimization    | MEDIUM      |
| 6        | Rendering Performance     | MEDIUM      |
| 7        | JavaScript Performance    | LOW-MEDIUM  |
| 8        | Advanced Patterns         | LOW         |

---

## 1. Eliminating Waterfalls (CRITICAL)

Waterfalls are the #1 performance killer. Each sequential await adds full network latency.

### 1.1 Defer Await Until Needed

Move `await` operations into the branches where they're actually used.

```typescript
// Incorrect: blocks both branches
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId);
  if (skipProcessing) return { skipped: true };
  return processUserData(userData);
}

// Correct: only blocks when needed
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) return { skipped: true };
  const userData = await fetchUserData(userId);
  return processUserData(userData);
}
```

### 1.2 Promise.all() for Independent Operations

When async operations have no interdependencies, execute them concurrently.

```typescript
// Incorrect: sequential execution, 3 round trips
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();

// Correct: parallel execution, 1 round trip
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments(),
]);
```

### 1.3 Prevent Waterfall Chains in API Routes

Start independent operations immediately, even if you don't await them yet.

```typescript
// Incorrect: config waits for auth
export async function GET(request: Request) {
  const session = await auth();
  const config = await fetchConfig();
  const data = await fetchData(session.user.id);
  return Response.json({ data, config });
}

// Correct: auth and config start immediately
export async function GET(request: Request) {
  const sessionPromise = auth();
  const configPromise = fetchConfig();
  const session = await sessionPromise;
  const [config, data] = await Promise.all([
    configPromise,
    fetchData(session.user.id),
  ]);
  return Response.json({ data, config });
}
```

### 1.4 Strategic Suspense Boundaries

Use Suspense boundaries to show wrapper UI faster while data loads.

```tsx
// Incorrect: wrapper blocked by data fetching
async function Page() {
  const data = await fetchData(); // Blocks entire page
  return (
    <div>
      <Sidebar />
      <DataDisplay data={data} />
      <Footer />
    </div>
  );
}

// Correct: wrapper shows immediately, data streams in
function Page() {
  return (
    <div>
      <Sidebar />
      <Suspense fallback={<Skeleton />}>
        <DataDisplay />
      </Suspense>
      <Footer />
    </div>
  );
}

async function DataDisplay() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}
```

---

## 2. Bundle Size Optimization (CRITICAL)

Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint.

### 2.1 Avoid Barrel File Imports

Import directly from source files instead of barrel files.

```tsx
// Incorrect: imports entire library
import { Check, X, Menu } from "lucide-react";

// Correct: imports only what you need
import Check from "lucide-react/dist/esm/icons/check";
import X from "lucide-react/dist/esm/icons/x";
import Menu from "lucide-react/dist/esm/icons/menu";

// Alternative: use Next.js optimizePackageImports
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};
```

### 2.2 Dynamic Imports for Heavy Components

Use `next/dynamic` to lazy-load large components not needed on initial render.

```tsx
// Incorrect: Monaco bundles with main chunk ~300KB
import { MonacoEditor } from "./monaco-editor";

// Correct: Monaco loads on demand
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(
  () => import("./monaco-editor").then((m) => m.MonacoEditor),
  { ssr: false }
);
```

### 2.3 Defer Non-Critical Third-Party Libraries

Load analytics, logging after hydration.

```tsx
import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);
```

### 2.4 Preload Based on User Intent

Preload heavy bundles on hover/focus.

```tsx
function EditorButton({ onClick }: { onClick: () => void }) {
  const preload = () => {
    if (typeof window !== "undefined") {
      void import("./monaco-editor");
    }
  };

  return (
    <button onMouseEnter={preload} onFocus={preload} onClick={onClick}>
      Open Editor
    </button>
  );
}
```

---

## 3. Server-Side Performance (HIGH)

### 3.1 Per-Request Deduplication with React.cache()

Use `React.cache()` for server-side request deduplication.

```typescript
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  return await db.user.findUnique({
    where: { id: session.user.id },
  });
});
```

### 3.2 Minimize Serialization at RSC Boundaries

Only pass fields that the client actually uses.

```tsx
// Incorrect: serializes all 50 fields
async function Page() {
  const user = await fetchUser(); // 50 fields
  return <Profile user={user} />;
}

// Correct: serializes only needed fields
async function Page() {
  const user = await fetchUser();
  return <Profile name={user.name} avatar={user.avatar} />;
}
```

### 3.3 Parallel Data Fetching with Component Composition

Restructure components to parallelize data fetching.

```tsx
// Incorrect: Sidebar waits for Header's fetch
async function Page() {
  const header = await fetchHeader();
  return (
    <div>
      <div>{header}</div>
      <Sidebar />
    </div>
  );
}

// Correct: both fetch simultaneously
async function Header() {
  const data = await fetchHeader();
  return <div>{data}</div>;
}

async function Sidebar() {
  const items = await fetchSidebarItems();
  return <nav>{items.map(renderItem)}</nav>;
}

function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}
```

### 3.4 Use after() for Non-Blocking Operations

Use Next.js's `after()` to schedule work after response is sent.

```tsx
import { after } from "next/server";

export async function POST(request: Request) {
  await updateDatabase(request);

  after(async () => {
    // Runs after response is sent
    logUserAction({
      /* ... */
    });
  });

  return Response.json({ status: "success" });
}
```

---

## 4. Client-Side Data Fetching (MEDIUM-HIGH)

### 4.1 Use SWR for Automatic Deduplication

```tsx
import useSWR from "swr";

function UserList() {
  const { data: users } = useSWR("/api/users", fetcher);
  // Multiple instances share one request
}
```

### 4.2 Use Passive Event Listeners

Add `{ passive: true }` to touch and wheel listeners.

```typescript
document.addEventListener("touchstart", handleTouch, { passive: true });
document.addEventListener("wheel", handleWheel, { passive: true });
```

---

## 5. Re-render Optimization (MEDIUM)

### 5.1 Use Functional setState Updates

```tsx
// Incorrect: requires state as dependency, risk of stale closure
const addItem = useCallback(
  (item: Item) => {
    setItems([...items, item]);
  },
  [items]
);

// Correct: stable callback, no stale closures
const addItem = useCallback((item: Item) => {
  setItems((curr) => [...curr, item]);
}, []);
```

### 5.2 Use Lazy State Initialization

Pass a function to `useState` for expensive initial values.

```tsx
// Incorrect: runs on every render
const [index, setIndex] = useState(buildSearchIndex(items));

// Correct: runs only once
const [index, setIndex] = useState(() => buildSearchIndex(items));
```

### 5.3 Subscribe to Derived State

Subscribe to derived booleans instead of continuous values.

```tsx
// Incorrect: re-renders on every pixel change
const width = useWindowWidth();
const isMobile = width < 768;

// Correct: re-renders only when boolean changes
const isMobile = useMediaQuery("(max-width: 767px)");
```

### 5.4 Use Transitions for Non-Urgent Updates

```tsx
import { startTransition } from "react";

const handler = () => {
  startTransition(() => setScrollY(window.scrollY));
};
```

---

## 6. Rendering Performance (MEDIUM)

### 6.1 CSS content-visibility for Long Lists

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

### 6.2 Animate SVG Wrapper Instead of SVG Element

```tsx
// Incorrect: no hardware acceleration
<svg className="animate-spin">...</svg>

// Correct: hardware accelerated
<div className="animate-spin">
  <svg>...</svg>
</div>
```

### 6.3 Use Explicit Conditional Rendering

```tsx
// Incorrect: renders "0" when count is 0
{
  count && <Badge>{count}</Badge>;
}

// Correct: renders nothing when count is 0
{
  count > 0 ? <Badge>{count}</Badge> : null;
}
```

---

## 7. JavaScript Performance (LOW-MEDIUM)

### 7.1 Build Index Maps for Repeated Lookups

```typescript
// Incorrect: O(n) per lookup
orders.map((order) => ({
  ...order,
  user: users.find((u) => u.id === order.userId),
}));

// Correct: O(1) per lookup
const userById = new Map(users.map((u) => [u.id, u]));
orders.map((order) => ({
  ...order,
  user: userById.get(order.userId),
}));
```

### 7.2 Use Set/Map for O(1) Lookups

```typescript
// Incorrect: O(n) lookup
const isActive = activeIds.includes(id);

// Correct: O(1) lookup
const activeSet = new Set(activeIds);
const isActive = activeSet.has(id);
```

### 7.3 Cache Property Access in Loops

```typescript
// Incorrect: 3 lookups x N iterations
for (let i = 0; i < arr.length; i++) {
  process(obj.config.settings.value);
}

// Correct: 1 lookup total
const value = obj.config.settings.value;
const len = arr.length;
for (let i = 0; i < len; i++) {
  process(value);
}
```

### 7.4 Early Return from Functions

```typescript
// Incorrect: unnecessary work
function processUser(user: User | null) {
  const result = { processed: false };
  if (user) {
    // process user
    result.processed = true;
  }
  return result;
}

// Correct: early exit
function processUser(user: User | null) {
  if (!user) return { processed: false };
  // process user
  return { processed: true };
}
```

---

## 8. Advanced Patterns (LOW)

### 8.1 Store Event Handlers in Refs

For stable callback references without recreating on each render.

```tsx
function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: any[]) => ref.current(...args), []) as T;
}
```

---

## References

- [Vercel Blog: Package Import Optimization](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [React.cache() Documentation](https://react.dev/reference/react/cache)
- [SWR Documentation](https://swr.vercel.app)
- [Next.js after() API](https://nextjs.org/docs/app/api-reference/functions/after)
- [React Compiler](https://react.dev/learn/react-compiler)
