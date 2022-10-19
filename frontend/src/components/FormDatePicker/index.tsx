import { DatePicker } from "antd";
import "./styles.sass";

const FormDatePicker = ({
  value,
  toFormat,
  placeholder,
  setValue,
}: {
  value?: moment.Moment | undefined;
  toFormat?: string;
  placeholder?: string;
  setValue: (date: moment.Moment | undefined) => void;
}) => {
  return (
    <div className="date-picker">
      <DatePicker
        format={toFormat || "DD/MM/YYYY"}
        value={value}
        bordered={false}
        onChange={(val) =>
          val ? setValue(val.utc()) : setValue(undefined)
        }
        placeholder={placeholder || "Выберите дату"}
      />
    </div>
  );
};

export default FormDatePicker;
