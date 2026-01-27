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
}

const foldedGradByIndex = ['gradB', 'gradA', 'gradC'] as const;
const foldedImgPosByIndex = ['imgFoldedLeft', 'imgFoldedCenter', 'imgFoldedCenter'] as const;
const foldedPosByIndex = ['left', 'center', 'right'] as const;

const RecruitPartCard = ({ partIndex, variant, isActive, slideTransform, TW, images }: RecruitPartCardProps) => {
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

  if (variant === 'folded') {
    const posKey = foldedPosByIndex[partIndex];
    const gradKey = foldedGradByIndex[partIndex];
    const imgKey = foldedImgPosByIndex[partIndex];

    return (
      <div className={cx(TW.foldedPos[posKey], TW.cardBase, TW.cardSizeDesktop, TW[gradKey])}>
        <h3 className={TW.titleDesktop}>{part.title}</h3>
        <p className={TW.skillsFolded}>{part.skills}</p>
        <img src={images[partIndex]} alt="" className={cx('absolute', TW.imgBase, TW[imgKey])} />
      </div>
    );
  }

  // expanded
  return (
    <div className={cx('relative', TW.cardBase, TW.cardSizeDesktop, TW.gradB)}>
      <div className={TW.textWrap}>
        <h3 className={TW.titleDesktop}>{part.title}</h3>
        <p className={TW.skillsExpanded}>{part.skills}</p>
        <p className={TW.descExpanded}>{part.description}</p>
        <p className={TW.ctaExpanded}>{part.cta}</p>
      </div>

      <img src={images[partIndex]} alt="" className={cx('absolute', TW.imgBase, TW.imgExpanded)} />
    </div>
  );
};

export default RecruitPartCard;
