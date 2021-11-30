type RenderOptionsState = {
  selected: boolean;
  inputValue: string | undefined;
};
type Option = { [prop: string]: any };
type OptionValue = string | number;

export interface SelectProps {
  allowClear?: boolean;
  autoHighlight?: boolean;
  clearIcon?: any;
  className?: string;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;
  defaultValue?: string | number | string[] | number[] | [];
  disabled?: boolean;
  disableCloseOnSelect?: boolean;
  disablePortal?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean;
  dropdownStyle?: React.CSSProperties;
  dropdownRender?: (originNode: any) => any;
  filterOption?: false | ((inputValue: string, option: Option) => boolean);
  fullWidth?: boolean;
  getOptionDisabled?: (option: Option) => boolean;
  getOptionLabel?: (
    option: Option,
    state: RenderOptionsState,
    parts?: any[],
  ) => React.ReactNode | undefined | null;
  groupBy?: (option: Option) => string;
  highlightOptions?: { insideWords?: boolean; findAllOccurrences?: boolean };
  highlightStyle?: React.CSSProperties;
  label?: any;
  labelMap?: string;
  listHeight?: number | string;
  loading?: boolean;
  loadingIndicator?: string | React.ReactNode;
  loadingText?: any;
  multiple?: boolean;
  notFoundContent?: any;
  open?: boolean;
  options?: any[] | [];
  placeholder?: string;
  removeIcon?: any;
  renderOption?: (
    option: Option,
    itemProps: any,
    state: RenderOptionsState,
    parts?: any[],
  ) => any;
  searchValue?: string;
  showArrow?: boolean;
  size?: 'small' | 'middle';
  showSearch?: boolean;
  style?: React.CSSProperties;
  valueMap?: string;
  value?: string | number | string[] | number[] | [];
  variant?: 'outlined' | 'filled' | 'standard';

  onChange?: (
    value: Pick<SelectProps, 'value'>,
    e: React.SyntheticEvent,
  ) => any;
  onDropdownVisibleChange?: (open: boolean, reason?: string, e?: any) => any;
  onOpenChange?: (open: boolean, reason?: string, e?: any) => any;
  onSearch?: (inputValue: string) => any;
}

import React from 'react';
import {
  Popper,
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';

import styles from './Select.less';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const defaultOptions: any[] = [];

const SelectComponentContext = React.createContext<any>(undefined);

function Select(props: SelectProps) {
  const {
    allowClear = false,
    autoHighlight = false,
    className,
    clearIcon: clearIconFp,
    defaultActiveFirstOption = true,
    defaultOpen,
    disableCloseOnSelect: disableCloseOnSelectFp,
    dropdownClassName,
    dropdownMatchSelectWidth,
    dropdownStyle,
    dropdownRender,
    filterOption,
    fullWidth = true,
    getOptionDisabled: getOptionDisabledFp,
    getOptionLabel: getOptionLabelFp,
    groupBy: groupByFp,
    highlightOptions,
    highlightStyle,
    label,
    labelMap = 'label',
    listHeight,
    loading,
    loadingIndicator,
    multiple,
    notFoundContent,
    onChange: onChangeFp,
    open: openFp,
    onDropdownVisibleChange,
    onOpenChange: onOpenChangeFp,
    options: optionsFp,
    onSearch,
    placeholder,
    removeIcon,
    showArrow = true,
    renderOption: renderOptionFp,
    searchValue,
    showSearch = false,
    size: sizeFp,
    valueMap = 'value',
    value: valueFp,
    variant = 'outlined',
    ...restProps
  } = props;

  const [openInner, setOpenInner] = React.useState(defaultOpen || false);

  const open = React.useMemo(() => {
    if ('open' in props) return openFp;
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

  const clearIcon = !allowClear ? null : clearIconFp || removeIcon;

  const popupIcon = React.useMemo(() => {
    if (typeof showArrow === 'boolean') return showArrow ? undefined : null;
    return showArrow;
  }, [showArrow]);

  const size = React.useMemo(() => {
    if (!sizeFp) return 'small';
    const _size = sizeFp === 'middle' ? 'medium' : sizeFp;
    return _size;
  }, [sizeFp]);

  function onClose(e: any, reason: string) {
    onOpenChange(false, reason, e);
  }

  function onOpen(e: any) {
    onOpenChange(true, '', e);
  }

  function onOpenChange(visible: boolean, reason: string, e: any) {
    setOpenInner(visible);
    if (onOpenChangeFp) return onOpenChangeFp(visible, reason, e);
    if (onDropdownVisibleChange)
      return onDropdownVisibleChange(visible, reason, e);
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
    parts?: any[],
  ): React.ReactNode | null {
    if (getOptionLabelFp) return getOptionLabelFp(option, state, parts);
    const labelText = option[labelMap];
    return labelText !== undefined ? String(labelText) : '';
  }

  function renderOption(
    props: any,
    optionValue: OptionValue,
    state: RenderOptionsState,
  ) {
    const option = optionValueMapItem[`${optionValue}.${typeof optionValue}`];

    const getHighlightRender = (highlightNodeProps = {} as any) => {
      const { style: highlightStyle } = highlightNodeProps;
      const { inputValue } = state;
      const optionString =
        typeof option === 'object' ? option[labelMap] : String(option);
      const matches = match(optionString, inputValue || '', {
        insideWords: true,
        findAllOccurrences: false,
        ...highlightOptions,
      });
      const parts = parse(optionString, matches);
      const style = {
        fontWeight: 700,
        color: 'red',
        ...(highlightStyle || {}),
      };
      const highlightNodes = parts.map((part: any, index: any) => {
        return part.highlight ? (
          <span key={index} {...highlightNodeProps} style={style}>
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        );
      });
      return { parts, highlightNodes };
    };

    const { parts, highlightNodes } = getHighlightRender({
      style: highlightStyle,
    });

    if (renderOptionFp) return renderOptionFp(props, option, state, parts);

    let render;
    switch (true) {
      case autoHighlight:
        render = <div>{highlightNodes}</div>;
        break;
      default:
        render = getOptionLabel(option, state, parts);
        break;
    }

    return <li {...props}>{render}</li>;
  }

  function getOptionDisabled(optionValue: OptionValue): boolean {
    const optionKey = `${optionValue}.${typeof optionValue}`;
    const option = optionValueMapItem[optionKey] || {};
    if (getOptionDisabledFp) return getOptionDisabledFp(option);
    return false;
  }

  function filterOptions(options: any, { inputValue }: any) {
    let _options;

    if (filterOption === false) {
      _options = options;
    }

    if (typeof filterOption === 'function') {
      const filteredOptions = options.filter((optionValue: any) => {
        const option =
          optionValueMapItem[`${optionValue}.${typeof optionValue}`];
        return filterOption(inputValue, option);
      });
      _options = filteredOptions;
    }

    const defaultFilterFn = (optionValue: any) => {
      const optionKey = `${optionValue}.${typeof optionValue}`;
      const option = optionValueMapItem[optionKey] || {};
      const label = option[labelMap] || '';
      return String(label).toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    };
    const defaultFilteredOptions = options.filter(defaultFilterFn);
    _options = defaultFilteredOptions;

    return _options;
  }

  function onInputChange(e: any, newValue: any, reason: any) {
    const inputValue = (e && e.target && e.target.value) || '';
    if (onSearch) {
      onSearch(inputValue);
    }
  }

  function groupBy(optionValue: OptionValue) {
    const optionKey = `${optionValue}.${typeof optionValue}`;
    const option = optionValueMapItem[optionKey] || {};
    if (groupByFp) return groupByFp(option);
    return '';
  }

  const wrapClassnames = `${className} ${!allowClear && styles.notAllowClear}`
    .replaceAll('undefined', '')
    .replaceAll('false', '');

  const dropdownContextProps = {
    dropdownClassName,
    dropdownMatchSelectWidth,
    dropdownStyle,
    dropdownRender,
  };

  const popupContextProps = {
    listHeight,
  };

  const contextProvideValue = {
    open,
    onOpenChange,
    ...dropdownContextProps,
    ...popupContextProps,
  };

  return (
    <SelectComponentContext.Provider value={contextProvideValue}>
      <Autocomplete
        autoHighlight={!!defaultActiveFirstOption}
        className={wrapClassnames}
        clearIcon={clearIcon}
        disableCloseOnSelect={disableCloseOnSelect}
        filterOptions={filterOptions}
        getOptionDisabled={getOptionDisabled}
        getOptionLabel={getInputFillText}
        groupBy={groupByFp && groupBy}
        inputValue={searchValue}
        loading={loading}
        multiple={multiple}
        noOptionsText={notFoundContent}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        options={valueList}
        onInputChange={onInputChange}
        PaperComponent={PaperComponent}
        PopperComponent={PopperComponent}
        popupIcon={popupIcon}
        renderInput={(params) => {
          const override_inputProps: any = {};
          if (!showSearch) {
            override_inputProps.unselectable = 'on';
            override_inputProps.readOnly = true;
          }

          const override_InputProps: any = {};
          override_InputProps.endAdornment = loading
            ? loadingIndicator || (
                <CircularProgress
                  color="primary"
                  size={20}
                  style={{ position: 'absolute', right: 6 }}
                />
              )
            : params.InputProps.endAdornment;
          return (
            <TextField
              placeholder={placeholder}
              label={label}
              variant={variant}
              {...params}
              InputProps={{
                ...params.InputProps,
                ...override_InputProps,
              }}
              inputProps={{
                ...params.inputProps,
                ...override_inputProps,
              }}
              fullWidth={fullWidth}
            />
          );
        }}
        renderOption={renderOption}
        size={size}
        {...valueProp}
        {...restProps}
      />
    </SelectComponentContext.Provider>
  );
}

function PaperComponent(props: any) {
  return props.children;
}

function PopperComponent(props: any) {
  const { className, children, ...restProps } = props;

  const {
    dropdownClassName,
    dropdownMatchSelectWidth = true,
    dropdownStyle,
    dropdownRender,
  } = React.useContext(SelectComponentContext) || {};

  const classes = `${className} ${dropdownClassName} ${styles.dropdownWrap} ${
    !dropdownMatchSelectWidth && styles.dropdownNotMatchSelectWidth
  }`
    .replaceAll('undefined', '')
    .replaceAll('false', '');

  const renderChildren = dropdownRender ? dropdownRender(children) : children;

  return (
    <Popper
      {...restProps}
      onMouseDown={(e) => {
        if (dropdownRender) {
          e.preventDefault();
        }
      }}
    >
      <div className={classes} style={dropdownStyle}>
        {renderChildren}
      </div>
    </Popper>
  );
}

export default Select;
