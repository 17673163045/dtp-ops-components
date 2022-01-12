type Option = { [key: string]: string | number } | string | number;
type OptionList = [] | Option[];
type LabelInValuedValue = Record<string, any>;
type Value =
  | undefined
  | null
  | number
  | string
  | LabelInValuedValue
  | []
  | (string | number | LabelInValuedValue)[];
type OnChange = (value: Value, e: React.SyntheticEvent) => any;

type OptionOperated = { label: any; value: any };
type OptionValue = string | number;
type OptionValueList = [] | (string | number)[];
type OptionOperatedList = [] | OptionOperated[];
type OptionValueMapItem = {
  [valueKey: string]: { operated: OptionOperated; origin: Option };
};

type OptionState = {
  selected: boolean;
  inputValue: string | undefined;
};

type Style = React.CSSProperties;

export interface SelectProps {
  allowClear?: boolean;
  clearIcon?: any;
  className?: string;
  check?: boolean;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  disableCloseOnSelect?: boolean;
  disablePortal?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean;
  dropdownStyle?: Style;
  dropdownRender?: (originList: any) => any;
  filterOption?: false | ((inputValue: string, option: Option) => boolean);
  fullWidth?: boolean;
  freeSolo?: boolean;
  getInputFillText?: (option: Option) => string;
  getOptionDisabled?: (option: Option) => boolean;
  getOptionLabel?: (
    option: Option,
    state: OptionState,
    parts?: any[],
  ) => React.ReactNode | undefined | null;
  groupBy?: (option: Option) => string;
  highlight?: boolean;
  highlightOptions?: { insideWords?: boolean; findAllOccurrences?: boolean };
  highlightStyle?: React.CSSProperties;
  label?: any;
  labelInValue?: boolean;
  labelMap?: string;
  limitTags?: number;
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
  options?: OptionList;
  placeholder?: string;
  PaperComponent?: any;
  PopperComponent?: any;
  removeIcon?: any;
  renderOption?: (
    option: Option,
    itemProps: any,
    state: OptionState,
    parts?: any[],
  ) => any;
  inputValue?: string;
  showArrow?: boolean | React.ReactNode;
  size?: 'small' | 'middle' | 'medium';
  showSearch?: boolean;
  style?: Style;
  tagMode?: boolean;
  tagModePush?: boolean;
  valueMap?: string;
  value?: Value;
  variant?: 'outlined' | 'filled' | 'standard';
  onChange?: OnChange;
  onDropdownVisibleChange?: (visible: boolean, reason?: string, e?: any) => any;
  onInputChange?: (inputValue: string, reason?: string, e?: any) => any;
  onOpenChange?: (visible: boolean, reason?: string, e?: any) => any;
  onPopupScroll?: (e?: any) => any;
  onPopupScrollBottom?: (e?: any) => any;
  onSearch?: (inputValue: string, reason?: string) => any;
}

import React from 'react';
import {
  Paper,
  Popper,
  TextField,
  Autocomplete,
  CircularProgress,
  Checkbox,
} from '@mui/material';

import styles from './Select.less';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const SelectComponentContext = React.createContext<any>({} as any);

function Select(props: SelectProps) {
  const {
    filterOption: filterOptionProp,
    getOptionDisabled: getOptionDisabledProp,
    getInputFillText,
    groupBy: groupByProp,
    labelMap = 'label',
    options,
    tagMode = false,
    valueMap = 'value',
  } = props;

  const propNameMap = usePropNameMap(props);

  const size = useSize(props);

  const className = useClassName(props);

  const openProps = useDropdownOpen(props);

  const { valueProps, valueInner } = useSelectValue(props, { getOption });

  const inputValueProps = useInputValue(props, {
    onChange: valueProps.onChange,
    value: valueProps.value,
  });

  const { optionsOperated, valueOptions, optionValueMapItem } = useOptions(
    props,
    { valueInner },
  );

  function getOption(
    optionValue: string | number | LabelInValuedValue | null | undefined,
  ): {
    operated: any;
    origin: any;
  } {
    const defaultOption = {
      operated: { label: undefined, value: optionValue },
      origin: optionValue,
    };
    if (optionValue === null || optionValue === undefined) return defaultOption;

    if (optionValue !== null && typeof optionValue === 'object') {
      const value = optionValue[valueMap];
      const valueKey = `${value}.${typeof value}`;
      return optionValueMapItem[valueKey] || optionValue;
    }

    const key = `${optionValue}.${typeof optionValue}`;
    return optionValueMapItem[key] || defaultOption;
  }

  function renderInputFillText(optionValue: string | number): string {
    const { operated: operatedOption, origin: originOption } =
      getOption(optionValue);
    if (getInputFillText) return getInputFillText(originOption);
    const defaultText = operatedOption.label;
    if (defaultText !== undefined && defaultText !== null) return defaultText;
    return String(optionValue);
  }

  function renderOption(props: any, value: OptionValue, state: OptionState) {
    const OptionProps = { ...props, state, value };
    return <OptionItem {...OptionProps} />;
  }

  function getOptionDisabled(optionValue: OptionValue): boolean {
    const { origin: originOption } = getOption(optionValue);
    if (getOptionDisabledProp) return getOptionDisabledProp(originOption);
    return false;
  }

  function filterOptions(valueOptions: any, { inputValue }: any) {
    const defaultFilterFn = (inputValue: any, option: any) => {
      const label =
        option !== null && typeof option === 'object'
          ? option[labelMap]
          : option;
      const stringLabel =
        label === null || label === undefined ? '' : String(label);
      return stringLabel.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    };

    const filterFn =
      typeof filterOptionProp === 'function'
        ? filterOptionProp
        : filterOptionProp === false
        ? null
        : defaultFilterFn;

    const filtered = !filterFn
      ? valueOptions
      : valueOptions.filter((optionValue: any) => {
          const { origin: originOption } = getOption(optionValue);
          return filterFn(inputValue || '', originOption);
        });

    if (tagMode) {
      const isInputValueInFiltered = !!filtered.filter((value: any) => {
        const { operated: operatedOption } = getOption(value);
        return value === inputValue || operatedOption.label === inputValue;
      })[0];

      if (isInputValueInFiltered || !inputValue) return filtered;
      return [...filtered, inputValue];
    }

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
        ChipProps={{ size }}
        className={className}
        filterOptions={filterOptions}
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
    allowClear = true,
    clearIcon: clearIconProp,
    defaultActiveFirstOption = true,
    disabled,
    freeSolo: freeSoloProp = false,
    limitTags,
    loading,
    loadingText,
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

  const freeSolo = freeSoloProp;

  return {
    autoHighlight,
    clearIcon,
    disabled,
    disableClearable,
    disableCloseOnSelect,
    forcePopupIcon,
    freeSolo,
    limitTags,
    loading,
    loadingText,
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
    tagMode = false,
    tagModePush = true,
  } = props;

  const value = 'value' in props ? valueProp : valueInner;

  const operateOption = (
    option: any,
    labelMap: string,
    valueMap: string,
  ): OptionOperated => {
    if (option !== null && typeof option === 'object') {
      const label = option[labelMap];
      const value = option[valueMap];
      return { label, value };
    }
    return { label: option, value: option };
  };

  const optionsOperated: OptionOperatedList = React.useMemo(() => {
    const defaultOptions: [] = [];

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

  const valueOptions: OptionValueList = React.useMemo(() => {
    const optionValueList = optionsOperated.map((option) => option.value);
    if (tagMode && tagModePush) {
      const valueList = Array.isArray(value) ? value : [value];
      const filteredValueList = valueList.filter(
        (v) => !optionValueList.includes(v),
      );
      return optionValueList.concat(filteredValueList);
    }
    return optionValueList;
  }, [optionsOperated, value, tagMode, tagModePush]);

  const optionsByValue = React.useMemo(() => {
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const optionValueMapItem: OptionValueMapItem = React.useMemo(() => {
    const result: any = {};
    let optionList = [];

    if (Array.isArray(optionsProp) && optionsProp.length) {
      optionList = optionsProp;
    }
    if (
      (!optionsProp && value) ||
      (Array.isArray(optionsProp) && !optionsProp.length && value)
    ) {
      optionList = optionsByValue;
    }

    optionList.forEach((option: any) => {
      const operated = operateOption(option, labelMap, valueMap);
      const { value } = operated;
      const valueKey = `${value}.${typeof value}`;
      result[valueKey] = { operated, origin: option };
    });

    return result;
  }, [optionsProp, optionsByValue, value, labelMap, valueMap]);

  return { optionsOperated, valueOptions, optionValueMapItem };
};

export const useSelectValue = (props: SelectProps, { getOption }: any) => {
  const {
    defaultValue: defaultValueProp,
    freeSolo = false,
    labelInValue,
    labelMap = 'label',
    multiple,
    onChange: onChangeProp,
    value: valueProp,
    valueMap = 'value',
  } = props;

  const transferValue = React.useCallback(
    (v: any) => {
      if (v === undefined || v === null) {
        return multiple ? [] : freeSolo ? '' : null;
      }

      if (Array.isArray(v)) {
        if (labelInValue) {
          return (v as LabelInValuedValue[]).map((item) =>
            item !== null && typeof item === 'object' ? item[valueMap] : item,
          );
        }
        return v;
      }

      if (labelInValue) {
        return v !== null && typeof v === 'object'
          ? (v as LabelInValuedValue)[valueMap]
          : v;
      }
      return v;
    },
    [multiple, freeSolo, labelInValue, valueMap],
  );

  const defaultValue = transferValue(defaultValueProp);

  const [valueInner, setValueInner] = React.useState(defaultValue);

  const value = transferValue(valueProp);

  const valueObj = 'value' in props ? { value } : {};

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
          [labelMap]: operatedOption.label,
          [valueMap]: operatedOption.value,
        };
      }
      if (
        !labelInValue &&
        newValue !== null &&
        typeof newValue === 'object' &&
        newValue[valueMap] !== undefined
      ) {
        value = newValue[valueMap];
      }
    }

    setValueInner(value);
    if (onChangeProp) onChangeProp(value, e);
  }

  const valueProps = { defaultValue, ...valueObj, onChange };

  return { valueProps, valueInner };
};

export const useInputValue = (props: SelectProps, { onChange, value }: any) => {
  const {
    onSearch,
    freeSolo = false,
    multiple = false,
    inputValue: inputValueProp,
    onInputChange: onInputChangeProp,
  } = props;

  const [inputValueInner, setInputValue] = React.useState('');

  const inputValueObj = React.useMemo(() => {
    if ('inputValue' in props) return { inputValue: inputValueProp };
    if (freeSolo && !multiple) return { inputValue: value };
    return { inputValue: inputValueInner };
  }, [inputValueInner, inputValueProp, freeSolo, multiple]);

  function onInputChange(
    e: React.SyntheticEvent,
    newValue: any,
    reason: 'input' | 'clear' | 'reset',
  ) {
    setInputValue(newValue);
    if (freeSolo && !multiple) {
      onChange(e, newValue);
    }

    if (onSearch && reason === 'input') {
      onSearch(newValue);
    }
    if (onInputChangeProp) {
      onInputChangeProp(newValue, reason, e);
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

export const useSize = (props: SelectProps): 'small' | 'medium' => {
  const defaultSize = 'small';
  const { size = defaultSize } = props;

  return React.useMemo(() => {
    const sizeMap = {
      small: 'small',
      middle: 'medium',
      medium: 'medium',
    };
    return sizeMap[size] as 'small' | 'medium';
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
    freeSolo = false,
    label,
    loading,
    loadingIndicator,
    placeholder,
    showSearch: showSearchProp = true,
    size,
    tagMode = false,
    variant = 'outlined',
  } = React.useContext(SelectComponentContext);

  const showSearch =
    tagMode === true || freeSolo === true ? true : showSearchProp;

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
    override_InputProps.endAdornment = (
      <div style={{ position: 'absolute', right: 6 }}>
        {loadingIndicator || <CircularProgress size={20} color="primary" />}
      </div>
    );
  }
  const InputProps = { ...InputPropsProp, ...override_InputProps };

  const newProps = {
    ...restProps,
    label,
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

  return <Popper {...newProps} />;
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
    check,
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
  const { inputValue, selected } = state;

  const className = `${classNameProp} ${optionClassName}`
    .replaceAll('undefined', '')
    .replaceAll('false', '');

  const style = optionStyle;

  const { operated: operatedOption, origin: originOption } = getOption(value);

  const defaultLabel =
    operatedOption.label ||
    operatedOption.value ||
    (value !== null && value !== undefined ? String(value) : '');

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

  const checkLabel = check && <Checkbox checked={selected} />;

  const propLabel =
    getOptionLabelProp && getOptionLabelProp(originOption, state, parts);

  const children = (
    <>
      {checkLabel}
      {propLabel || highlightLabel || defaultLabel}
    </>
  );

  const newProps = { ...restProps, className, style, children };

  if (OptionComponent) return <OptionComponent {...newProps} />;

  return <li {...newProps} />;
}

export default Select;
