const Count = (props: { title: string; value: string }) => {
  const { title, value } = props;

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-md font-bold">{title}</h4>
      <p className="text-md text-black font-semibold">{value}</p>
    </div>
  );
};

export default Count;
