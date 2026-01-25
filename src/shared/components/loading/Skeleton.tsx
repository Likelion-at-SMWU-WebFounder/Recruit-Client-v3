import SkeletonLoader from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { combineStyles } from '@shared/utils/combineStyles';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
  className?: string;
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
  },
} as const;

const Skeleton = ({
  width,
  height,
  circle = false,
  count = 1,
  className = '',
  baseColor = '#e2e2e2',
  highlightColor = '#f2f2f2',
  containerClassName = '',
}: SkeletonProps) => {
  const containerClass = combineStyles({
    base: [SKELETON_STYLES.container.base, containerClassName].filter(Boolean).join(' '),
  });

  const skeletonClass = [SKELETON_STYLES.skeleton.base, className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <SkeletonLoader
        width={width}
        height={height}
        circle={circle}
        count={count}
        className={skeletonClass}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
    </div>
  );
};

export default Skeleton;
