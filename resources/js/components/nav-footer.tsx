import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const isLogin = item.href === '/login';
                        const isRegister = item.href === '/register';
                        const isExternal = item.href.startsWith('http');
                        const customClass = isLogin
                            ? 'flex items-center mb-1 bg-amber-700 text-neutral-200 p-2 justify-center rounded-md font-bold border border-transparent hover:bg-transparent hover:border hover:border-amber-700'
                            : isRegister
                              ? 'flex items-center mb-1 bg-transparent text-neutral-300 p-2 justify-center rounded-md font-bold border border-amber-700 hover:bg-amber-700'
                              : 'text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100';
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className={customClass}>
                                    <a href={item.href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                        {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
