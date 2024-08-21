import categoryBouquet from '../assets/category-bouquet.png'
import categoryKeychain from '../assets/category-keychain.png'
import categoryHeadBand from '../assets/category-headband.png'
import categoryOther from '../assets/category-other.png'
import { Link } from 'react-router-dom'

const Discover = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-12">
        <h1 className="font-playfair text-4xl text-center">
            Discover
        </h1>
        <div className="flex flex-row px-8 gap-1 md:gap-2 justify-between mt-6">
            <Link className='block w-1/4 hover:underline hover:bg-gray-100 p-2 hover:scale-105 transition-transform duration-300 ease-in-out' to='/shop'>
                <div>
                    <img
                        src={categoryBouquet}
                        alt="Handmade Crochet"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-row justify-between mt-2 text-xs md:text-base ">
                    <p className='font-medium'>Flower Bouquets</p>
                    <p>Explore →</p>
                </div>
            </Link>

            <Link className='block w-1/4 hover:underline hover:bg-gray-100 p-2 hover:scale-105 transition-transform duration-300 ease-in-out' to='/shop'>
                <div>
                    <img
                        src={categoryKeychain}
                        alt="Handmade Crochet"
                        className="w-full h-full object-cover"
                    />
                </div>               
                <div className="flex flex-row justify-between mt-2 text-xs md:text-base">
                    <p className='font-medium'>Flower Bouquets</p>
                    <p>Explore →</p>
                </div>
            </Link>

            <Link className='block w-1/4 hover:underline hover:bg-gray-100 p-2 hover:scale-105 transition-transform duration-300 ease-in-out' to='/shop'>
                <div>
                    <img
                        src={categoryHeadBand}
                        alt="Handmade Crochet"
                        className="w-full h-full object-cover"
                    />
                </div>               
                <div className="flex flex-row justify-between mt-2 text-xs md:text-base">
                    <p className='font-medium'>Flower Bouquets</p>
                    <p>Explore →</p>
                </div>
            </Link>

            <Link className='block w-1/4 hover:underline hover:bg-gray-100 p-2 hover:scale-105 transition-transform duration-300 ease-in-out' to='/shop'>
                <div>
                    <img
                        src={categoryOther}
                        alt="Handmade Crochet"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-row justify-between mt-2 text-xs md:text-base">
                    <p className='font-medium'>Flower Bouquets</p>
                    <p>Explore →</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Discover