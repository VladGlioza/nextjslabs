import { Header } from "@/components/Header";

export default function MainLayout({ children } : { children: React.ReactNode}) {
    
    const navItems = [
        {link: "/articles", title: "Articles"},
        {link: "/profile/settings", title: "Profile Settings"},
        {link: "/profile/security", title: "Profile Security"},
    ]


    return (
        <>
        <Header navItems={navItems}/>
        {children}
      </>
    )
  }