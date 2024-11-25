import { Link } from 'react-router-dom';

const Navbar = ({ token, setToken, user }) => {
  const handleLogout = () => {
    setToken(null);
    alert("Logged out successfully");
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-left p-4">
          <nav className="space-x-6">
            {/* Always Visible Links */}
            <Link to="/" className="hover:text-red-500"> HOME </Link>
            <Link to="/about" className="hover:text-red-500"> ABOUT US </Link>
            <Link to="/services" className="hover:text-red-500"> SERVICES </Link>
            <Link to="/book" className="hover:text-red-500"> BOOK NOW </Link>

            {/* Conditional Links */}
            {!token ? (
              <>
                <Link to="/login" className="hover:text-red-500"> LOGIN </Link>
                <Link to="/signup" className="hover:text-red-500"> SIGNUP </Link>
              </>
            ) : (
              <>
                {user?.role === "admin" && (
                  <Link to="/admin" className="hover:text-red-500"> ADMIN DASHBOARD </Link>
                )}
                <button onClick={handleLogout} className="hover:text-red-500"> LOGOUT </button>
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
