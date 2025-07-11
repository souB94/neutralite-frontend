import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
          toast.error('You are not logged in.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/orders/myorders`, config);
        console.log("API Response:", data); // <--- ADD THIS
        setOrders(data.orders || data); // <-- Update based on response shape
        //setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders.');
        setMessage('Could not load your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-brown-600 border-b-2 mb-3 pb-2">Your Orders</h2>

      {loading && <p>Loading...</p>}
      {message && <p className="text-red-500 mb-4">{message}</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found. Start shopping now!</p>
      )}

      {orders.length > 0 && (
        <table className="w-full border text-sm mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders?.map((order) => (
              <tr key={order._id}>
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  ${order.grandTotal?.toFixed(2) || '0.00'}
                </td>
                <td className="p-2 border">
                  {order.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : ( 
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-2 border">
                  {order.status || 'Pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
