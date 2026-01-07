import { ACTIVITY_DATA } from '@pages/home/constants/activity';

const DESKTOP_TABLET_ACTIVITY_CARD_CLASSES = 'hidden md:inline-flex md:flex-col';
const MOBILE_ACTIVITY_CARD_CLASSES = 'md:hidden inline-flex flex-col';

interface ActivityTextCardProps {
  type: 'hackathon' | 'seminar';
}

export const ActivityTextCard = ({ type }: ActivityTextCardProps) => {
  const data = ACTIVITY_DATA[type];

  return (
    <>
      {/* 데스크탑, 태블릿 */}
      <div className={DESKTOP_TABLET_ACTIVITY_CARD_CLASSES}>
        <img src={data.icon} alt={type} />
        <div className="">{data.title}</div>
        <div className="">{data.description}</div>
      </div>

      {/* 모바일 */}
      <div className={MOBILE_ACTIVITY_CARD_CLASSES}>
        <div className="">{data.title}</div>
        <div className="">{data.description}</div>
      </div>
    </>
  );
};

export const ActivityImageCard = ({ type }: ActivityTextCardProps) => {
  const data = ACTIVITY_DATA[type];

  return <img className="" src={data.image} alt={data.title} />;
};
