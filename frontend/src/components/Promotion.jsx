import promotion from '../assets/promotion.png'

const Promotion = () => {
  return (
    <div className='w-full bg-gold-thin my-12 '>
        <div className="w-full max-w-7xl mx-auto p-8">
            <div className='flex flex-col md:flex-row gap-4 md:gap-14 items-center justify-center'>
                <div className=''>
                    <img src={promotion} alt="Featured Craft 1" className="w-full md:min-w-72 h-72 md:h-auto object-cover rounded-3xl " />
                </div>
                <div className="max-w-md">
                    <h1 className='font-playfair text-center md:text-left font-light text-2xl md:text-4xl mb-4'>
                        Express Your Love with Handmade Crochet Flower Bouquets
                    </h1>
                    <p className="mb-6 font-roboto text-center text-sm md:text-regular md:text-left ">
                        Give the gift of everlasting beauty. Our handmade crochet flower bouquets are perfect for showing your love and appreciation. Unlike real flowers, these blooms will never wilt, making them a lasting symbol of your affection.
                    </p>
                    <button className="block mx-auto bg-gold-light hover:bg-gold-extralight text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out text-center">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Promotion