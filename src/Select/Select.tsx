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
  ListboxComponent?: any;
  loading?: boolean;
  loadingIndicator?: string | React.ReactNode;
  loadingText?: any;
  multiple?: boolean;
  notFoundContent?: any;
  open?: boolean;
  options?: any[] | [];
  placeholder?: string;
  PaperComponent?: any;
  PopperComponent?: any;
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
  onPopupScroll?: (e?: any) => any;
  onPopupScrollBottom?: (e?: any) => any;
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

const SelectComponentContext = React.createContext<any>({} as any);

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
    if (onOpenChangeFp) onOpenChangeFp(visible, reason, e);
    if (onDropdownVisibleChange) onDropdownVisibleChange(visible, reason, e);
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

  const contextValue = { ...props, open, onOpenChange };

  return (
    <SelectComponentContext.Provider value={contextValue}>
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
        ListboxComponent={ListboxComponent}
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

// 下拉浮层位置
function PopperComponent(props: any) {
  const { PopperComponent: PopperComponentFp } = React.useContext(
    SelectComponentContext,
  );

  if (PopperComponentFp) return <PopperComponentFp {...props} />;

  return <Popper {...props}></Popper>;
}

// 下拉容器样式
function PaperComponent(props: any) {
  const { className, children, ...restProps } = props;
  const {
    PaperComponent: PaperComponentFp,
    dropdownClassName,
    dropdownMatchSelectWidth = true,
    dropdownStyle,
    dropdownRender,
    onPopupScroll,
    onPopupScrollBottom,
  } = React.useContext(SelectComponentContext);

  const classes = `${className} ${dropdownClassName} ${styles.dropdownWrap} ${
    !dropdownMatchSelectWidth && styles.dropdownNotMatchSelectWidth
  }`
    .replaceAll('undefined', '')
    .replaceAll('false', '');

  const dropdownStyles = {
    height: 'auto',
    maxHeight: '40vh',
    overflow: 'auto',
    ...(dropdownStyle || {}),
  };

  const renderChildren = dropdownRender ? dropdownRender(children) : children;

  function onScroll(e: any) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isScrollBottom = scrollTop + clientHeight === scrollHeight;
    if (onPopupScroll) onPopupScroll(e);
    if (isScrollBottom && onPopupScrollBottom) onPopupScrollBottom(e);
  }

  if (PaperComponentFp) return <PaperComponentFp {...props} />;

  return (
    <div
      {...restProps}
      className={classes}
      style={dropdownStyles}
      onScroll={onScroll}
      onMouseDown={(e) => {
        if (dropdownRender) e.preventDefault();
      }}
    >
      {renderChildren}
    </div>
  );
}

// 下拉容器list
const ListboxComponent = React.forwardRef(function (props: any, ref) {
  const { ListboxComponent: ListboxComponentFp } = React.useContext(
    SelectComponentContext,
  );

  const { ...restProps } = props;

  if (ListboxComponentFp) return <ListboxComponentFp {...props} />;

  return (
    <ul
      ref={ref}
      {...restProps}
      style={{ height: 'auto', maxHeight: 'none' }}
    ></ul>
  );
});

export default Select;
