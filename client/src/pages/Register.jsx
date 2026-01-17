import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
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

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center bg-base-200">
      <div className="flex flex-col md:flex-row rounded-xl shadow-2xl max-w-5xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full py-12 md:w-[35rem] p-8 bg-base-100">
          <h1 className="text-4xl font-bold text-center mb-2">Create Your Account!</h1>
          <h1 className="text-center mb-8">Welcome to GreenThumb Nursery.</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input type="text" name="fullname" placeholder="Enter Your Full Name" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            <div className="relative">
              <input type="text" name="username" placeholder="Enter Your Username" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            <div className="relative">
              <input type="email" name="email" placeholder="Enter Your Email" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            <div className="relative">
              <input type="password" name="password" placeholder="Enter Password" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            <div className="relative">
              <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">Register</button>
            <p className="text-sm text-center">
              Already have an account?
              <Link to="/login" className="link link-primary"> Login here</Link>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688"
            alt="Register Illustration"
            className="w-full h-[35rem] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;