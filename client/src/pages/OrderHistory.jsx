import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders/my-orders', {
                    headers: {
                        'x-user-id': user._id,
                    },
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const handleCancelOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                    method: 'DELETE',
                    headers: {
                        'x-user-id': user._id,
                    },
                });

                if (response.ok) {
                    setOrders(orders.filter((order) => order._id !== orderId));
                    alert('Order cancelled successfully');
                } else {
                    alert('Failed to cancel order');
                }
            } catch (error) {
                console.error('Error cancelling order:', error);
            }
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading orders...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary display-font">My Order History</h1>
            {orders.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-600 mb-4">You have no orders yet.</p>
                    <Link to="/category" className="btn btn-primary rounded-full hover-lift">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-800">{order._id}</span></p>
                                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                        {order.status}
                                    </span>
                                    {order.status === 'Pending' && (
                                        <button
                                            onClick={() => handleCancelOrder(order._id)}
                                            className="btn btn-error btn-xs text-white hover-lift"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="font-semibold mb-2">Items:</h3>
                                <ul className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center text-gray-700">
                                            <span>{item.name} (x{item.quantity})</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-gray-100 mt-4 pt-2 flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
