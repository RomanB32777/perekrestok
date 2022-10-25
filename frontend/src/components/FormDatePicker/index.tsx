import { DatePicker } from "antd";
import "./styles.sass";

const FormDatePicker = ({
  value,
  toFormat,
  placeholder,
  maxDate,
  setValue,
}: {
  value?: moment.Moment | undefined;
  toFormat?: string;
  placeholder?: string;
  maxDate?: moment.Moment;
  setValue: (date: moment.Moment | undefined) => void;
}) => {
  return (
    <div className="date-picker">
      <DatePicker
        format={toFormat || "DD/MM/YYYY"}
        value={value}
        bordered={false}
        onChange={(val) => (val ? setValue(val.utc()) : setValue(undefined))}
        placeholder={placeholder || "Выберите дату"}
        disabledDate={
          (d) => !d || d.isAfter(maxDate)
        }
        defaultPickerValue={maxDate}
      />
    </div>
  );
};

export default FormDatePicker;
