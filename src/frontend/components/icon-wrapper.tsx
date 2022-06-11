import React from "react";

type IconWrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export const IconWrapper = ({ children, className }: IconWrapperProps) => {
  return (
    <div className="cursor-pointer w-8 h-8 rounded-lg hover:bg-gray-100 flex justify-center items-center">
      {children}
    </div>
  );
};
