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
  listHeight?: number | string;
  listStyle?: React.CSSProperties;
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
  size?: 'small' | 'middle' | 'medium';
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
  Paper,
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
    valueMap = 'value',
    value: valueFp,
    variant = 'outlined',
  } = props;

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

  function groupBy(optionValue: OptionValue) {
    const optionKey = `${optionValue}.${typeof optionValue}`;
    const option = optionValueMapItem[optionKey] || {};
    if (groupByFp) return groupByFp(option);
    return '';
  }

  const size = useSize(props);

  const openProps = useDropdownOpen(props);

  const controlledValueProps = useCntrolledValue(props);

  const className = useClassName(props);

  const components = {
    PopperComponent,
    PaperComponent,
    ListboxComponent,
  };

  const contextValue = { ...props, size, ...openProps };

  return (
    <SelectComponentContext.Provider value={contextValue}>
      <Autocomplete
        {...openProps}
        {...components}
        className={className}
        autoHighlight={!!defaultActiveFirstOption}
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
        {...valueProp}
        options={valueList}
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
      />
    </SelectComponentContext.Provider>
  );
}

export const useCntrolledValue = (props: SelectProps) => {
  const { value: valueProp, multiple, onChange: onChangeProp } = props;

  const value = React.useMemo(() => {
    if ('value' in props) {
      const value =
        valueProp === undefined ? (multiple === true ? [] : null) : valueProp;
      return value;
    }
  }, [valueProp]);

  function onChange(e: React.SyntheticEvent, newValue: any) {
    if (onChangeProp) return onChangeProp(newValue, e);
  }

  return { value, onChange };
};

export const useClassName = (props: SelectProps) => {
  const { className, allowClear } = props;

  const wrapClassNames = React.useMemo(() => {
    return `${className} ${styles.selectWrap} ${
      !allowClear && styles.notAllowClear
    }`
      .replaceAll('undefined', '')
      .replaceAll('false', '');
  }, [allowClear, className]);

  return wrapClassNames;
};

export const useSize = (props: SelectProps) => {
  const defaultSize = 'small';
  const { size = defaultSize } = props;

  return React.useMemo(() => {
    const sizeMap = {
      small: 'small',
      middle: 'medium',
      medium: 'medium',
    };
    return sizeMap[size];
  }, [size]);
};

export const useDropdownOpen = (props: SelectProps) => {
  const {
    defaultOpen,
    open: openProp,
    onOpenChange,
    onDropdownVisibleChange,
  } = props;

  const open = React.useMemo(() => {
    if ('open' in props) return openProp;
  }, [openProp]);

  const openChangeFn = onOpenChange || onDropdownVisibleChange;

  const onClose = (e: any, reason: string) => {
    if (openChangeFn) {
      openChangeFn(false, e);
    }
  };

  const onOpen = (e: any) => {
    if (openChangeFn) {
      openChangeFn(true, e);
    }
  };

  return { defaultOpen, open, onClose, onOpen };
};

// 下拉框浮层组件
function PopperComponent(props: any) {
  const { PopperComponent: PopperComponentFp } = React.useContext(
    SelectComponentContext,
  );

  if (PopperComponentFp) return <PopperComponentFp {...props} />;

  return <Popper {...props}></Popper>;
}

// 下拉框容器组件
function PaperComponent(props: any) {
  const {
    dropdownRender,
    dropdownStyle,
    dropdownClassName,
    dropdownMatchSelectWidth = true,
    PaperComponent: PaperComponentProp,
  } = React.useContext(SelectComponentContext);

  const {
    className: classNameProp,
    children: listboxComponentRender,
    ...restProps
  } = props;

  const className = `${classNameProp} ${dropdownClassName} ${
    styles.dropdownWrap
  } ${!dropdownMatchSelectWidth && styles.dropdownNotMatchSelectWidth}`
    .replaceAll('undefined', '')
    .replaceAll('false', '');

  const style = dropdownStyle;

  const children = dropdownRender
    ? dropdownRender(listboxComponentRender)
    : listboxComponentRender;

  const onMouseDown = (e: any) => {
    if (dropdownRender) e.preventDefault();
  };

  const newProps = {
    ...restProps,
    className,
    style,
    onMouseDown,
    children,
  };

  if (PaperComponentProp) return <PaperComponentProp {...newProps} />;

  return <Paper {...newProps} />;
}

// 下拉框list容器组件
const ListboxComponent = React.forwardRef(function (props: any, ref) {
  const {
    listStyle,
    listHeight = 256,
    onPopupScroll,
    onPopupScrollBottom,
    ListboxComponent: ListboxComponentFp,
  } = React.useContext(SelectComponentContext);

  const { style: styleProp, ...restProps } = props;

  const style = { ...styleProp, ...listStyle, maxHeight: listHeight };

  function onScroll(e: any) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isScrollBottom = scrollTop + clientHeight === scrollHeight;
    if (onPopupScroll) onPopupScroll(e);
    if (isScrollBottom && onPopupScrollBottom) onPopupScrollBottom(e);
  }

  const newProps = { ...restProps, ref, style, onScroll };

  if (ListboxComponentFp) return <ListboxComponentFp {...newProps} />;

  return <ul {...newProps} />;
});

export default Select;
