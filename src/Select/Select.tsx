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

const SelectComponentContext = React.createContext<any>({} as any);

function Select(props: SelectProps) {
  const {
    autoHighlight = false,
    filterOption,
    getOptionDisabled: getOptionDisabledFp,
    getOptionLabel: getOptionLabelFp,
    groupBy: groupByFp,
    highlightOptions,
    highlightStyle,
    labelMap = 'label',
    renderOption: renderOptionFp,
    valueMap = 'value',
  } = props;

  const propNameMap = usePorpNameMap(props);

  const size = useSize(props);

  const className = useClassName(props);

  const openProps = useDropdownOpen(props);

  const valueProps = useSelectValue(props);

  const options = useOptions(props);

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

  function getOption(optionValue: OptionValue) {
    const optionKey = `${optionValue}.${typeof optionValue}`;
    const option = optionValueMapItem[optionKey] || {};
    return option;
  }

  function getInputFillText(optionValue: OptionValue): string {
    const option = getOption(optionValue);
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
    const option = getOption(optionValue);

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
    if (filterOption === false) return options;

    const defaultFilterFn = (inputValue: any, option: any) => {
      const label = option[labelMap] || '';
      return String(label).toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    };

    const filterFn =
      typeof filterOption === 'function' ? filterOption : defaultFilterFn;

    return options.filter((optionValue: any) => {
      const option = getOption(optionValue);
      return filterFn(inputValue, option);
    });
  }

  function groupBy(optionValue: OptionValue) {
    const option = getOption(optionValue);
    if (groupByFp) return groupByFp(option);
    return '';
  }

  const components = {
    PopperComponent,
    PaperComponent,
    ListboxComponent,
  };

  const contextValue = { ...props, size, options, ...valueProps, ...openProps };

  return (
    <SelectComponentContext.Provider value={contextValue}>
      <Autocomplete
        {...propNameMap}
        {...valueProps}
        {...openProps}
        {...components}
        {...propNameMap}
        className={className}
        filterOptions={filterOptions}
        getOptionDisabled={getOptionDisabled}
        getOptionLabel={getInputFillText}
        groupBy={groupByFp && groupBy}
        options={valueList}
        renderInput={RenderInput}
        renderOption={renderOption}
      />
    </SelectComponentContext.Provider>
  );
}

export const usePorpNameMap = (props: SelectProps) => {
  const {
    loading,
    style,
    allowClear,
    clearIcon: clearIconProp,
    removeIcon,
    showArrow,
    multiple,
    defaultActiveFirstOption = true,
  } = props;

  const clearIcon = !allowClear ? null : clearIconProp || removeIcon;

  const disableCloseOnSelect =
    'disableCloseOnSelect' in props ? props.disableCloseOnSelect : !!multiple;

  const popupIcon =
    typeof showArrow === 'boolean' ? (showArrow ? undefined : null) : showArrow;

  const autoHighlight = !!defaultActiveFirstOption;

  const noOptionsText = props.notFoundContent;

  return {
    loading,
    style,
    clearIcon,
    multiple,
    popupIcon,
    disableCloseOnSelect,
    autoHighlight,
    noOptionsText,
  };
};

export const useOptions = (props: SelectProps) => {
  const { options, labelMap = 'label', valueMap = 'value' } = props;

  return React.useMemo(() => {
    const defaultOptions: any[] = [];
    if (!('options' in props) || options === null || options === undefined)
      return defaultOptions;
    if (!Array.isArray(options))
      throw new Error('Select Options must be array!');

    const isOptionNotObj = options.some((item) => typeof item !== 'object');
    if (isOptionNotObj) {
      return options.map((item) => ({ [labelMap]: item, [valueMap]: item }));
    }
    return options;
  }, [options]);
};

export const useSelectValue = (props: SelectProps) => {
  const {
    defaultValue,
    value: valueProp,
    multiple,
    onChange: onChangeProp,
  } = props;

  const valueObj = React.useMemo(() => {
    if ('value' in props) {
      const value =
        valueProp === undefined ? (multiple === true ? [] : null) : valueProp;
      return { value };
    }
    return {};
  }, [valueProp, multiple]);

  function onChange(e: React.SyntheticEvent, newValue: any) {
    if (onChangeProp) return onChangeProp(newValue, e);
  }

  return { defaultValue, ...valueObj, onChange };
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
  const { PopperComponent: PopperComponentFp } = React.useContext(
    SelectComponentContext,
  );

  if (PopperComponentFp) return <PopperComponentFp {...props} />;

  return <Popper {...props}></Popper>;
}

// 下拉框容器组件
export function PaperComponent(props: any) {
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
export const ListboxComponent = React.forwardRef(function (props: any, ref) {
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
