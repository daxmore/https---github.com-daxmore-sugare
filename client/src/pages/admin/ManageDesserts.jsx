import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Link as LinkIcon, FileImage, Sparkles, Utensils, Info } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ManageDesserts = () => {
  const [desserts, setDesserts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSource, setImageSource] = useState('upload'); 
  
  const initialFormState = {
    name: '',
    category: 'Cake',
    basePrice: '',
    description: '',
    ingredients: '',
    allergens: '',
    servingSize: '',
    image: null,
    imageUrl: '',
    variants: [{ name: '0.5kg', price: 0, stock: 10 }],
    modifiers: [{ name: 'Sugar-Free', extraPrice: 0 }]
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchDesserts = async () => {
    try {
        const res = await axios.get('/desserts');
        setDesserts(res.data);
    } catch (err) {
        toast.error("Failed to load catalog");
    }
  };

  useEffect(() => {
    fetchDesserts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, imageUrl: '' });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: '', price: 0, stock: 0 }]
    });
  };

  const handleRemoveVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index)
    });
  };

  const handleAddModifier = () => {
    setFormData({
      ...formData,
      modifiers: [...formData.modifiers, { name: '', extraPrice: 0 }]
    });
  };

  const handleRemoveModifier = (index) => {
    setFormData({
      ...formData,
      modifiers: formData.modifiers.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(isEditing ? 'Syncing masterpiece...' : 'Creating masterpiece...');
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'variants' || key === 'modifiers') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'image') {
        if (formData[key]) data.append('image', formData[key]);
      } else if (key === '_id' || key === '__v') {
          // skip
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        await axios.put(`/desserts/${formData._id}`, data);
        toast.success("Catalog updated", { id: toastId });
      } else {
        await axios.post('/desserts', data);
        toast.success("Artisan treat added", { id: toastId });
      }
      setShowModal(false);
      setFormData(initialFormState);
      setImagePreview(null);
      fetchDesserts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dessert) => {
    setFormData({
      ...dessert,
      image: null,
      imageUrl: dessert.image?.startsWith('http') ? dessert.image : ''
    });
    
    if (dessert.image?.startsWith('http')) {
        setImageSource('url');
        setImagePreview(dessert.image);
    } else {
        setImageSource('upload');
        setImagePreview(`http://localhost:5000${dessert.image}`);
    }
    
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this masterpiece from catalog?')) return;
    const toastId = toast.loading('Removing...');
    try {
      await axios.delete(`/desserts/${id}`);
      toast.success("Removed from collection", { id: toastId });
      fetchDesserts();
    } catch (err) {
        toast.error("Failed to delete", { id: toastId });
    }
  };

  const getFullImageSrc = (img) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `http://localhost:5000${img}`;
  };

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen font-sans text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
        <div>
            <h1 className="text-4xl font-serif text-brand-900 mb-2 tracking-tight">Artisan Catalog</h1>
            <p className="text-gray-500 font-medium text-sm">Curate your collection of sweet masterpieces.</p>
        </div>
        <button 
            onClick={() => { setIsEditing(false); setFormData(initialFormState); setImagePreview(null); setImageSource('upload'); setShowModal(true); }}
            className="btn-elegant px-10"
        >
          <Plus size={18} />
          Add Masterpiece
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {desserts.map((dessert) => (
          <motion.div 
            layout
            key={dessert._id}
            className="boutique-card overflow-hidden bg-white group"
          >
            <div className="relative h-60 overflow-hidden bg-brand-50">
                <img src={getFullImageSrc(dessert.thumbnail || dessert.image)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={dessert.name} />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-brand-600 shadow-sm">
                    {dessert.category}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-serif text-gray-900 mb-2 truncate group-hover:text-brand-500 transition-colors tracking-tight">{dessert.name}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                    {dessert.variants?.slice(0, 2).map(v => (
                        <span key={v.name} className="text-[9px] font-bold bg-brand-50 text-brand-600 border border-brand-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{v.name}: ₹{v.price}</span>
                    ))}
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-50">
                    <button onClick={() => handleEdit(dessert)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                        <Pencil size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(dessert._id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-brand-100"
            >
                <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
                    <X size={24} className="text-gray-400" />
                </button>

                <form onSubmit={handleSubmit} className="p-12">
                    <div className="mb-10">
                        <span className="text-brand-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">Catalog Editor</span>
                        <h2 className="text-4xl font-serif text-gray-900 tracking-tight">{isEditing ? 'Refine' : 'Compose'} Masterpiece</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Side */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Masterpiece Title</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-brand-500 font-bold text-lg transition-all" placeholder="e.g. Midnight Truffle" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Collection</label>
                                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-brand-500 font-bold transition-all">
                                        <option>Cake</option>
                                        <option>Pastry</option>
                                        <option>Cookie</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Base Price (₹)</label>
                                    <input type="number" min="0" required value={formData.basePrice} onChange={(e) => setFormData({...formData, basePrice: e.target.value})} className="w-full p-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-brand-500 font-bold text-lg transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Composition Description</label>
                                <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-brand-500 font-medium h-28 leading-relaxed transition-all" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Sparkles size={12}/> Ingredients</label>
                                    <input type="text" required value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} placeholder="Pure Cocoa, Sea Salt..." className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-medium text-sm transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Info size={12}/> Allergens</label>
                                    <input type="text" required value={formData.allergens} onChange={(e) => setFormData({...formData, allergens: e.target.value})} placeholder="Dairy, Gluten..." className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-medium text-sm transition-all" />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Visual Identity</label>
                                <div className="flex gap-4 p-1.5 bg-gray-100 rounded-2xl w-fit">
                                    <button type="button" onClick={() => setImageSource('upload')} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${imageSource === 'upload' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                        <FileImage size={14} /> File Upload
                                    </button>
                                    <button type="button" onClick={() => setImageSource('url')} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${imageSource === 'url' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                        <LinkIcon size={14} /> Image URL
                                    </button>
                                </div>

                                {imageSource === 'upload' ? (
                                    <div className="relative group cursor-pointer border-2 border-dashed border-gray-100 rounded-[2rem] hover:border-brand-500 transition-all p-2">
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                        <div className="w-full h-52 rounded-[1.5rem] flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
                                            {imagePreview && imageSource === 'upload' ? (
                                                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-10 h-10 text-gray-200 mb-3" strokeWidth={1} />
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Artisan Photo</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <input 
                                            type="text" 
                                            placeholder="Paste high-res image URL here..." 
                                            value={formData.imageUrl}
                                            onChange={(e) => {
                                                setFormData({...formData, imageUrl: e.target.value, image: null});
                                                setImagePreview(e.target.value);
                                            }}
                                            className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-medium text-sm transition-all"
                                        />
                                        {formData.imageUrl && (
                                            <div className="w-full h-44 rounded-2xl overflow-hidden border border-brand-50">
                                                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="URL Preview" onError={() => toast.error("Invalid link")} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Yield / Serving Size</label>
                                <input type="text" required value={formData.servingSize} onChange={(e) => setFormData({...formData, servingSize: e.target.value})} placeholder="e.g. 8-10 Members" className="w-full p-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-brand-500 font-bold transition-all" />
                            </div>

                            <div className="bg-brand-50 p-8 rounded-[2rem] border border-brand-100 shadow-inner">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-black text-brand-900 uppercase tracking-widest text-[9px]">Custom Sizing</h4>
                                    <button type="button" onClick={handleAddVariant} className="text-brand-600 font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:text-brand-800 transition-colors">
                                        <Plus size={14} /> New Variant
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.variants.map((v, i) => (
                                        <div key={i} className="flex gap-3 items-center animate-in fade-in slide-in-from-right-4">
                                            <input placeholder="Size" value={v.name} onChange={(e) => {
                                                const newV = [...formData.variants];
                                                newV[i].name = e.target.value;
                                                setFormData({...formData, variants: newV});
                                            }} className="flex-grow p-3.5 bg-white rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-brand-500" />
                                            <div className="relative w-28">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300 font-bold text-xs">₹</span>
                                                <input type="number" min="0" placeholder="Price" value={v.price} onChange={(e) => {
                                                    const newV = [...formData.variants];
                                                    newV[i].price = e.target.value;
                                                    setFormData({...formData, variants: newV});
                                                }} className="w-full p-3.5 pl-7 bg-white rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-brand-500" />
                                            </div>
                                            <button type="button" onClick={() => handleRemoveVariant(i)} className="p-2 text-red-300 hover:text-red-500 transition-colors"><X size={18} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-inner">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-black text-gray-900 uppercase tracking-widest text-[9px]">Dietary Modifiers</h4>
                                    <button type="button" onClick={handleAddModifier} className="text-gray-600 font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                        <Plus size={14} /> New Option
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.modifiers.map((m, i) => (
                                        <div key={i} className="flex gap-3 items-center animate-in fade-in slide-in-from-right-4">
                                            <input placeholder="e.g. Sugar-Free" value={m.name} onChange={(e) => {
                                                const newM = [...formData.modifiers];
                                                newM[i].name = e.target.value;
                                                setFormData({...formData, modifiers: newM});
                                            }} className="flex-grow p-3.5 bg-white rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-brand-500" />
                                            <div className="relative w-28">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-xs">+</span>
                                                <input type="number" min="0" placeholder="Extra" value={m.extraPrice} onChange={(e) => {
                                                    const newM = [...formData.modifiers];
                                                    newM[i].extraPrice = e.target.value;
                                                    setFormData({...formData, modifiers: newM});
                                                }} className="w-full p-3.5 pl-7 bg-white rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-brand-500" />
                                            </div>
                                            <button type="button" onClick={() => handleRemoveModifier(i)} className="p-2 text-red-300 hover:text-red-500 transition-colors"><X size={18} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" disabled={loading} className="btn-elegant w-full py-6 text-lg rounded-3xl shadow-2xl shadow-brand-500/20">
                                    {loading ? 'Processing...' : (isEditing ? 'Update Collection' : 'Commit to Catalog')}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageDesserts;
