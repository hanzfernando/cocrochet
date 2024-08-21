import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductItem = ({ product }) => {
  return (
    <Link 
      to={`/shop/${product._id}`}
      className="font-roboto flex-grow-0 flex-shrink-0 basis-[calc(25%-1rem)] border border-1 min-w-[11.5rem]">
        <div className="aspect-w-6 aspect-h-7">
            <img src={product.image} alt="Featured Craft 1" className="w-full h-full object-cover" />
        </div>
        <div className="p-2">
            <p className="text-sm md:text-base font-thin">{product.name}</p>
            <p className="text-xs md:text-sm font-thin mb-1">{product.itemsSold} Products sold</p>
            <p className="text-sm text-base font-regular">PHP {product.price}</p>
        </div>
    </Link>

  )
}

ProductItem.propTypes = {
  product: PropTypes.object,
}

export default ProductItem