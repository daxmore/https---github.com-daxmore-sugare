import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Minus, Plus, ShoppingCart } from 'lucide-react';
import useCartStore from '../context/useCartStore';

const CakeCustomizer = ({ dessert }) => {
  const [step, setStep] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(dessert.variants?.[0] || { name: 'Standard', price: dessert.basePrice });
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [customText, setCustomText] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const toggleModifier = (mod) => {
    if (selectedModifiers.find(m => m.name === mod.name)) {
      setSelectedModifiers(selectedModifiers.filter(m => m.name !== mod.name));
    } else {
      setSelectedModifiers([...selectedModifiers, mod]);
    }
  };

  const calculateSubtotal = () => {
    let price = selectedVariant.price;
    selectedModifiers.forEach(m => price += m.extraPrice);
    return price * quantity;
  };

  const steps = [
    { id: 1, title: 'Choose Size' },
    { id: 2, title: 'Dietary & Add-ons' },
    { id: 3, title: 'Personalize' }
  ];

  const handleAddToCart = () => {
    addItem(dessert, selectedVariant, selectedModifiers, quantity, customText, specialInstructions);
    setStep(1); // Reset for next time
    alert('Added to basket!');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-lg w-full border border-gray-100">
      {/* Progress Bar */}
      <div className="flex h-1.5 bg-gray-100">
        {steps.map((s) => (
          <div 
            key={s.id} 
            className={`flex-1 transition-all duration-700 ${step >= s.id ? 'bg-orange-500' : 'bg-transparent'}`}
          />
        ))}
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Customize</h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                Step {step} of 3
            </span>
        </div>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Select Weight / Size</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {dessert.variants?.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-5 rounded-[24px] border-2 text-left transition-all duration-300 ${
                      selectedVariant.name === v.name ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-500/10' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                    }`}
                  >
                    <div className={`font-black text-lg ${selectedVariant.name === v.name ? 'text-orange-600' : 'text-gray-900'}`}>{v.name}</div>
                    <div className="text-sm font-bold text-gray-500">₹{v.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Optional Dietary Choices</h3>
              <div className="space-y-3 mb-6">
                {dessert.modifiers?.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => toggleModifier(m)}
                    className={`w-full p-5 rounded-[24px] border-2 flex justify-between items-center transition-all duration-300 ${
                      selectedModifiers.find(sm => sm.name === m.name) ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-500/10' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedModifiers.find(sm => sm.name === m.name) ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'}`}>
                        {selectedModifiers.find(sm => sm.name === m.name) && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`font-bold ${selectedModifiers.find(sm => sm.name === m.name) ? 'text-orange-900' : 'text-gray-700'}`}>{m.name}</span>
                    </div>
                    {m.extraPrice > 0 && <span className="text-sm font-black text-orange-600">+₹{m.extraPrice.toFixed(2)}</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Personalize Your Cake</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Name on Cake</label>
                  <div className="absolute inset-0 top-8 rounded-[24px] bg-orange-100/20 flex items-center justify-center overflow-hidden pointer-events-none">
                    <span className="text-4xl font-script opacity-30 rotate-[-5deg] text-orange-900 select-none" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      {customText || 'Happy Birthday!'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.slice(0, 30))}
                    placeholder="e.g. Rahul"
                    className="w-full p-5 rounded-[24px] bg-white border-2 border-gray-100 focus:border-orange-500 focus:ring-0 relative z-10 bg-transparent text-center font-black text-xl placeholder:text-gray-200"
                  />
                </div>

                <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Special Instructions</label>
                    <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g. Less sugar, no egg, add extra candles..."
                        className="w-full p-5 h-28 rounded-[24px] bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                    />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-10 p-5 bg-gray-900 rounded-[28px] shadow-lg shadow-gray-200">
          <div className="flex items-center gap-5">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"><Minus className="w-5 h-5" /></button>
            <span className="text-2xl font-black text-white w-6 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"><Plus className="w-5 h-5" /></button>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Subtotal</div>
            <div className="text-3xl font-black text-orange-400">₹{calculateSubtotal().toFixed(2)}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="p-5 rounded-[24px] bg-gray-100 font-black text-gray-600 hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">Back</button>
          ) : (
            <div />
          )}
          
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="p-5 rounded-[24px] bg-orange-600 text-white font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 uppercase tracking-widest text-xs">Next Step</button>
          ) : (
            <button onClick={handleAddToCart} className="p-5 rounded-[24px] bg-orange-600 text-white font-black hover:bg-orange-700 flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-100 uppercase tracking-widest text-xs">
              <ShoppingCart className="w-5 h-5" /> Add to Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeCustomizer;
