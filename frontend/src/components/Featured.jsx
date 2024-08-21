import featured1 from '../assets/featured-1.png'
import featured2 from '../assets/featured-2.png'
import featured3 from '../assets/featured-3.png'
import featured4 from '../assets/featured-4.png'
import featured5 from '../assets/featured-5.png'
import { Link } from 'react-router-dom'

const Featured = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-12 px-8">
      <h1 className="font-playfair text-4xl text-center">
          Featured Crafts
      </h1>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 mt-6">
        <Link className="col-span-2 row-span-2 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-gray-100 p-2">
          <img src={featured1} alt="Featured Craft 1" className="w-full h-full object-cover" />
        </Link>
        <Link className="col-span-1 row-span-1 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-gray-100 p-2">
          <img src={featured2} alt="Featured Craft 2" className="w-full h-full object-cover" />
        </Link>
        <Link className="col-span-1 row-span-1 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-gray-100 p-2">
          <img src={featured3} alt="Featured Craft 3" className="w-full h-full object-cover" />
        </Link>
        <Link className="col-span-1 row-span-1 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-gray-100 p-2">
          <img src={featured4} alt="Featured Craft 4" className="w-full h-full object-cover" />
        </Link>
        <Link className="col-span-1 row-span-1 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-gray-100 p-2">
          <img src={featured5} alt="Featured Craft 5" className="w-full h-full object-cover" />
        </Link>
      </div>
    </div>
  )
}

export default Featured