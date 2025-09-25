'use client';

import { motion, Variants } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  transition?: object;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const MotionWrapper = ({
  children,
  className = '',
  variants = defaultVariants,
  transition = { duration: 0.8 },
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;