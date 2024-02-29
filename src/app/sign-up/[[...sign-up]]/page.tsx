import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center container h-[calc(100vh-8rem)]">
      <SignUp />
    </div>
  );
}
