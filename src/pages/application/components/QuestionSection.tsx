import { QUESTIONS } from '../constants/index';

interface QuestionSectionProps {
  answers: { [key: string]: string };
  onAnswerChange: (questionId: string, value: string) => void;
}

const QuestionSection = ({ answers, onAnswerChange }: QuestionSectionProps) => {
  return (
    <section className="flex flex-col gap-8">
      {QUESTIONS.slice(0, 7).map((question) => (
        <div key={question.id} className="flex flex-col gap-3">
          <label className="text-[0.875rem] leading-[160%] font-medium text-[#1B2634] md:text-[1rem]">
            {question.number}. {question.question}
          </label>
          <textarea
            placeholder={question.placeholder}
            value={answers[question.id] || ''}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="min-h-[8rem] resize-none rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] px-4 py-3 text-[0.875rem] text-[#1B2634] placeholder:text-[#899099] focus:border-[#4284FF] focus:outline-none md:min-h-[10rem] md:text-[1rem]"
          />
        </div>
      ))}
    </section>
  );
};

export default QuestionSection;
