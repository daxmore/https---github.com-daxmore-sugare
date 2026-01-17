import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard;