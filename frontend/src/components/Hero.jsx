import hero from '../assets/hero-image.png'

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center py-10 md:py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
            <img
            src={hero}
            alt="Handmade Crochet"
            className="w-full h-full object-cover"
            />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:justify-start justify-center items-center text-center md:text-left">
            <div className="p-8 md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-playfair text-gray-dark leading-tight">
                    Handmade Crochet Treasures Just for You
                </h1>
                <p className="text-lg mt-8 text-gray-dark">
                    Discover unique, handmade crochet items crafted with love. Find the
                    perfect gift or treat yourself to a special treasure.
                </p>
                <button className="mt-10 px-6 py-2 bg-gold text-white text-lg font-medium rounded-lg border-2 border-white hover:bg-gold-light">
                    Shop Now
                </button>
            </div>
        </div>

    </div>
  )
}

export default Hero