import WebFoundersCard from '@pages/webFounders/components/WebFoundersCard';

interface Founder {
  id: number;
  name: string;
  no: string;
  part: string;
  image: string;
  responsibilities: string;
}

const WebFoundersSection = ({ title, founders }: { title: string; founders: Founder[] }) => {
  return (
    <div className="space-y-[2.5rem]">
      <div className="text-navyblack text-[1.375rem] leading-[170%] font-bold md:text-[1.875rem] lg:text-[2.625rem]">
        {title}
      </div>

      <div className="grid grid-cols-2 gap-[1rem] md:grid-cols-3 md:gap-[0.8rem] lg:grid-cols-4 lg:gap-[1.5rem]">
        {founders.map((founder) => (
          <WebFoundersCard
            key={founder.id}
            name={founder.name}
            no={founder.no}
            part={founder.part}
            image={founder.image}
            responsibilities={founder.responsibilities}
          />
        ))}
      </div>
    </div>
  );
};

export default WebFoundersSection;
