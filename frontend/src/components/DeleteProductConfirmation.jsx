import PropTypes from 'prop-types';

const DeleteProductConfirmation = ({ onClose, onConfirm, productToDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded shadow-lg text-center">
                <button className='absolute w-8 h-8 top-2 right-4' onClick={onClose}>
                    X
                </button>
                <h2 className="text-xl mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete this product?</p>
                <p className="font-semibold mb-2">{productToDelete.name}</p>
                <div className=' mx-auto overflow-hidden'>
                    <img src={productToDelete.image} alt={productToDelete.name} className="w-32 h-40 object-cover mx-auto mb-6" />
                </div>
                <div className="flex justify-center gap-2">
                    <button 
                        className="bg-red-500 text-white w-full py-2 px-4 rounded"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button 
                        className="bg-gray-300 py-2 w-full  px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteProductConfirmation.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    productToDelete: PropTypes.object.isRequired,
};

export default DeleteProductConfirmation;
