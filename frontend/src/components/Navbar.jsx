import logo from '../assets/crochet-icon.png'
import { NavLink } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    // For text links
    const setTextIsActive = () => 
        ({isActive}) => isActive 
            ? 'flex items-center justify-center rounded-md hover:bg-gold-light hover:text-white px-4 py-2 text-white bg-gold'
            : 'flex items-center justify-center rounded-md hover:bg-gold-light hover:text-white px-4 py-2 text-black ';

    // For icon links
    const setIconIsActive = () =>
        ({isActive}) => isActive 
            ? 'flex items-center justify-center w-10 border-2 border-gold rounded-full hover:border-gold-light hover:bg-gold-light hover:text-white bg-gold text-white'
            : 'flex items-center justify-center w-10 border-2 border-gold rounded-full hover:border-gold-light hover:bg-gold-light hover:text-white text-gold';
    
    const handleLogout = () => {
        logout()
    }


    return (
        <nav className="bg-gold-thin border-b border-gold">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start font-roboto">
                        {/* <!-- Logo --> */}
                        <NavLink to="/" className="flex flex-shrink-0 items-center mr-4" href="/index.html">
                            <img
                                className="h-10 w-auto"
                                src={logo}
                                alt="Co's Crochet"
                            />
                            <span className="hidden md:block text-2xl font-playfair  ml-2">CO&#39;s Crochet</span>
                        </NavLink>
                            
                        <div className="md:ml-auto">
                            <div className="flex font-roboto space-x-2">
                                {user && ( 
                                    <>
                                        {/* User Greeting */}
                                        <div className="flex items-center mr-6">
                                            {user.name && <span className=''>Welcome, {user.name}</span>}
                                        </div>
                                    </>
                                )}

                                { true && (
                                    <>
                                        {/* HOME */}
                                        <NavLink
                                            to="/"
                                            className={setTextIsActive()}>
                                            Home
                                        </NavLink>
                                        {/* SHOP */}
                                        <NavLink
                                            to="/shop"
                                            className={setTextIsActive()}>
                                            Shop
                                        </NavLink>                                     
                                    </>

                                )}
                                

                                {user && user.role === 'user' && (
                                    <>
                                        {/* CART */}
                                        <NavLink
                                            to="/cart"                        
                                            className={setIconIsActive()}>
                                            <FaShoppingCart className='text-xl'/>
                                        </NavLink>
                                        {/* PROFILE */}
                                        <NavLink
                                            to="/profile"
                                            className={setIconIsActive()}>
                                            <FaUser className='text-xl'/>
                                        </NavLink>
                                    </>
                               
                                )}

                                {/* Admin */}
                                {user && user.role === 'admin' && (
                                    <>
                                        {/* PRODUCT MANAGEMENT */}    
                                        <NavLink
                                            to="/product-management"
                                            className={setTextIsActive()}>
                                            Product
                                        </NavLink>
                                        {/* ORDER MANAGEMENT */}
                                        <NavLink
                                            to="/order-management"
                                            className={setTextIsActive()}>
                                            Order
                                        </NavLink>
                                    </>                                 
                                )}
                                                            
                                {user && (
                                    <>  
                                        {/* LOGOUT */}
                                        <button
                                            onClick={handleLogout}
                                            className='flex items-center justify-center rounded-md hover:bg-gold-light hover:text-white px-4 py-2 text-black'>
                                            <FaSignOutAlt className='mr-1 text-gold-dark'/>
                                            Log out
                                        </button> 
                                    </>
                                )}

                                {/* Auth */}
                                {!user && (
                                    <>
                                        {/* LOGIN */}
                                        <NavLink to="/login" className={setTextIsActive()}>
                                            Login
                                        </NavLink>
                                        {/* SIGN UP */}
                                        <NavLink to="/signup" className={setTextIsActive()}>
                                            Signup
                                        </NavLink>
                                    </>
                                )}
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar