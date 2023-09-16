
const SectionTitle = (props :{children : string}) => {
    const {children} = props

  return (
    <div className="flex flex-row items-center gap-x-2">
      <div className="bg-secondary text-secondary w-fit p-1 rounded">I</div>
      <p className="text-md font-semibold text-secondary">{children}</p>
    </div>
  );
};


export default SectionTitle