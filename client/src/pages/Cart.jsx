import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import QuantityControl from '../components/QuantityControl';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6">
              <div className="animate-float relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                <div className="absolute -top-2 -right-2 animate-float-delay">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary opacity-80">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
            <p className="text-base-content/70 mb-8 max-w-md mx-auto">
              Looks like you haven't added any sweet treats to your cart yet.
            </p>
            <Link to="/category" className="btn btn-primary btn-lg">
              Browse Desserts
            </Link>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>
                        <div className="join">
                          <QuantityControl
                            quantity={item.quantity}
                            onIncrease={() => updateQuantity(item._id, item.quantity + 1)}
                            onDecrease={() => updateQuantity(item._id, item.quantity - 1)}
                            onDirectChange={(value) => updateQuantity(item._id, value)}
                            max={item.stock || 99}
                          />
                        </div>
                      </td>
                      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                      <th>
                        <button onClick={() => removeFromCart(item._id)} className="btn btn-ghost btn-xs">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-grow">
                <Link to="/category" className="btn btn-outline">
                  <ArrowLeft className="mr-2" /> Continue Shopping
                </Link>
              </div>
              <div className="w-full md:w-1/3 bg-base-200 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>₹{cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="font-medium">Free</p>
                  </div>
                </div>
                <div className="divider my-4"></div>
                <div className="flex justify-between font-bold text-lg mb-4">
                  <p>Grand Total</p>
                  <p>₹{cartTotal.toFixed(2)}</p>
                </div>
                <Link to="/payment" className="btn btn-primary w-full">
                  <CreditCard className="mr-2" /> Proceed to Checkout
                </Link>
                <button onClick={clearCart} className="btn btn-ghost text-error w-full mt-2">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;