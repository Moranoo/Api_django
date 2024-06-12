export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-between">
                <li>
                    <a href="/" className="text-white">Accueil</a>
                </li>
                <li>
                    <a href="/recipes" className="text-white">Recettes</a>
                </li>
                <li>
                    <a href="/select-ingredients" className="text-white">Sélection d'ingrédients</a>
                </li>
            </ul>
        </nav>
    );
}