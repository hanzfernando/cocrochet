import loadingImage from '../assets/crochet-icon-grayscale.png'

const ProductLoadingCard = () => {
  return (
    <div className="bg-gray-extralight">
        <div className="w-full max-w-6xl mx-auto px-10 p-8">
            <div className="flex flex-col md:flex-row bg-white border rounded-xl font-roboto">
                <div className="w-full md:w-1/2">
                    <div className="aspect-w-3 aspect-h-4"> {/* Adjusted aspect ratio */}
                        <img
                            src={loadingImage}
                            alt='Loading'
                            className="object-cover rounded-lg shadow-md w-full h-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-16 w-full md:w-1/2 p-8 ">
                    <h1 className='text-xl md:text-2xl font-playfair font-bold mb-4'>Loading...</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductLoadingCard