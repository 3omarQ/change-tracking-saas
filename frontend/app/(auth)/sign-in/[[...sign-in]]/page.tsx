import { LoginForm } from "../../../../components/auth/LoginForm";
import { LoginLogo } from "../../../../components/auth/LoginLogo";

export default function Page() {
  return (
    <div className="relative flex h-svh w-full items-center overflow-hidden justify-center ">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-secondary/12 rounded-full blur-[120px]"></div>
      </div>
      <div className="w-full max-w-sm space-y-6">
        <LoginLogo />
        <LoginForm />
      </div>
    </div>
  );
}
