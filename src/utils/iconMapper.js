import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Home,
  Heart,
  Tv,
  Plane,
  BookOpen,
  Briefcase,
  TrendingUp,
  Gift,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';

// Map icon names to Lucide components
const ICON_MAP = {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Home,
  Heart,
  Tv,
  Plane,
  BookOpen,
  Briefcase,
  TrendingUp,
  Gift,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
};

/**
 * Get a Lucide icon component by name
 * @param {string} iconName - Name of the icon (e.g., 'UtensilsCrossed')
 * @returns {React.Component} Icon component
 */
export const getIconComponent = (iconName) => {
  return ICON_MAP[iconName] || Gift; // Default to Gift icon if not found
};

/**
 * Render a Lucide icon with standard props
 * @param {string} iconName - Name of the icon
 * @param {number} size - Icon size in pixels
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} Icon component
 */
export const renderIcon = (iconName, size = 20, className = '') => {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent size={size} className={`stroke-2 ${className}`} />;
};

export default ICON_MAP;
