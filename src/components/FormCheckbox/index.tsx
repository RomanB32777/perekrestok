import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import "./styles.sass";

const FormCheckbox = ({
  checked,
  label,
  setValue,
}: {
  checked: boolean;
  label: React.ReactNode;
  setValue?: (date: boolean) => void;
}) => {
  return (
    <div className="form-checkbox">
      <Checkbox
        checked={checked}
        onChange={(e: CheckboxChangeEvent) => setValue && setValue(e.target.checked)}
      >
        <span className="checkbox-text">{label}</span>
      </Checkbox>
    </div>
  );
};

export default FormCheckbox;
