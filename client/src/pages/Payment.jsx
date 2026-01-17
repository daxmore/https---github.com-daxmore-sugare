import React, { useState, useContext } from 'react';
import { CheckCircle, CreditCard, Landmark, QrCode } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case 'upi':
        return <UpiPayment />;
      case 'card':
        return <CardPayment />;
      case 'netbanking':
        return <NetbankingPayment />;
      default:
        return <UpiPayment />;
    }
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const orderItems = cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        dessertId: item._id
      }));

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user._id
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: totalAmount
        })
      });

      if (response.ok) {
        clearCart();
        setShowSuccessPopup(true);
      } else {
        const errorData = await response.json();
        alert(`Payment failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing your payment.");
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary display-font">Complete Your Payment</h1>
          <div className="text-lg font-semibold text-gray-700">Total: ₹{totalAmount.toFixed(2)}</div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Payment Method</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="form-control flex-1">
              <label className={`label cursor-pointer border rounded-lg p-4 transition-all ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}>
                <span className="label-text text-lg font-medium">UPI</span>
                <input type="radio" name="payment-method" className="radio radio-primary" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
              </label>
            </div>
            <div className="form-control flex-1">
              <label className={`label cursor-pointer border rounded-lg p-4 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}>
                <span className="label-text text-lg font-medium">Card</span>
                <input type="radio" name="payment-method" className="radio radio-primary" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              </label>
            </div>
            <div className="form-control flex-1">
              <label className={`label cursor-pointer border rounded-lg p-4 transition-all ${paymentMethod === 'netbanking' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}>
                <span className="label-text text-lg font-medium">Netbanking</span>
                <input type="radio" name="payment-method" className="radio radio-primary" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
              </label>
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl border border-base-300 mb-8">
          {renderPaymentMethod()}
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary btn-lg hover-lift" onClick={handlePayment}>
            Pay Now
          </button>
        </div>

        {showSuccessPopup && <PaymentSuccessPopup onClose={handleClosePopup} />}
      </div>
    </div>
  );
};

const UpiPayment = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Scan QR Code to Pay</h2>
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white mb-4">
      <QrCode className="w-32 h-32 text-gray-800" />
    </div>
    <p className="text-gray-500 font-medium">UPI ID: donuterria@upi</p>
  </div>
);

const CardPayment = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Card Details</h2>
    <div className="space-y-4">
      <div className="relative">
        <CreditCard className="absolute left-3 top-3 text-gray-400" size={20} />
        <input type="text" placeholder="Card Number" className="input input-bordered w-full pl-10 focus:input-primary" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="MM/YY" className="input input-bordered w-full focus:input-primary" />
        <input type="text" placeholder="CVV" className="input input-bordered w-full focus:input-primary" />
      </div>
      <input type="text" placeholder="Name on Card" className="input input-bordered w-full focus:input-primary" />
    </div>
  </div>
);

const NetbankingPayment = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Your Bank</h2>
    <div className="grid grid-cols-2 gap-4">
      {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak', 'PNB'].map(bank => (
        <button key={bank} className="btn btn-outline btn-sm justify-start hover:btn-primary">
          <Landmark className="w-4 h-4 mr-2" />
          {bank}
        </button>
      ))}
    </div>
  </div>
);

const PaymentSuccessPopup = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transform transition-all scale-100">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Payment Successful!</h2>
      <p className="text-gray-600 mb-8">Thank you for your order. Your dessert is being prepared with love!</p>
      <button onClick={onClose} className="btn btn-primary w-full hover-lift">
        View Order History
      </button>
    </div>
  </div>
);

export default Payment;
