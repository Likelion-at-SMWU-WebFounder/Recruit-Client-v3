import { ACTIVITY_DATA } from '@pages/home/constants/activity';

const DESKTOP_TABLET_ACTIVITY_TEXT_CARD_CLASSES =
  'hidden rounded-[1.25rem] bg-[navydark/20] md:inline-flex md:items-center md:justify-center md:w-[13rem] md:h-[27rem]';
const MOBILE_ACTIVITY_TEXT_CARD_CLASSES =
  'md:hidden inline-flex items-center pt-[1rem] gap-[2rem] w-[6.5rem] h-[6.8rem]';
interface ActivityCardProps {
  type: 'hackathon' | 'seminar';
}

export const ActivityTextCard = ({ type }: ActivityCardProps) => {
  const activity = ACTIVITY_DATA[type];

  return (
    <>
      {/* 데스크탑, 태블릿 */}
      <div className={DESKTOP_TABLET_ACTIVITY_TEXT_CARD_CLASSES}>
        <img src={activity.icon} alt={type} />
        <div className="text-[1.125rem] font-medium">{activity.title}</div>
        <div>{activity.description}</div>
      </div>

      {/* 모바일 */}
      <div
        className={`${MOBILE_ACTIVITY_TEXT_CARD_CLASSES} ${type === 'hackathon' ? 'bg-blue text-white' : 'text-navyblack bg-white'}`}>
        <div className="text-[1.125rem] font-medium">{activity.title}</div>
      </div>
    </>
  );
};

export const ActivityImageCard = ({ type }: ActivityCardProps) => {
  const activity = ACTIVITY_DATA[type];

  return <img src={activity.image} alt={activity.title} />;
};

const ACTIVITY_CARD_CONTAINER_CLASSES = 'inline-flex gap-[1.5rem]';
export const ActivityCardContainer = ({ type }: ActivityCardProps) => {
  return (
    <div className={ACTIVITY_CARD_CONTAINER_CLASSES}>
      <ActivityImageCard type={type} />
      <ActivityTextCard type={type} />
    </div>
  );
};
