import { Empty } from "antd";
import "./styles.sass";

const EmptyBlock = ({ description }: { description?: string }) => (
  <div className="empty-block">
    <Empty description={description} />
  </div>
);

export default EmptyBlock;
