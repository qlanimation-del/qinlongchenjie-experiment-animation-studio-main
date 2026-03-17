import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

const AnimatedSection = ({ children, className = "", threshold }: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(threshold);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
