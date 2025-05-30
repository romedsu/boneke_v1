import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Badge, BookOpen, Circle, CirclePlus, Folder, LayoutGrid, LayoutList, Receipt, ReceiptText } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     href: '/dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Anuncios',
        href: '/anuncios',
        icon: ReceiptText,
    },
    {
        title: 'Categorias',
        href: '/categorias',
        icon: LayoutGrid,
    },
    {
        title: 'Nuevo Anuncio',
        href: '/anuncios/create',
        icon: CirclePlus,
    },
    {
        title: 'Contacto',
        href: '/contacto',
        icon: ReceiptText,
    },
  
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio',
        href: 'https://github.com/romedsu/boneke_v1',
        icon: Folder,
    },
    {
        title: 'Documentación',
        href: '#',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className='bg-amber-700' size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
