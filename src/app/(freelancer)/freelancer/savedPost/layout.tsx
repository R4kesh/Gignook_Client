import Header from "@/components/freelancer/header";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
        
        <Header/>
        {children}
        
      </main>
    );
  };
  
  export default HomePageLayout