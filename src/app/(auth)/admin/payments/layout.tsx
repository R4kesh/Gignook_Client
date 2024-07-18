import Header  from '@/components/admin/dashboard/header'
import Sidebar from '@/components/admin/dashboard/sidebar'

const freelancersLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
        
         <Header/>
         {/* <Sidebar/> */}
        {children}
        
        
      </main>
    );
  };
  
  export default freelancersLayout