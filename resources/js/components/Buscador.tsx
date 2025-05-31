import { Search } from 'lucide-react';

interface BuscadorProps {
    busqueda: string;
    setBusqueda: (valor: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ busqueda, setBusqueda }) => (
    <div className="flex w-full items-center justify-center sm:w-1/2 md:w-[30%]">
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