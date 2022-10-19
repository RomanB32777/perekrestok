import CountryPhoneInput, {
  CountryPhoneInputValue,
  ConfigProvider,
} from "antd-country-phone-input";
import ru from "world_countries_lists/data/countries/ru/world.json";
import "./styles.sass";

// {"id":643,"alpha2":"ru","alpha3":"rus","name":"Россия"},
// {"id":112,"alpha2":"by","alpha3":"blr","name":"Белоруссия"},
// {"id":804,"alpha2":"ua","alpha3":"ukr","name":"Украина"},
// {"id":860,"alpha2":"uz","alpha3":"uzb","name":"Узбекистан"},
// {"id":762,"alpha2":"tj","alpha3":"tjk","name":"Таджикистан"},
// {"id":417,"alpha2":"kg","alpha3":"kgz","name":"Киргизия"},

const PhoneInput = ({
  value,
  setValue,
}: {
  value: CountryPhoneInputValue;
  setValue: (value: CountryPhoneInputValue) => void;
}) => {
  return (
    <div className="phone-input">
      <ConfigProvider locale={ru}>
        <CountryPhoneInput
          type="tel"
          value={value}
          onChange={(newValue) => {
            newValue.code !== value.code
              ? setValue({ ...newValue, phone: `+${newValue.code}` })
              : setValue({
                  ...newValue,
                  phone: newValue.phone?.replace(/[^0-9+]/g, ""),
                });
          }}
          onFocus={() =>
            typeof value.phone === "string" &&
            value.phone.length <= String(value.code).length &&
            setValue({ ...value, phone: `+${value.code}` })
          }
          placeholder="Номер телефона"
        />
      </ConfigProvider>
    </div>
  );
};

export default PhoneInput;
