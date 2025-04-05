import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Space from "@/components/Space";

export default function Layout({children}: Readonly<{children: React.ReactNode}>){
    return(
        <main>
            <Navbar/>
            {children}
            <Space height="2em"/>
            <Footer/>
        </main>
    )
}