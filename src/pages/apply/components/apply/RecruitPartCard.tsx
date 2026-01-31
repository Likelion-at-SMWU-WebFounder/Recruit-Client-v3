import { RECRUIT_PARTS } from '../../constants/index';
import { cx } from '../../utils/cx';
import type { TwTokens } from '../../styles/recruitPartSection.styles';

export type RecruitPartCardVariant = 'mobile' | 'folded' | 'expanded';

interface RecruitPartCardProps {
  partIndex: number;
  variant: RecruitPartCardVariant;
  isActive?: boolean;
  slideTransform?: string;
  TW: TwTokens;
  images: readonly string[];
  isExpanded?: boolean;
  rotation?: number;
}

const foldedGradByIndex = ['gradB', 'gradA', 'gradC'] as const;
const foldedImgPosByIndex = ['imgFoldedLeft', 'imgFoldedCenter', 'imgFoldedCenter'] as const;

const RecruitPartCard = ({
  partIndex,
  variant,
  isActive,
  slideTransform,
  TW,
  images,
  isExpanded,
  rotation,
}: RecruitPartCardProps) => {
  const part = RECRUIT_PARTS[partIndex];

  if (variant === 'mobile') {
    return (
      <div
        className={cx(TW.mobileSlideBase, isActive ? TW.mobileSlideActive : TW.mobileSlideIdle)}
        style={{ transform: slideTransform }}>
        <div className={cx('relative', TW.cardBase, TW.cardSizeMobile, isActive ? TW.gradA : TW.gradC)}>
          <div className={TW.textWrap}>
            <h3 className={TW.titleMobile}>{part.title}</h3>
            <p className={TW.skillsMobile}>{part.skills}</p>
            <p className={TW.descMobile}>{part.description}</p>
            <p className={TW.ctaMobile}>{part.cta}</p>
          </div>

          <img src={images[partIndex]} alt="" className={cx(TW.imgBase, TW.imgMobile)} />
        </div>
      </div>
    );
  }

  const gradKey = foldedGradByIndex[partIndex];
  const imgKey = foldedImgPosByIndex[partIndex];

  return (
    <div
      className={cx(
        'relative',
        TW.cardBase,
        TW.cardSizeDesktop,
        isExpanded ? TW.cardExpanded : TW.cardFolded,
        TW[gradKey]
      )}
      style={
        {
          '--r': isExpanded ? 0 : rotation,
          zIndex: isExpanded ? 10 : partIndex === 2 ? 20 : partIndex === 1 ? 10 : 0,
        } as React.CSSProperties
      }>
      <div className={TW.textWrap}>
        <h3 className={TW.titleDesktop}>{part.title}</h3>

        {/* 접혔을 때 스킬 */}
        <p
          className={cx(
            TW.skillsFolded,
            'transition-all duration-300',
            isExpanded ? 'invisible h-0 opacity-0' : 'visible opacity-100'
          )}>
          {part.skills}
        </p>

        {/* 펼쳐졌을 때 상세 내용*/}
        <div
          className={cx(
            'transition-all delay-100 duration-500',
            isExpanded ? 'relative h-auto translate-y-0 opacity-100' : 'h-0 translate-y-4 overflow-hidden opacity-0'
          )}>
          <div className="w-[16.38rem] lg:w-[27.0675rem]">
            <p className={TW.skillsExpanded}>{part.skills}</p>
            <p className={TW.descExpanded}>{part.description}</p>
            <p className={TW.ctaExpanded}>{part.cta}</p>
          </div>
        </div>
      </div>

      <img
        src={images[partIndex]}
        alt=""
        className={cx('absolute transition-all duration-500', TW.imgBase, isExpanded ? TW.imgExpanded : TW[imgKey])}
      />
    </div>
  );
};

export default RecruitPartCard;
