import React from 'react';

const QuantityControl = ({ quantity, onIncrease, onDecrease, onDirectChange, max = 99 }) => {
    return (
        <div className="flex items-center">
            <button
                onClick={onDecrease}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-l-lg bg-base-200 text-base-content border border-base-300 hover:bg-base-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            </button>

            <input
                type="number"
                min="1"
                max={max}
                value={quantity}
                onChange={(e) => onDirectChange(parseInt(e.target.value) || 1)}
                className="w-12 h-10 text-center border-y border-base-300 bg-base-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
                onClick={onIncrease}
                disabled={quantity >= max}
                className="w-10 h-10 flex items-center justify-center rounded-r-lg bg-base-200 text-base-content border border-base-300 hover:bg-base-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default QuantityControl;