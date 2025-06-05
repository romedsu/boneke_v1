import { Search } from 'lucide-react';

interface BuscadorProps {
    busqueda: string;
    setBusqueda: (valor: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ busqueda, setBusqueda }) => (
<div className="flex w-full max-w-full items-center justify-center sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <Search className="mr-3" />
        <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-xs rounded-md border border-gray-300 p-2 transition-colors outline-none focus:border-amber-600 focus:bg-neutral-800"
        />
    </div>
);

export default Buscador;