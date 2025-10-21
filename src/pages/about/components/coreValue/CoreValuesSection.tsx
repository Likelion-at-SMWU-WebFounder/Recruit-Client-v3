import SubTitle from '@shared/components/SubTitle';
import CoreValueCard from '@pages/about/components/coreValue/CoreValueCard';
import { SUB_TITLE } from '@pages/about/constants/about';
import { CORE_VALUE_DATA } from '@pages/about/constants/coreValue';

const CoreValuesSection = () => {
  return (
    <div className="bg-white py-[6.25rem] md:py-[15.5rem] lg:py-[10.25rem]">
      <SubTitle subTitle={SUB_TITLE.CORE_VALUE} subDescription={SUB_TITLE.CORE_VALUE_DESCRIPTION} />
      <div className="flex justify-center md:mt-[6.25rem] lg:mt-[5rem]">
        <div className="hidden md:grid md:grid-cols-3 md:gap-[1rem] lg:gap-[1.5rem]">
          {CORE_VALUE_DATA.map((data) => (
            <CoreValueCard
              key={data.keyword}
              keyword={data.keyword}
              description={data.description}
              cardImage={data.image}
              highlightedWord={data.highlightedWord}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValuesSection;
