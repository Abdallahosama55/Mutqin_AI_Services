const ListDropDown = ({ options, isImportImage }) => {
  return (
    <div
      className="position-absolute translate-middle z-3 top-100 mt-3 start-0 rounded-3 border overflow-hidden  drop-down border bg-light"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      {options.map(({ value }, index) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
};

export default ListDropDown;
