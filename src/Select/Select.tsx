type RenderOptionsState = {
  selected: boolean;
  inputValue: string | undefined;
};
type Option = { [prop: string]: any };
type OptionValue = string | number;

export interface SelectProps {
  allowClear?: boolean;
  clearIcon?: any;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;
  defaultValue?: string | number | string[] | number[] | [];
  disabled?: boolean;
  disableCloseOnSelect?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean;
  dropdownStyle?: React.CSSProperties;
  dropdownRender?: (menu: any) => any;
  filterOption?: false | ((inputValue: string, option: Option) => boolean);
  getOptionDisabled?: (option: Option) => boolean;
  getOptionLabel?: (
    option: Option,
    state: RenderOptionsState,
  ) => React.ReactNode | undefined | null;
  label?: any;
  labelMap?: string;
  loading?: boolean;
  loadingText?: any;
  multiple?: boolean;
  notFoundContent?: any;
  onChange?: (
    value: Pick<SelectProps, 'value'>,
    e: React.SyntheticEvent,
  ) => any;
  open?: boolean;
  onOpenChange?: (open: boolean) => any;
  onSearch?: (inputValue: string) => any;
  options?: any[] | [];
  placeholder?: string;
  renderOption?: (
    option: Option,
    itemProps: any,
    state: RenderOptionsState,
  ) => any;
  size?: 'small' | 'default' | 'medium';
  searchValue?: string;
  showSearch?: boolean;
  style?: React.CSSProperties;
  valueMap?: string;
  value?: string | number | string[] | number[] | [];
}

import React from 'react';
import {
  Popper,
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import styles from './Select.less';

const defaultOptions: any[] = [];

const PopperComponentContext = React.createContext<any>(undefined);

function Select(props: SelectProps) {
  const {
    allowClear = false,
    clearIcon: clearIconFp,
    defaultActiveFirstOption = true,
    defaultOpen,
    disableCloseOnSelect: disableCloseOnSelectFp,
    dropdownClassName,
    dropdownMatchSelectWidth,
    dropdownStyle,
    dropdownRender,
    filterOption,
    getOptionDisabled: getOptionDisabledFp,
    getOptionLabel: getOptionLabelFp,
    label,
    labelMap = 'label',
    loading,
    loadingText: loadingTextFp,
    multiple,
    notFoundContent,
    onChange: onChangeFp,
    open: openFp,
    onOpenChange,
    options: optionsFp,
    onSearch,
    placeholder,
    renderOption: renderOptionFp,
    searchValue,
    showSearch = false,
    size: sizeFp,
    valueMap = 'value',
    value: valueFp,
    ...restProps
  } = props;

  const [openInner, setOpenInner] = React.useState(defaultOpen || false);

  const open = React.useMemo(() => {
    if (openFp !== undefined) return openFp;
    return openInner;
  }, [openFp, openInner]);

  const options = React.useMemo(() => {
    if (!('options' in props)) return defaultOptions;
    if (optionsFp === null || optionsFp === undefined) return defaultOptions;
    if (!Array.isArray(optionsFp))
      throw new Error('Select Options must be array!');
    if (
      optionsFp.length &&
      optionsFp.some((item) => typeof item !== 'object')
    ) {
      const optionsMap = optionsFp.map((item) => {
        if (typeof item !== 'object')
          return { [labelMap]: item, [valueMap]: item };
        return item;
      });
      return optionsMap;
    }
    return optionsFp;
  }, [optionsFp]);

  const valueProp = React.useMemo(() => {
    if ('value' in props) {
      const value =
        valueFp === undefined ? (multiple === true ? [] : null) : valueFp;
      return { value };
    }
    return {};
  }, [valueFp]);

  const valueList = React.useMemo(() => {
    return options.map((item: any) => item[valueMap]);
  }, [options]);

  const optionValueMapItem = React.useMemo(() => {
    const result: any = {};
    options.forEach((item: any) => {
      const optionValue = item[valueMap];
      const key = `${optionValue}.${typeof optionValue}`;
      result[key] = item;
    });
    return result;
  }, [options]);

  const disableCloseOnSelect = React.useMemo(() => {
    if ('disableCloseOnSelect' in props) return disableCloseOnSelectFp;
    return !!multiple;
  }, [disableCloseOnSelectFp]);

  const clearIcon = React.useMemo(() => {
    if (!allowClear) return null;
    if (clearIconFp) return clearIconFp;
    return undefined;
  }, [allowClear, clearIconFp]);

  const size = React.useMemo(() => {
    if (!sizeFp) return 'medium';
    const _size = sizeFp === 'default' ? 'medium' : sizeFp;
    return _size;
  }, [sizeFp]);

  const loadingText = React.useMemo(() => {
    if (loadingTextFp !== undefined) return loadingTextFp;
    return 'Loading...';
  }, [loadingTextFp]);

  function onOpen() {
    if (onOpenChange) return onOpenChange(true);
    setOpenInner(true);
  }

  function onClose() {
    if (onOpenChange) return onOpenChange(false);
    setOpenInner(false);
  }

  function onChange(e: React.SyntheticEvent, newValue: any) {
    if (onChangeFp)
      return onChangeFp(newValue as Pick<SelectProps, 'value'>, e);
  }

  function getInputFillText(optionValue: OptionValue): string {
    const optionKey = `${optionValue}.${typeof optionValue}`;
    const option = optionValueMapItem[optionKey] || {};
    return option[labelMap] || String(optionValue);
  }

  function getOptionLabel(
    option: Option,
    state: RenderOptionsState,
  ): React.ReactNode | null {
    if (getOptionLabelFp) return getOptionLabelFp(option, state);
    const labelText = option[labelMap];
    return labelText !== undefined ? String(labelText) : '';
  }

  function renderOption(
    props: any,
    optionValue: OptionValue,
    state: RenderOptionsState,
  ) {
    const option = optionValueMapItem[`${optionValue}.${typeof optionValue}`];
    if (renderOptionFp) return renderOptionFp(props, option, state);
    return (
      <li {...props}>
        <div className={styles.labelTextContainer}>
          {getOptionLabel(option, state)}
        </div>
      </li>
    );
  }

  function getOptionDisabled(optionValue: OptionValue): boolean {
    const optionKey = `${optionValue}.${typeof optionValue}`;
    const option = optionValueMapItem[optionKey] || {};
    if (getOptionDisabledFp) return getOptionDisabledFp(option);
    return false;
  }

  function filterOptions(options: any, { inputValue }: any) {
    if (filterOption === false) return options;
    if (typeof filterOption === 'function') {
      const filteredOptions = options.filter((optionValue: any) => {
        const option =
          optionValueMapItem[`${optionValue}.${typeof optionValue}`];
        return filterOption(inputValue, option);
      });
      return filteredOptions;
    }

    const defaultFilterFn = (optionValue: any) => {
      const optionKey = `${optionValue}.${typeof optionValue}`;
      const option = optionValueMapItem[optionKey] || {};
      const label = option[labelMap] || '';
      return String(label).toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    };
    const defaultFilteredOptions = options.filter(defaultFilterFn);
    return defaultFilteredOptions;
  }

  function onInputChange(e: any, newValue: any, reason: any) {
    console.log(reason);
    const inputValue = (e && e.target && e.target.value) || '';
    if (onSearch) {
      onSearch(inputValue);
    }
  }

  const popperComponentProps = {
    dropdownClassName,
    dropdownMatchSelectWidth,
    dropdownStyle,
    dropdownRender,
  };

  return (
    <PopperComponentContext.Provider value={popperComponentProps}>
      <Autocomplete
        PopperComponent={PopperComponent}
        autoHighlight={!!defaultActiveFirstOption}
        clearIcon={clearIcon}
        disableCloseOnSelect={disableCloseOnSelect}
        filterOptions={filterOptions}
        getOptionDisabled={getOptionDisabled}
        getOptionLabel={getInputFillText}
        loading={loading}
        loadingText={loadingText}
        multiple={multiple}
        noOptionsText={notFoundContent}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        options={valueList}
        onInputChange={onInputChange}
        inputValue={searchValue}
        size={size}
        renderInput={(params) => {
          const override_inputProps: any = {};
          if (!showSearch) {
            override_inputProps.unselectable = 'on';
            override_inputProps.readOnly = true;
          }

          const override_InputProps: any = {};
          override_InputProps.endAdornment = loading ? (
            <CircularProgress
              color="primary"
              size={20}
              style={{ position: 'absolute', right: 6 }}
            />
          ) : (
            params.InputProps.endAdornment
          );

          return (
            <TextField
              placeholder={placeholder}
              label={label}
              variant="outlined"
              {...params}
              InputProps={{
                ...params.InputProps,
                ...override_InputProps,
              }}
              inputProps={{ ...params.inputProps, ...override_inputProps }}
            />
          );
        }}
        renderOption={renderOption}
        {...valueProp}
        {...restProps}
      />
    </PopperComponentContext.Provider>
  );
}

function PopperComponent(props: any) {
  const {
    className: classNameFp,
    style: styleFp,
    children,
    ...restProps
  } = props;

  const {
    dropdownClassName,
    dropdownMatchSelectWidth = true,
    dropdownRender,
    dropdownStyle,
  } = React.useContext(PopperComponentContext) || {};

  const className = `${dropdownClassName} ${classNameFp} ${
    !dropdownMatchSelectWidth && styles.dropdownNotMatchSelectWidth
  }`
    .replaceAll('undefined', '')
    .replaceAll('null', '')
    .replaceAll('false', '');

  const style = dropdownStyle ? { ...styleFp, ...dropdownStyle } : styleFp;

  const renderChildren =
    typeof dropdownRender === 'function' ? dropdownRender(children) : children;

  return (
    <Popper
      className={className}
      style={style}
      children={renderChildren}
      {...restProps}
    />
  );
}

export default Select;
