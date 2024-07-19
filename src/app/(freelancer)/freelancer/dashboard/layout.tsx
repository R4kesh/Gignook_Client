
import dynamic from 'next/dynamic'
const  Header =dynamic(()=>import("@/components/freelancer/header"),{
  ssr:false,
})


const HomePageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
        
        <Header/>
        {children}
        
      </main>
    );
  };
  
  export default HomePageLayout