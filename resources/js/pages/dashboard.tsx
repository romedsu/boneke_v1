import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


const Dashboard: React.FC<{ anuncios: any[] }> = ({ anuncios }) => {
// const Dashboard = ({ anuncios }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video items-center justify-center space-x-2 overflow-hidden rounded-xl border bg-neutral-800">
                        <Switch />
                        <Label>Modo</Label>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>Una lista de tus recientes artículos 2</TableCaption>
                        <TableHeader className='bg-amber-700'>
                            <TableRow>
                                <TableHead className="w-[100px]">Articulo</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Lugar</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>descripcion</TableHead>
                                <TableHead>Cambio por:</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {anuncios.map((anuncio) => (
                                <TableRow key={anuncio.id}>
                                    <TableCell className="font-medium">{anuncio.articulo}</TableCell>
                                    <TableCell>{anuncio.user.name}</TableCell>
                                    <TableCell>{anuncio.lugar}</TableCell>
                                    <TableCell>{anuncio.valor}</TableCell>
                                    <TableCell>{anuncio.descripcion}</TableCell>
                                    <TableCell>{anuncio.cambio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
