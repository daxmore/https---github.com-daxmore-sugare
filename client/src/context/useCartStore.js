import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      
      setCoupon: (coupon) => set({ appliedCoupon: coupon }),
      clearCoupon: () => set({ appliedCoupon: null }),

      addItem: (dessert, variant, modifiers, quantity, customText, specialInstructions) => {
        const cartItems = get().items;
        
        // Calculate item subtotal
        let subtotal = variant.price * quantity;
        modifiers.forEach(mod => {
          subtotal += mod.extraPrice * quantity;
        });

        const newItem = {
          cartId: Math.random().toString(36).substr(2, 9), // Unique ID for this specific customization
          dessertId: dessert._id,
          name: dessert.name,
          image: dessert.thumbnail || dessert.image,
          variant,
          modifiers,
          quantity,
          customText,
          specialInstructions,
          subtotal
        };

        set({ items: [...cartItems, newItem] });
      },

      removeItem: (cartId) => {
        set({ items: get().items.filter(item => item.cartId !== cartId) });
      },

      updateQuantity: (cartId, newQuantity) => {
        if (newQuantity < 1) return;
        set({
          items: get().items.map(item => {
            if (item.cartId === cartId) {
              const unitPrice = item.subtotal / item.quantity;
              return { 
                ...item, 
                quantity: newQuantity, 
                subtotal: unitPrice * newQuantity 
              };
            }
            return item;
          })
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.subtotal, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'dessert-cart-storage',
    }
  )
);

export default useCartStore;
