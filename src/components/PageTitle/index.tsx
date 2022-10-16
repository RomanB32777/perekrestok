import "./styles.sass";

const PageTitle = (prop: {
  title: React.ReactNode;
  notMarginBottom?: boolean;
}) => {
  return (
    <div
      className="page-title"
      style={{
        marginBottom: prop.notMarginBottom ? 0 : 23,
      }}
    >
      <h1>{prop.title}</h1>
    </div>
  );
};

export default PageTitle;
