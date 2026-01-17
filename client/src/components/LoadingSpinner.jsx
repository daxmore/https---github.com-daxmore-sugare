import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const dotVariants = {
        initial: {
            y: 0,
            opacity: 0.5
        },
        animate: {
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
            transition: {
                repeat: Infinity,
                duration: 1
            }
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center gap-2 py-12"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div
                className="w-3 h-3 rounded-full bg-primary"
                variants={dotVariants}
            />
            <motion.div
                className="w-3 h-3 rounded-full bg-primary"
                variants={dotVariants}
            />
            <motion.div
                className="w-3 h-3 rounded-full bg-primary"
                variants={dotVariants}
            />
        </motion.div>
    );
};

export default LoadingSpinner;