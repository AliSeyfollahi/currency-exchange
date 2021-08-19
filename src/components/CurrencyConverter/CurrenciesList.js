import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useContext, useEffect, useState } from "react";
import { CurrencyFormContext } from "./CurrencyConverterForm";

export default function CurrenciesList(props) {
  const { currencies } = useContext(CurrencyFormContext);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(props.value)    
  }, [props.value]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleChange = (e, item) => {
    if (props.onChange)
      props.onChange({
        ...e,
        target: {
          name: props.name,
          value: item,
        },
      });
  };

  return (
    <>
      <Autocomplete
        value={props.value ? props.value : null}
        loading={props.loading}
        options={currencies
          .filter((item) =>
            searchValue
              ? item.currency
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) === 0
              : true
          )
          .filter((item, i) => i < 10)}
        autoHighlight
        getOptionLabel={(option) => (option.currency ? option.currency : "")}
        fullWidth
        onChange={handleChange}
        renderOption={(option) => (
          <>
            {/* <Avatar
              src={option.logo_url ? option.logo_url : null}
              alt={option.name}
              className="mr-2 w-5 h-5"
            >
              {option.name[0]}
            </Avatar> */}
            <span className="text-sm">{option.currency}</span>
          </>
        )}
        renderInput={(params) => (
          <TextField
            value={searchValue}
            onChange={handleSearch}
            {...params}
            label={props.inputLabel}
            className="text-capitlized"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            required={props.required && searchValue.length === 0}
          />
        )}
      />
    </>
  );
}
