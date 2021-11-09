import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

function Select(props: any) {
  const {
    multiple,
    label,
    labelMap = 'label',
    valueMap = 'value',
    options,
    value: valueFp,
    onChange: onChangeFp,
    getOptionLabel: getOptionLabelFp,
    renderOption: renderOptionFp,
    disableCloseOnSelect: disableCloseOnSelectFp,
    ...restProps
  } = props;

  const valueList = React.useMemo(() => {
    if (!options?.length) return [];
    return options.map((item: any) => {
      const value = typeof item === 'object' ? item[valueMap] : item;
      return value;
    });
  }, [options]);

  const valueMapItem = React.useMemo(() => {
    const result: any = {};
    if (!options?.length) return result;
    options.forEach((item: any) => {
      if (typeof item === 'object') {
        result[item[valueMap]] = item;
      } else {
        result[item] = item;
      }
    });
    return result;
  }, [options]);

  const valueProp = React.useMemo(() => {
    if ('value' in props) {
      const value =
        valueFp === undefined ? (multiple === true ? [] : null) : valueFp;
      return { value };
    }
    return {};
  }, [valueFp]);

  const disableCloseOnSelect = React.useMemo(() => {
    if ('disableCloseOnSelect' in props) return disableCloseOnSelectFp;
    return !!multiple;
  }, [disableCloseOnSelectFp]);

  function onChange(e: any, newValue: any) {
    if (onChangeFp) return onChangeFp(newValue, e);
  }

  function getOptionLabel(value: any) {
    const option = valueMapItem[value] || {};
    if (getOptionLabelFp) return getOptionLabelFp(option);
    return option[labelMap];
  }

  function renderOption(props: any, value: any, changedInfo: any) {
    const option = valueMapItem[value];
    if (renderOptionFp) return renderOptionFp(props, option, changedInfo);
    return <li {...props}>{getOptionLabel(value)}</li>;
  }

  return (
    <Autocomplete
      multiple={multiple}
      disableCloseOnSelect={disableCloseOnSelect}
      options={valueList}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      {...valueProp}
      onChange={onChange}
      renderInput={(params) => (
        <TextField label={label} variant="outlined" {...params} />
      )}
      {...restProps}
    />
  );
}

export default Select;
