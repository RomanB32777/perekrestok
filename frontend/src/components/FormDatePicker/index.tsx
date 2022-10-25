import { DatePicker } from "antd";

import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

import "./styles.sass";

const FormDatePicker = ({
  value,
  toFormat,
  placeholder,
  maxDate,
  showToday,
  setValue,
}: {
  value?: moment.Moment | undefined;
  toFormat?: string;
  placeholder?: string;
  maxDate?: moment.Moment;
  showToday?: boolean;
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
        disabledDate={(d) => !d || d.isAfter(maxDate)}
        defaultPickerValue={maxDate}
        locale={locale}
        showToday={showToday}
      />
    </div>
  );
};

export default FormDatePicker;
