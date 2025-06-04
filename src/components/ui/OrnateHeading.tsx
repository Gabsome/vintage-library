import React, { ReactNode } from 'react';

interface OrnateHeadingProps {
  children: ReactNode;
  className?: string;
  center?: boolean;
}

export const OrnateHeading: React.FC<OrnateHeadingProps> = ({ 
  children, 
  className = '', 
  center = false 
}) => {
  return (
    <div className={`relative ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-900 inline-block relative z-10">
        {children}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold-900"></span>
      </h2>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[130%] -z-10 opacity-10 bg-[url('https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-no-repeat bg-contain"></div>
    </div>
  );
};