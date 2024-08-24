import OrderTable from "./OrderTable";

const OrderHistory = () => {
    return (
        <div>
            {/* <h1 className="text-xl font-semibold">Order History</h1> */}
            <div className="overflow-x-auto">
                <OrderTable />
            </div>
        </div> 
    );
};

export default OrderHistory;
