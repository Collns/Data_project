import {Link} from 'react-router-dom';
const Navbar = () => {
return (
    <div className="bg-gray-100">
    <header className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-left p-4">
        <nav className="space-x-6 ">
            <Link to="/" className="hover:text-red-500">  HOME </Link>

            <Link to="/about" className="hover:text-red-500">  ABOUT US </Link>
            
            <Link to="/services" className="hover:text-red-500">  SERVICES </Link>

            <Link to="/services" className="hover:text-red-500">  BOOK NOW </Link>
        </nav>
        
        </div>
    </header>
    </div>
)
}

export default Navbar;