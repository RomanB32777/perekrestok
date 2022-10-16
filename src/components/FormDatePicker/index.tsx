import { DatePicker } from "antd";
import "./styles.sass";

const FormDatePicker = ({
  toFormat,
  placeholder,
  setValue,
}: {
  toFormat?: string;
  placeholder?: string;
  setValue: (date: string) => void;
}) => {
  return (
    <div className="date-picker">
      <DatePicker
        format={toFormat || "DD/MM/YYYY"}
        bordered={false}
        onChange={(val) =>
          val ? setValue(val.format(toFormat || "DD/MM/YYYY")) : setValue("")
        }
        placeholder={placeholder || "Выберите дату"}
      />
    </div>
  );
};

export default FormDatePicker;
