import { Header } from "@/components/Header"

export default function ArticlesLayout({ children } : { children: React.ReactNode}) {
  const navItems = [
    {link: "/articles/create", title: "Articles Create"},
    {link: "/articles/favorite", title: "Articles Favorite"},
  ]

  return (
      <>
        <Header navItems={navItems}/>
        {children}
      </>
    )
  }