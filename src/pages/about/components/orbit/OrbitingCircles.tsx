import React from 'react';

import { cn } from '@/pages/about/utils/utils';

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  lineTransparency?: string;
}

export const OrbitingCircles = ({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  speed = 0.5,
  lineTransparency = '10',
  ...props
}: OrbitingCirclesProps) => {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full">
          <circle
            className="stroke-blue stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            style={{ opacity: Number(lineTransparency) / 100 }}
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                '--duration': calculatedDuration,
                '--radius': radius,
                '--angle': angle,
              } as React.CSSProperties
            }
            className={cn(
              `animate-orbit absolute top-1/2 left-1/2 flex size-[0.7rem] transform-gpu items-center justify-center rounded-full md:size-[1.25rem]`,
              { '[animation-direction:reverse]': reverse },
              className
            )}
            {...props}>
            {child}
          </div>
        );
      })}
    </>
  );
};
