import { MobileHeader } from "@/components/mobile-header"
import { Sidebar } from "@/components/sidebar"


const MainLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <MobileHeader />
            <Sidebar className="lg:flex hidden " />
            <main className="lg:pl-[256px] pl-0 h-full pt-[50px] lg:pt-0">
                <div className="max-w-[1056px] mx-auto pt-6 h-full">
                    {children}
                </div>
            </main>
        </>
    )
}

export default MainLayout