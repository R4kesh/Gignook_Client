import AuthRoute from "@/components/AuthRoute/user";
import Header from "@/components/landing-page/header";
const LoginPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
       
      <Header/>
        {children}
       
      </main>
    );
  };
  
  export default LoginPageLayout