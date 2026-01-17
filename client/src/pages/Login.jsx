import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      login(data);
      if (data.isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center bg-base-200">
      <div className="flex flex-col md:flex-row rounded-xl shadow-2xl max-w-4xl overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-[35rem] md:h-[30rem]">
          <img
            src="https://images.unsplash.com/photo-1624000961428-eeece184988b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full py-15 md:w-[35rem] md:h-[30rem] p-8 bg-base-100">
          <h1 className="text-4xl font-bold text-center mb-2">Welcome Back!</h1>
          <h1 className="text-center mb-8">Login to your account.</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative flex items-center">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered rounded-xl w-full px-5"
                required
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="input input-bordered rounded-xl w-full px-5"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="link link-hover text-primary">Forgot password?</a>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <p className="text-sm text-center">
              Don't have an account? 
              <Link to="/register" className="link link-primary"> Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
