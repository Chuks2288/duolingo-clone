import { Header } from "./components/header";
import { Footer } from "./components/footer";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-col justify-center items-center flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MarketingLayout;