import Header from "@/components/login/header";
import { Toaster } from "@/components/ui/sonner"
const LoginPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
        <Toaster />
        <Header />
        
        {children}
        
        
      </main>
    );
  };
  
  export default LoginPageLayout