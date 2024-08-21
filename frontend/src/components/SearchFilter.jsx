import { FaFilter } from 'react-icons/fa'

const SearchFilter = () => {
  return (
    <div className='w-1/6 p-4 border ml-4'>
      <div className='flex items-center'>
        <FaFilter /> 
        <p className='ml-2 font-roboto font-medium'>Search Filter</p>
      </div>
      <div className='mt-4'>
        <p className='font-roboto font-thin mb-2'>By Category</p>
        <form className='text-sm'>
          <label className='block'>
            <input
              type='checkbox'
              name='bouquets'
              className='mr-2'                            
            />
            Flower Bouquets
          </label>
          <label className='block'>
            <input
              type='checkbox'
              name='keychains'    
              className='mr-2'                            
            />
            Key Chains
          </label>
          <label className='block'>
            <input
              type='checkbox'
              name='headbands'
              className='mr-2'                                   
            />
            Head Bands
          </label>
          <label className='block'>
            <input
              type='checkbox'
              name='others'  
              className='mr-2'                            
            />
            Others
          </label>
        </form>
      </div>
    </div>
  )
}

export default SearchFilter