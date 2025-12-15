interface FilterButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}
const FilterButton = ({ children, onClick, active }: FilterButtonProps) => {
  const activeClasses = 'bg-blue text-white font-semibold';
  const inactiveClasses = 'bg-white text-gray font-medium';
  const hoverClasses = 'hover:border-blue hover:text-blue transition-all duration-300 ease-in-out';
  return (
    <button
      type="button"
      className={`${!active ? hoverClasses : ''} flex-shrink-0 cursor-pointer rounded-full border-[1.5px] border-transparent px-[1.25rem] py-[0.5rem] text-[1rem] leading-[170%] md:px-[2rem] md:text-[1.25rem] lg:px-[2.25rem] lg:text-[2rem] ${active ? activeClasses : inactiveClasses}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default FilterButton;
