import Header from "@/components/landing-page/header";
import Featured from "@/components/landing-page/featured";
import Footer from "@/components/landing-page/footer";
const HomePageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
      <main>
        <Header />
        
        {children}
        <Footer/>
      </main>
    );
  };
  
  export default HomePageLayout