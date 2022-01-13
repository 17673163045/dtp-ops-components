/*
{
  clearIcon?: any;
  className?: string;
  defaultValue?: any;
  dropdownClassName?: string;
  dropdownStyle?: Style;
  dropdownRender?: (originList: any) => any;
  filterOption?: false | ((inputValue: string, option: Option) => boolean);
  getInputFillText?: (option: Option) => string;
  getOptionDisabled?: (option: Option) => boolean;
  getOptionLabel?: (
    option: Option,
    state: OptionState,
    parts?: any[],
  ) => React.ReactNode | undefined | null;
  groupBy?: (option: Option) => string;
  highlightOptions?: { insideWords?: boolean; findAllOccurrences?: boolean };
  highlightStyle?: React.CSSProperties;
  label?: any;
  labelMap?: string;
  limitTags?: number;
  ListboxComponent?: any;
  listHeight?: number | string;
  listStyle?: React.CSSProperties;
  loadingIndicator?: string | React.ReactNode;
  loadingText?: any;
  notFoundContent?: any;
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
  style?: Style;
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
*/

import React from 'react';
import Select from '../Select';
import { Switch, Button, Paper } from '@mui/material';

export default function Apis() {
  const [options, setOptions] = React.useState<any>([]);
  const [value, setValue] = React.useState<any>();
  const [forceOpen, setForceOpen] = React.useState(false);

  const [booleanApis, setBooleanApis] = React.useState<any>({
    allowClear: true,
    check: false,
    disabled: false,
    disableCloseOnSelect: false,
    disablePortal: false,
    dropdownMatchSelectWidth: true,
    fullWidth: false,
    freeSolo: false,
    highlight: false,
    labelInValue: false,
    loading: false,
    multiple: false,
    open: false,
    showSearch: true,
    showArrow: true,
    tagMode: false,
    tagModePush: true,
  });

  async function getOptions() {
    setBooleanApis((pre: any) => ({ ...pre, loading: true }));
    const data = await asyncGetOptions();
    setOptions(data);
    setBooleanApis((pre: any) => ({ ...pre, loading: false }));
  }

  function clearOptions() {
    setOptions([]);
  }

  function alertValue() {
    alert(JSON.stringify(value));
  }

  function onChange(newValue: any) {
    setValue(newValue);
  }

  function onForceOpen() {
    setForceOpen((pre) => !pre);
    setBooleanApis((pre: any) => ({ ...pre, open: !forceOpen }));
  }

  React.useEffect(() => {
    getOptions();
  }, []);

  const renderBtns = (
    <Paper style={{ margin: 20, padding: '20px 20px 0 20px' }}>
      <Button
        variant="contained"
        style={{ textTransform: 'none', margin: '0 20px 20px 0' }}
        onClick={getOptions}
      >
        Get options
      </Button>

      <Button
        variant="contained"
        style={{ textTransform: 'none', margin: '0 20px 20px 0' }}
        onClick={clearOptions}
      >
        Clear options
      </Button>

      <Button
        variant="contained"
        style={{ textTransform: 'none', margin: '0 20px 20px 0' }}
        onClick={alertValue}
      >
        Alert value
      </Button>

      <Button
        variant="contained"
        style={{ textTransform: 'none', margin: '0 20px 20px 0' }}
        onClick={onForceOpen}
      >
        Force open
      </Button>
    </Paper>
  );

  const renderBooleanSwitches = Object.keys(booleanApis).map((key) => {
    const value = booleanApis[key];
    const label = apiLabelMap[key];
    return (
      <div
        style={{
          width: '25%',
          height: 60,
          float: 'left',
          minWidth: 270,
          paddingRight: 20,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            verticalAlign: 'top',
            paddingRight: 20,
          }}
        >
          <div>{key}</div>
          <div>{`(${label})`}</div>
        </div>
        <Switch
          key={key}
          checked={value}
          onChange={(e) =>
            setBooleanApis((pre: any) => ({ ...pre, [key]: e.target.checked }))
          }
        />
      </div>
    );
  });

  return (
    <div>
      <div style={{ margin: '0 0 20px 20px' }}>
        <Select
          labelMap="name"
          valueMap="id"
          value={value}
          onChange={onChange}
          {...booleanApis}
          options={options}
          style={{
            width: booleanApis.fullWidth ? '100%' : 300,
            transition: 'all 0.3s',
          }}
          onOpenChange={(open) => {
            if (forceOpen) return;
            setBooleanApis((pre: any) => ({ ...pre, open }));
          }}
        />
      </div>

      {renderBtns}

      <Paper style={{ margin: 20, padding: 20 }}>
        {renderBooleanSwitches}
        <div style={{ clear: 'both' }}></div>
      </Paper>
    </div>
  );
}

const optionsList = [
  { name: 'Jack', id: 1, email: '12AFF@gamil.com' },
  { name: 'Lucy', id: 2, email: 'r55555@gamil.com' },
  { name: 'Tom', id: 3, email: '22777@gamil.com' },
];

const asyncGetOptions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(optionsList);
    }, 1000);
  });
};

const apiLabelMap: any = {
  allowClear: '允许清除按钮',
  check: '每一项前渲染checkbox',
  disabled: '禁用',
  disableCloseOnSelect: '选中不关闭弹窗',
  disablePortal: '弹窗渲染在父元素下',
  dropdownMatchSelectWidth: '弹窗和输入框等宽',
  fullWidth: '宽度100%',
  freeSolo: '自由输入不被清空',
  highlight: '搜索高亮',
  labelInValue: '值是一个包含label的对象',
  loading: '加载中',
  multiple: '多选',
  open: '弹窗开关',
  showSearch: '输入框可输入',
  showArrow: '箭头图标按钮',
  tagMode: 'tag模式自由创造',
  tagModePush: '自由创造并添加到下拉框',
};
