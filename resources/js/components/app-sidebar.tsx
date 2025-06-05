import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, CirclePlus, Folder, Heart, LayoutGrid, ReceiptText,User,CornerDownRight } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     href: '/dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Categorias',
        href: '/categorias',
        icon: LayoutGrid,
    },
    {
        title: 'Anuncios',
        href: '/anuncios',
        icon: ReceiptText,
    },
    {
        title: 'Nuevo Anuncio',
        href: '/anuncios/create',
        icon: CirclePlus,
    },
    {
        title: 'Mis Anuncios',
        href: '/mis-anuncios',
        icon: CornerDownRight ,
    },
    {
        title: 'Favoritos',
        href: '/mis-likes',
        icon: Heart,
    },
    // {
    //     title: 'Contacto',
    //     href: '/contacto',
    //     icon: ReceiptText,
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio',
        href: 'https://github.com/romedsu/boneke_v1',
        icon: Folder,
    },
    // {
    //     title: 'Documentación',
    //     href: '#',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
     const { auth } = usePage().props as { auth?: { user?: any } };
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="bg-amber-700 gap-0 hover:bg-neutral-800" size="lg" asChild>
                            <Link href="/" prefetch
                                className="flex   text-neutral-200 hover:text-neutral-100">
                                <AppLogo />
                            <img className="w-37 mx-auto " src="/storage/boneke_04.png" alt="logo boneke" />
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
                
                {/* si no hay usuario logueado */}
                {auth?.user ? (
                    <NavUser />
                ) : (
                    <div className="p-4 text-center">
                        <Link href="/login" className=" flex mb-1 bg-amber-700 text-neutral-200 p-1 justify-center rounded-md font-bold border border-transparent hover:bg-transparent  hover:border hover:border-amber-700">
                            <User className='w-5 mr-2'/>
                            Iniciar sesión
                        </Link>
                        <Link href="/register" className=" flex  text-amber p-2 justify-center rounded-md font-medium hover:bg-transparent hover:text-amber-700">
                            {/* <User className='w-5 mr-2'/> */}
                            Registrarse
                        </Link>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
