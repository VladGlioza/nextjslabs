"use client";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface HeaderItemProps{
    link: string;
    title: string;
}

export const Header = ({navItems} : {navItems: HeaderItemProps[]}) => {
    const pathName = usePathname();

    const selectedIndex = navItems.findIndex((item) => pathName.includes(item.link))

    
    return(
        <Tabs variant='soft-rounded' colorScheme='blue' index={selectedIndex}>
            <TabList>
                {navItems.map((navItem) => {
                    return(
                        <Tab key={navItem.title}>
                            <Link href={navItem.link}>{navItem.title}</Link>
                        </Tab>
                    )
                })}
            </TabList>
        </Tabs>
    )
}