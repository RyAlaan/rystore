const IncDec = (
  value: number,
  props: { increase: () => void; decrease: () => void }
) => {
  return (
    <div className="flex flex-row rounded-md overflow-hidden">
      <button
        className="py-2 px-3 border hover:border-secondary hover:text-white hover:bg-secondary"
        onClick={props.decrease}
      >
        -
      </button>
      <div className="py-2 px-6 border-y">
        <p>{value}</p>
      </div>
      <button
        className="py-2 px-3 border hover:border-secondary hover:text-white hover:bg-secondary"
        onClick={props.increase}
      >
        +
      </button>
    </div>
  );
};

export default IncDec;
