import Header  from '@/components/admin/dashboard/header'
import Sidebar from '@/components/admin/dashboard/sidebar'

const LoginPageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
        
         <Header/>
         {/* <Sidebar/> */}
        {children}
        
        
      </main>
    );
  };
  
  export default LoginPageLayout