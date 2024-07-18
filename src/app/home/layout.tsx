import AuthRoute from "@/components/AuthRoute/user";
const LoginPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
       
        <AuthRoute>
        {children}
        </AuthRoute>
      </main>
    );
  };
  
  export default LoginPageLayout