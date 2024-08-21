
import ProductTable from "../components/ProductTable"

const ProductManagementPage = () => {
  return (
    <>
      <div className="w-full max-w-7xl m-auto px-4 mt-12">
        <h1 className="font-playfair text-4xl text-center mb-12">
          Manage Products
        </h1>
        <ProductTable />
      </div>
    </>
  

  )
}

export default ProductManagementPage