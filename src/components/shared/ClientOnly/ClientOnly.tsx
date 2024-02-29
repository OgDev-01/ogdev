import { useHasMounted } from "@/libs/hooks/useHasMounted";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
}

export default ClientOnly;
