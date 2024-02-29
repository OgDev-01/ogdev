interface RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: BodyInit;
  cache?: RequestCache;
  redirect?: RequestRedirect;
}
export async function fetchApiData<T>(
  path: string,
  init?: RequestInit
): Promise<{
  data: T | null;
  error: { status: number; statusText: string } | null;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    if (init?.method === "DELETE") {
      return { data: null, error: null };
    }
    const data = (await res.json()).data as T;
    return { data, error: null };
  }

  const { status, statusText } = res;

  return { data: null, error: { status, statusText } };
}
