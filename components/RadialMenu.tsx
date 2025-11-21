import React, { useState, useEffect, useRef } from 'react';
import { NavItem, Page } from '../types';
import { X } from 'lucide-react';

interface Props {
  items: NavItem[];
  activeId: Page;
  onSelect: (id: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const RadialMenu: React.FC<Props> = ({ items, activeId, onSelect, isOpen, onClose }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menu Configuration
  const radius = 180;
  const innerRadius = 60;
  const center = 200; // SVG Viewbox center (400x400)
  
  const totalItems = items.length;
  const sliceAngle = 360 / totalItems;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Helper to calculate SVG path points
  const getPointOnCircle = (angleInDegrees: number, r: number) => {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(angleInRadians),
      y: center + r * Math.sin(angleInRadians),
    };
  };

  const createSlicePath = (index: number) => {
    const startAngle = index * sliceAngle;
    const endAngle = (index + 1) * sliceAngle;
    
    // Minimal gap
    const gap = 0.5; 
    
    const p1 = getPointOnCircle(startAngle + gap, innerRadius);
    const p2 = getPointOnCircle(startAngle + gap, radius);
    const p3 = getPointOnCircle(endAngle - gap, radius);
    const p4 = getPointOnCircle(endAngle - gap, innerRadius);

    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${radius} ${radius} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${innerRadius} ${innerRadius} 0 0 0 ${p1.x} ${p1.y} Z`;
  };

  // Calculate icon positions
  const getIconPosition = (index: number) => {
    const midAngle = (index * sliceAngle) + (sliceAngle / 2);
    const iconRadius = (radius + innerRadius) / 2;
    return getPointOnCircle(midAngle, iconRadius);
  };

  const activeItem = hoveredIndex !== null ? items[hoveredIndex] : items.find(i => i.id === activeId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c0b]/80 backdrop-blur-sm transition-opacity duration-500">
      <div ref={menuRef} className="relative w-[400px] h-[400px] animate-in fade-in zoom-in duration-500">
        
        {/* Subtle Background Glow - Gold/Green */}
        <div className="absolute inset-0 rounded-full bg-[#c5a059]/5 blur-3xl -z-10"></div>

        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#856834" />
            </linearGradient>
          </defs>

          {/* Outer Ring Decoration */}
          <circle cx={center} cy={center} r={radius + 5} fill="none" stroke="#c5a059" strokeWidth="1" opacity="0.2" />

          {/* Render Slices */}
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isActive = item.id === activeId;
            const path = createSlicePath(index);
            
            return (
              <g 
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  onSelect(item.id);
                  onClose();
                }}
                className="cursor-pointer transition-all duration-300"
                style={{ transformOrigin: 'center' }}
              >
                {/* Slice Shape */}
                <path
                  d={path}
                  fill={isActive ? '#142018' : isHovered ? '#1f2e25' : '#0f1210'}
                  fillOpacity="0.95"
                  stroke={isActive ? '#c5a059' : '#2f3832'}
                  strokeWidth={isActive ? 1.5 : 0.5}
                  className="transition-all duration-300 ease-out"
                />
              </g>
            );
          })}

          {/* Render Icons and Text */}
          {items.map((item, index) => {
            const pos = getIconPosition(index);
            const isHovered = hoveredIndex === index;
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <g 
                key={`icon-${item.id}`} 
                className="pointer-events-none"
                transform={`translate(${pos.x}, ${pos.y})`}
              >
                <foreignObject x="-20" y="-20" width="40" height="40">
                  <div className={`flex items-center justify-center w-full h-full transition-colors duration-500 ${isActive || isHovered ? 'text-[#c5a059]' : 'text-[#52525b]'}`}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                </foreignObject>
                {/* Label */}
                {(isHovered || isActive) && (
                  <text 
                    y="30" 
                    textAnchor="middle" 
                    className="text-[9px] font-bold uppercase tracking-[0.2em] fill-[#e5e5e5] rpg-font"
                  >
                    {item.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Center Hub - The One Ring / Eye concept but minimal */}
          <circle cx={center} cy={center} r={innerRadius - 4} fill="#0a0c0b" stroke="#c5a059" strokeWidth="1" opacity="0.5" />
          <circle cx={center} cy={center} r={innerRadius - 10} fill="none" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" className="animate-[spin_10s_linear_infinite]" style={{transformOrigin: 'center'}} />
          
          {/* Center Content */}
          <foreignObject x={center - 40} y={center - 40} width="80" height="80" className="pointer-events-none">
             <div className="flex flex-col items-center justify-center h-full text-center">
                {activeItem ? (
                   <div className="animate-in fade-in zoom-in duration-300">
                      <span className="block w-1 h-1 bg-[#c5a059] rounded-full mb-2 mx-auto"></span>
                      <span className="text-[8px] text-[#a8a29e] uppercase tracking-widest font-serif italic">{activeItem.description}</span>
                   </div>
                ) : (
                   <X className="text-[#2f3832]" size={16} />
                )}
             </div>
          </foreignObject>

        </svg>
        
      </div>
    </div>
  );
};

export default RadialMenu;