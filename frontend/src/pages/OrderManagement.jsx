import OrderTable from '../components/OrderTable.jsx';
const OrderManagement = () => {
    
    return (
        <div className="max-w-[100rem] w-full p-6 mx-auto">
            <h1 className='font-playfair text-4xl text-center mb-6'>Orders</h1>
            <div className="overflow-x-auto">
                <OrderTable />
            </div>
        </div>
    );
};

export default OrderManagement;
