import { AGREEMENT_INFO } from '../constants/index';

interface AgreementSectionProps {
  agreements: {
    infoCollection: boolean;
    photoUsage: boolean;
    eventParticipation: boolean;
  };
  onAgreementChange: (field: 'infoCollection' | 'photoUsage' | 'eventParticipation', checked: boolean) => void;
}

const AgreementSection = ({ agreements, onAgreementChange }: AgreementSectionProps) => {
  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-[1.125rem] font-semibold text-[#1B2634] md:text-[1.25rem]">정보 수집</h3>

      {/* 개인정보 수집 동의 */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[0.875rem] font-semibold text-[#1B2634] md:text-[1rem]">
          {AGREEMENT_INFO.infoCollection.title}
        </h4>
        <p className="rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] p-4 text-[0.75rem] leading-[170%] whitespace-pre-line text-[rgba(27,38,52,0.7)] md:text-[0.875rem]">
          {AGREEMENT_INFO.infoCollection.content}
        </p>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreements.infoCollection}
            onChange={(e) => onAgreementChange('infoCollection', e.target.checked)}
            className="h-4 w-4 accent-[#4284FF]"
          />
          <span className="text-[0.875rem] text-[#1B2634] md:text-[1rem]">
            {AGREEMENT_INFO.infoCollection.checkbox}
          </span>
        </label>
      </div>

      {/* 사진 사용 동의 */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[0.875rem] font-semibold text-[#1B2634] md:text-[1rem]">
          {AGREEMENT_INFO.photoUsage.title}
        </h4>
        <p className="rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] p-4 text-[0.75rem] leading-[170%] whitespace-pre-line text-[rgba(27,38,52,0.7)] md:text-[0.875rem]">
          {AGREEMENT_INFO.photoUsage.content}
        </p>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreements.photoUsage}
            onChange={(e) => onAgreementChange('photoUsage', e.target.checked)}
            className="h-4 w-4 accent-[#4284FF]"
          />
          <span className="text-[0.875rem] text-[#1B2634] md:text-[1rem]">{AGREEMENT_INFO.photoUsage.checkbox}</span>
        </label>
      </div>

      {/* 행사 참여 동의 */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[0.875rem] font-semibold text-[#1B2634] md:text-[1rem]">
          {AGREEMENT_INFO.eventParticipation.title}
        </h4>
        <p className="rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] p-4 text-[0.75rem] leading-[170%] whitespace-pre-line text-[rgba(27,38,52,0.7)] md:text-[0.875rem]">
          {AGREEMENT_INFO.eventParticipation.content}
        </p>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreements.eventParticipation}
            onChange={(e) => onAgreementChange('eventParticipation', e.target.checked)}
            className="h-4 w-4 accent-[#4284FF]"
          />
          <span className="text-[0.875rem] text-[#1B2634] md:text-[1rem]">
            {AGREEMENT_INFO.eventParticipation.checkbox}
          </span>
        </label>
      </div>
    </section>
  );
};

export default AgreementSection;
