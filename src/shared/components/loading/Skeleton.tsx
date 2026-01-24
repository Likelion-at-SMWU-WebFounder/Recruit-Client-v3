import SkeletonLoader from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { combineStyles } from '@shared/utils/combineStyles';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
  className?: string;
  borderRadius?: string;
  baseColor?: string;
  highlightColor?: string;
  containerClassName?: string;
}

// 스켈레톤 스타일 상수화
const SKELETON_STYLES = {
  container: {
    base: 'w-full h-full',
  },
  skeleton: {
    base: 'w-full h-full',
    rounded: 'rounded-[0.75rem]',
    tablet: 'md:rounded-[1rem]',
    desktop: 'lg:rounded-[1.25rem]',
  },
} as const;

const Skeleton = ({
  width,
  height,
  circle = false,
  count = 1,
  className = '',
  borderRadius,
  baseColor = '#e2e2e2',
  highlightColor = '#f2f2f2',
  containerClassName = '',
}: SkeletonProps) => {
  const containerClass = combineStyles({
    base: [SKELETON_STYLES.container.base, containerClassName].filter(Boolean).join(' '),
  });

  const skeletonClass = [
    SKELETON_STYLES.skeleton.base,
    !circle && !borderRadius ? SKELETON_STYLES.skeleton.rounded : '',
    !circle && !borderRadius ? SKELETON_STYLES.skeleton.tablet : '',
    !circle && !borderRadius ? SKELETON_STYLES.skeleton.desktop : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <SkeletonLoader
        width={width}
        height={height}
        circle={circle}
        count={count}
        className={skeletonClass}
        borderRadius={borderRadius}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
    </div>
  );
};

export default Skeleton;
