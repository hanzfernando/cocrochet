// import SearchFilter from '../components/SearchFilter'
import ProductList from '../components/ProductList'

const ShopPage = () => {
  return (

    <div className='flex w-full max-w-7xl mx-auto my-12 gap-4'>
        <div className='w-full mx-8'>
            <h1 className="font-playfair text-4xl font-medium">Handicrafts</h1>
            <form className='flex flex-col font-roboto '>
                <div className="flex flex-col md:flex-row items-center gap-2 justify-center mt-4">
                    {/* Search Input */}
                    <div className='w-full md:flex-1'>
                        <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full border border-gold rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-gold"
                        />
                    </div>
    
                    {/* Sort By Text */}
                    <div className='flex justify-center items-center'>
                        <span className="mr-2 ">Sort By:</span>
    
                        {/* Sort Options */}
                        <div className="flex gap-2 ">
                            <button type="button" className="px-3 py-1 rounded-md bg-gold text-white">Relevance</button>
                            <button type="button" className="px-3 py-1 rounded-md bg-white border border-gold">Latest</button>
                            <button type="button" className="px-3 py-1 rounded-md bg-white border border-gold">Top Sales</button>
                        </div>
        
                        {/* Price Dropdown */}
                        <select className="ml-2 px-3 py-1 rounded-md bg-white border border-gold">
                            <option value="price">Price</option>
                            <option value="price">Ascending</option>
                            <option value="price">Descending</option>
                        </select>
                    </div>
                  
                </div>
                <div className='flex justify-center md:justify-start items-center gap-3 mt-2'>
                    <span className="mr-2 ">Filter By:</span>

                    <label className='block'>
                        <input
                        type='checkbox'
                        name='bouquets'
                        className='mr-1'                            
                        />
                        Flower Bouquets
                    </label>
                    <label className='block'>
                        <input
                        type='checkbox'
                        name='keychains'    
                        className='mr-1'                            
                        />
                        Keychains
                    </label>
                    <label className='block'>
                        <input
                        type='checkbox'
                        name='headbands'
                        className='mr-1'                                   
                        />
                        Headbands
                    </label>
                    <label className='block'>
                        <input
                        type='checkbox'
                        name='others'  
                        className='mr-1'                            
                        />
                        Others
                    </label>
                </div>

            </form>
  
          {/* Product List */}

            <ProductList />

        </div>
    </div>

  )
}

export default ShopPage