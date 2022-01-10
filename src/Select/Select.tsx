type RenderOptionsState = {
  selected: boolean;
  inputValue: string | undefined;
};
type Option = { [prop: string]: any };
type labelInValueOptionValue = { [labelMapOrValueMap: string]: any };
type OptionValue =
  | null
  | undefined
  | string
  | number
  | labelInValueOptionValue
  | []
  | string[]
  | number[]
  | labelInValueOptionValue[];

export interface SelectProps {
  allowClear?: boolean;
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
  freeSolo?: boolean;
  getOptionDisabled?: (option: Option) => boolean;
  getOptionLabel?: (
    option: Option,
    state: RenderOptionsState,
    parts?: any[],
  ) => React.ReactNode | undefined | null;
  groupBy?: (option: Option) => string;
  highlight?: boolean;
  highlightOptions?: { insideWords?: boolean; findAllOccurrences?: boolean };
  highlightStyle?: React.CSSProperties;
  label?: any;
  labelInValue?: boolean;
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
  optionClassName?: string;
  optionStyle?: React.CSSProperties;
  OptionComponent?: any;
  options?: Option[] | string[] | number[];
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
  value?: OptionValue;
  variant?: 'outlined' | 'filled' | 'standard';

  onChange?: (
    value: Pick<SelectProps, 'value'>,
    e: React.SyntheticEvent,
  ) => any;
  onDropdownVisibleChange?: (open: boolean, reason?: string, e?: any) => any;
  onOpenChange?: (open: boolean, reason?: string, e?: any) => any;
  onPopupScroll?: (e?: any) => any;
  onPopupScrollBottom?: (e?: any) => any;
  onSearch?: (inputValue: string, reason: 'input' | 'clear' | 'reset') => any;
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

const SelectComponentContext = React.createContext<any>({} as any);

function Select(props: SelectProps) {
  const {
    filterOption: filterOptionProp,
    freeSolo = false,
    getOptionDisabled: getOptionDisabledProp,
    groupBy: groupByProp,
    labelMap = 'label',
    multiple = false,
    valueMap = 'value',
  } = props;

  const propNameMap = usePropNameMap(props);

  const size = useSize(props);

  const className = useClassName(props);

  const openProps = useDropdownOpen(props);

  const { valueProps, valueInner } = useSelectValue(props, { getOption });

  const inputValueProps = useInputValue(props, {
    onChange: valueProps.onChange,
  });

  const { optionsOperated, valueOptions, optionValueMapItem } = useOptions(
    props,
    { valueInner },
  );

  function getOption(
    optionValue: string | number | labelInValueOptionValue | null | undefined,
  ): { operated: any; origin: any } {
    const defaultOption = {
      operated: { label: '', value: null },
      origin: undefined,
    };
    if (optionValue === null || optionValue === undefined) return defaultOption;

    if (typeof optionValue === 'object') {
      const value = optionValue[valueMap];
      const valueKey = `${value}.${typeof value}`;
      return optionValueMapItem[valueKey] || optionValue;
    }

    const key = `${optionValue}.${typeof optionValue}`;
    return optionValueMapItem[key] || defaultOption;
  }

  function renderInputFillText(optionValue: string | number): string {
    const { operated: operatedOption } = getOption(optionValue);
    const defaultText = operatedOption.label;
    if (defaultText !== undefined && defaultText !== null) return defaultText;
    return String(optionValue);
  }

  function renderOption(
    props: any,
    value: OptionValue,
    state: RenderOptionsState,
  ) {
    const OptionProps = { ...props, state, value };
    return <OptionItem {...OptionProps} />;
  }

  function getOptionDisabled(optionValue: OptionValue): boolean {
    const optionKey = `${optionValue}.${typeof optionValue}`;
    const option = optionValueMapItem[optionKey] || {};
    if (getOptionDisabledProp) return getOptionDisabledProp(option);
    return false;
  }

  function filterOption(valueOptions: any, { inputValue }: any) {
    const defaultFilterFn = (inputValue: any, option: any) => {
      const label =
        typeof option === 'object' ? option[labelMap] : String(option);
      return label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    };

    const filterFn =
      typeof filterOptionProp === 'function'
        ? filterOptionProp
        : defaultFilterFn;

    const filtered = valueOptions.filter((optionValue: any) => {
      const { origin: originOption } = getOption(optionValue);
      return filterFn(inputValue || '', originOption);
    });

    if (multiple && freeSolo && inputValue) {
      const isInputValueInFiltered = !!filtered.filter((value: any) => {
        const { operated: operatedOption } = getOption(value);
        return value === inputValue || operatedOption.label === inputValue;
      })[0];
      if (isInputValueInFiltered) return filtered;
      return [...filtered, inputValue];
    }

    if (filterOptionProp === false) return valueOptions;

    return filtered;
  }

  function groupBy(optionValue: OptionValue) {
    const { origin: originOption } = getOption(optionValue);
    if (groupByProp) return groupByProp(originOption);
    return '';
  }

  const components = {
    PopperComponent,
    PaperComponent,
    ListboxComponent,
  };

  const contextValue = {
    ...props,
    size,
    getOption,
    optionsOperated,
    valueOptions,
    ...valueProps,
    ...openProps,
  };

  return (
    <SelectComponentContext.Provider value={contextValue}>
      <Autocomplete
        {...propNameMap}
        {...valueProps}
        {...inputValueProps}
        {...openProps}
        {...components}
        className={className}
        filterOptions={filterOption}
        getOptionDisabled={getOptionDisabled}
        getOptionLabel={renderInputFillText}
        groupBy={groupByProp && groupBy}
        options={valueOptions}
        renderInput={RenderInput}
        renderOption={renderOption}
      />
    </SelectComponentContext.Provider>
  );
}

export const usePropNameMap = (props: SelectProps) => {
  const {
    allowClear,
    clearIcon: clearIconProp,
    defaultActiveFirstOption = true,
    freeSolo = false,
    loading,
    multiple,
    removeIcon,
    style,
    showArrow,
  } = props;

  const clearIcon = !allowClear ? null : clearIconProp || removeIcon;
  const disableClearable = !allowClear;

  const disableCloseOnSelect =
    'disableCloseOnSelect' in props ? props.disableCloseOnSelect : !!multiple;

  const popupIcon =
    typeof showArrow === 'boolean' ? (showArrow ? undefined : null) : showArrow;

  const forcePopupIcon: any = React.useMemo(() => {
    if ('showArrow' in props) {
      return !!showArrow;
    }
    return 'auto';
  }, [showArrow]);

  const autoHighlight = !!defaultActiveFirstOption;

  const noOptionsText = props.notFoundContent;

  return {
    autoHighlight,
    clearIcon,
    disableClearable,
    disableCloseOnSelect,
    forcePopupIcon,
    freeSolo,
    loading,
    multiple,
    noOptionsText,
    popupIcon,
    style,
  };
};

export const useOptions = (props: SelectProps, { valueInner }: any) => {
  const {
    options: optionsProp,
    labelMap = 'label',
    valueMap = 'value',
    value: valueProp,
  } = props;

  const value = 'value' in props ? valueProp : valueInner;

  const operateOption = (option: any, labelMap: string, valueMap: string) => {
    if (typeof option === 'object') {
      const label = option[labelMap];
      const value = option[valueMap];
      return { label, value };
    }
    return { label: option, value: option };
  };

  const optionsOperated = React.useMemo(() => {
    const defaultOptions: any[] = [];

    if (
      !('options' in props) ||
      optionsProp === null ||
      optionsProp === undefined
    )
      return defaultOptions;

    if (!Array.isArray(optionsProp))
      throw new Error('Select Options must be array!');

    return optionsProp.map((option) =>
      operateOption(option, labelMap, valueMap),
    );
  }, [optionsProp, labelMap, valueMap]);

  const valueOptions = optionsOperated.map((option) => option.value);

  const optionsByValue = React.useMemo(() => {
    return Array.isArray(value) ? value : [value];
  }, [value, labelMap, valueMap]);

  const optionValueMapItem = React.useMemo(() => {
    const result: any = {};
    let optionList = [];

    if (optionsOperated.length) {
      optionList = optionsOperated;
    }
    if (!optionsOperated.length && value) {
      optionList = optionsByValue;
    }

    optionList.forEach((option: any) => {
      const operated = operateOption(option, labelMap, valueMap);
      const { value } = operated;
      const key = `${value}.${typeof value}`;
      result[key] = { operated, origin: option };
    });

    return result;
  }, [optionsOperated, optionsByValue, value, labelMap, valueMap]);

  return { optionsOperated, valueOptions, optionValueMapItem };
};

export const useSelectValue = (props: SelectProps, { getOption }: any) => {
  const {
    defaultValue,
    labelInValue,
    labelMap = 'label',
    multiple,
    onChange: onChangeProp,
    value: valueProp,
    valueMap = 'value',
  } = props;

  const [valueInner, setValueInner] = React.useState(
    defaultValue || (multiple ? [] : null),
  );

  const valueObj = React.useMemo(() => {
    if (!('value' in props)) return {};

    if (valueProp === undefined || valueProp === null) {
      const value = multiple ? [] : null;
      return { value };
    }

    if (Array.isArray(valueProp)) {
      if (labelInValue) {
        const value = (valueProp as labelInValueOptionValue[]).map(
          (v) => v[valueMap],
        );
        return { value };
      }
      return { value: valueProp };
    }

    if (labelInValue) {
      const value = (valueProp as labelInValueOptionValue)[valueMap];
      return { value };
    }

    return { value: valueProp };
  }, [valueProp, multiple, labelInValue]);

  function onChange(e: React.SyntheticEvent, newValue: any) {
    let value = newValue;

    if (Array.isArray(newValue)) {
      if (labelInValue) {
        value = newValue.map((v) => {
          const { operated: operatedOption } = getOption(v);
          return {
            [labelMap]: operatedOption.label,
            [valueMap]: operatedOption.value,
          };
        });
      }
    } else {
      if (labelInValue) {
        const { operated: operatedOption } = getOption(newValue);
        value = {
          [labelMap]: operatedOption[labelMap],
          [valueMap]: operatedOption[valueMap],
        };
      }
    }

    setValueInner(value);
    if (onChangeProp) onChangeProp(value, e);
  }

  const valueProps = { defaultValue, ...valueObj, onChange };

  return { valueProps, valueInner };
};

export const useInputValue = (props: SelectProps, { onChange }: any) => {
  const { onSearch, freeSolo = false, multiple = false } = props;

  const [inputValueInner, setInputValue] = React.useState('');

  const inputValueObj = React.useMemo(() => {
    return { inputValue: inputValueInner };
  }, [inputValueInner]);

  function onInputChange(
    e: React.SyntheticEvent,
    newValue: any,
    reason: 'input' | 'clear' | 'reset',
  ) {
    if (onSearch) {
      onSearch(newValue, reason);
    }
    setInputValue(newValue);

    if (freeSolo) {
      if (!multiple) {
        onChange(e, newValue);
      }
    }
  }

  return { ...inputValueObj, onInputChange };
};

export const useClassName = (props: SelectProps) => {
  const { className, allowClear, fullWidth = true } = props;

  const wrapClassNames = React.useMemo(() => {
    return `${className} ${styles.selectWrap} ${
      !!fullWidth && styles.selectFullWidth
    } ${!allowClear && styles.notAllowClear}`
      .replaceAll('undefined', '')
      .replaceAll('false', '');
  }, [allowClear, className, fullWidth]);

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

  const [openInner, setOpenInner] = React.useState(defaultOpen);

  const open = React.useMemo(() => {
    if ('open' in props) return openProp;
    return openInner;
  }, [openProp, openInner]);

  const openChangeFn = onOpenChange || onDropdownVisibleChange;

  const onClose = (e: any, reason: string) => {
    if (openChangeFn) {
      return openChangeFn(false, e, reason);
    }
    setOpenInner(false);
  };

  const onOpen = (e: any) => {
    if (openChangeFn) {
      return openChangeFn(true, e);
    }
    setOpenInner(true);
  };

  return { open, onClose, onOpen };
};

export function RenderInput(props: any) {
  const {
    placeholder,
    variant = 'outlined',
    size,
    showSearch,
    loading,
    loadingIndicator,
  } = React.useContext(SelectComponentContext);

  const {
    inputProps: inputPropsProp,
    InputProps: InputPropsProp,
    ...restProps
  } = props;

  const override_inputProps: any = {};
  if (!showSearch) {
    override_inputProps.unselectable = 'on';
    override_inputProps.readOnly = true;
    override_inputProps.style = { cursor: 'pointer' };
  }
  const inputProps = { ...inputPropsProp, ...override_inputProps };

  const override_InputProps: any = {};
  if (loading) {
    override_InputProps.endAdornment = loadingIndicator || (
      <CircularProgress
        size={20}
        color="primary"
        style={{ position: 'absolute', right: 6 }}
      />
    );
  }
  const InputProps = { ...InputPropsProp, ...override_InputProps };

  const newProps = {
    ...restProps,
    size,
    placeholder,
    variant,
    inputProps,
    InputProps,
  };

  return <TextField {...newProps} />;
}

// 下拉框浮层组件
export function PopperComponent(props: any) {
  const {
    PopperComponent: PopperComponentFp,
    dropdownMatchSelectWidth = true,
    disablePortal,
  } = React.useContext(SelectComponentContext);

  const { style: styleProp, ...restProps } = props;

  const style = {
    ...styleProp,
    width: dropdownMatchSelectWidth ? styleProp.width : 'auto',
  };

  const newProps = {
    ...restProps,
    style,
    disablePortal: !!disablePortal,
    placement: 'bottom-start',
  };

  if (PopperComponentFp) return <PopperComponentFp {...newProps} />;

  return <Popper {...newProps}></Popper>;
}

// 下拉框容器组件
export function PaperComponent(props: any) {
  const {
    dropdownRender,
    dropdownStyle,
    dropdownClassName,
    PaperComponent: PaperComponentProp,
  } = React.useContext(SelectComponentContext);

  const {
    className: classNameProp,
    children: childrenProp,
    ...restProps
  } = props;

  const className = `${classNameProp} ${dropdownClassName}`
    .replaceAll('undefined', '')
    .replaceAll('false', '');

  const style = dropdownStyle;

  const children = dropdownRender ? dropdownRender(childrenProp) : childrenProp;

  const onMouseDown = (e: any) => {
    if (dropdownRender) e.preventDefault();
  };

  const newProps = {
    ...restProps,
    className,
    style,
    children,
    onMouseDown,
  };

  if (PaperComponentProp) return <PaperComponentProp {...newProps} />;

  return <Paper {...newProps} />;
}

// 下拉框list容器组件
export const ListboxComponent = React.forwardRef(function (props: any, ref) {
  const {
    listStyle,
    listHeight = '40vh',
    onPopupScroll,
    onPopupScrollBottom,
    ListboxComponent: ListboxComponentFp,
  } = React.useContext(SelectComponentContext);

  const { style: styleProp, ...restProps } = props;

  const style = { ...styleProp, ...listStyle, maxHeight: listHeight };

  function onScroll(e: any) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isScrollBottom = scrollTop + clientHeight >= scrollHeight;
    if (onPopupScroll) onPopupScroll(e);
    if (isScrollBottom && onPopupScrollBottom) onPopupScrollBottom(e);
  }

  const newProps = { ...restProps, ref, style, onScroll, role: undefined };

  if (ListboxComponentFp) return <ListboxComponentFp {...newProps} />;

  return <ul {...newProps} />;
});

export function OptionItem(props: any) {
  const {
    getOption,
    getOptionLabel: getOptionLabelProp,
    highlight,
    highlightOptions,
    highlightStyle,
    OptionComponent,
    optionClassName,
    optionStyle,
  } = React.useContext(SelectComponentContext);

  const { state, value, className: classNameProp, ...restProps } = props;
  const { inputValue } = state;

  const className = `${classNameProp} ${optionClassName}`
    .replaceAll('undefined', '')
    .replaceAll('false', '');

  const style = optionStyle;

  const { operated: operatedOption, origin: originOption } = getOption(value);

  const defaultLabel = operatedOption.label || operatedOption.value || '';

  const matches = match(defaultLabel, inputValue || '', {
    insideWords: true,
    findAllOccurrences: false,
    ...highlightOptions,
  });

  const parts = parse(defaultLabel, matches);

  const highlightLabel =
    highlight &&
    parts.map((part: any, index: any) => {
      const { highlight: isHighlight, text } = part;

      const style = isHighlight
        ? { color: 'red', fontWeight: 600, ...highlightStyle }
        : undefined;

      return (
        <span key={index} style={style}>
          {text}
        </span>
      );
    });

  const propLabel =
    getOptionLabelProp && getOptionLabelProp(originOption, state, parts);

  const children = propLabel || highlightLabel || defaultLabel;

  const newProps = { ...restProps, className, style, children };

  if (OptionComponent) return <OptionComponent {...newProps} />;

  return <li {...newProps}></li>;
}

export default Select;
