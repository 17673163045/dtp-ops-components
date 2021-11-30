---
category: Components
subtitle: Select
title: Select
---

下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。

## 代码演示

### 允许清除 allowClear

<code src='./demo/allowClear.tsx'></code>

### 自动搜索高亮 autoHighlight

<code src='./demo/autoHighlight.tsx'></code>

### 默认第一个高亮 defaultActiveFirstOption

<code src='./demo/defaultActiveFirstOption.tsx'></code>

### 默认打开 defaultOpen

<code src='./demo/defaultOpen.tsx'></code>

### 默认值 defaultValue

<code src='./demo/defaultValue.tsx'></code>

### 禁用 disabled

<code src='./demo/disabled.tsx'></code>

### 选中禁止关闭 disableCloseOnSelect

<code src='./demo/disableCloseOnSelect.tsx'></code>

### 下拉框渲染在父元素下 disablePortal

<code src='./demo/disablePortal.tsx'></code>

### 下拉框类名 dropdownClassName

<code src='./demo/dropdownClassName.tsx'></code>

### 下拉框样式 dropdownStyle

<code src='./demo/dropdownStyle.tsx'></code>

### 下拉框同宽 dropdownMatchSelectWidth

<code src='./demo/dropdownMatchSelectWidth.tsx'></code>

### 自定义下拉框 dropdownRender

<code src='./demo/dropdownRender.tsx'></code>

### 过滤搜索函数 filterOption

<code src='./demo/filterOption.tsx'></code>

### 禁用项 getOptionDisabled

<code src='./demo/getOptionDisabled.tsx'></code>

### 自定义 option 文本 getOptionLabel

<code src='./demo/getOptionLabel.tsx'></code>

### 分组 groupBy

<code src='./demo/groupBy.tsx'></code>

### 加载中 loading

<code src='./demo/loading.tsx'></code>

### 多选 multiple

<code src='./demo/multiple.tsx'></code>

### 控制下拉框显示 open

<code src='./demo/open.tsx'></code>

### 选项数组 options

<code src='./demo/options.tsx'></code>

### placeholder

<code src='./demo/placeholder.tsx'></code>

### 自定义清除按钮 removeIcon

<code src='./demo/removeIcon.tsx'></code>

### 自定义下拉按钮 showArrow

<code src='./demo/showArrow.tsx'></code>

### 输入框可输入 showSearch

<code src='./demo/showSearch.tsx'></code>

### 大小 size

<code src='./demo/size.tsx'></code>

### 输入框变体 variant

<code src='./demo/variant.tsx'></code>

### 下拉框滚动事件 onPopupScrollBottom

<code src='./demo/onPopupScrollBottom.tsx'></code>

## API

### Select props

| 参数                     | 说明                                                                                                                                                       | 类型                                                                                                           | 默认值                                      | 版本 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---- |
| allowClear               | 支持清除                                                                                                                                                   | boolean                                                                                                        | false                                       |      |
| autoHighlight            | 搜索模式匹配高亮字符                                                                                                                                       | boolean                                                                                                        | false                                       |      |
| className                | 给最外层容器添加类名                                                                                                                                       | string                                                                                                         |                                             |      |
| defaultActiveFirstOption | 是否默认高亮第一个选项                                                                                                                                     | boolean                                                                                                        | true                                        |      |
| defaultOpen              | 是否默认展开下拉菜单                                                                                                                                       | boolean                                                                                                        | -                                           |      |
| defaultValue             | 指定默认选中的条目                                                                                                                                         | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[]                              | -                                           |      |
| disabled                 | 是否禁用                                                                                                                                                   | boolean                                                                                                        | false                                       |      |
| disableCloseOnSelect     | 是否在选中之后关闭下拉框                                                                                                                                   | boolean                                                                                                        | multiple=true 时为 false,其余默认为 true    |      |
| disablePortal            | 下拉框弹窗默认渲染在 body 下面,设置为 true 下拉框将渲染在父元素下                                                                                          | boolean                                                                                                        | false                                       |      |
| dropdownClassName        | 下拉菜单的 className 属性                                                                                                                                  | string                                                                                                         | -                                           |      |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动                                                         | boolean \| number                                                                                              | true                                        |      |
| dropdownRender           | 自定义下拉框内容                                                                                                                                           | (originNode: ReactNode) => ReactNode                                                                           | -                                           |      |
| dropdownStyle            | 下拉菜单的 style 属性                                                                                                                                      | CSSProperties                                                                                                  | -                                           |      |
| filterOption             | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false                 | boolean \| function(inputValue, option)                                                                        | true                                        |      |
| getOptionDisabled        | 通过函数设置禁用的每一项                                                                                                                                   | (option) _=>_ _boolean_;                                                                                       |                                             |      |
| getOptionLabel           | 自定义选项的内容显示,不传的话默认显示 option[labelMap]                                                                                                     | (option,state:{selected:boolean,inputValue:string,highlightParts:any[]})=>React.ReactNode \| null \| undefined |                                             |      |
| groupBy                  | 对 option 分组,分组前确保选项按照它们分组的相同维度进行排序， 否则会看到重复的标题                                                                         | (option) _=>_ string;                                                                                          |                                             |      |
| highlightStyle           | 为高亮字母的容器设置样式                                                                                                                                   | React.CssProperty                                                                                              | {color:'red',fontWeight:700}                |      |
| highlightOptions         | 匹配高亮的规则配置`insideWords`如果为 false 只匹配首字母,否则匹配单词内的字母,`findAllOccurrences`如果为 false 匹配到第一个单词即停止匹配,否则匹配所有单词 | {insideWords:boolean,findAllOccurrences:boolean}                                                               | {insideWords:true,findAllOccurrences:false} |      |
| label                    | 设置 input 的内联 label 文本                                                                                                                               | string                                                                                                         |                                             |      |
| labelInValue             | 是否把每个选项的 labelMap 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { [valueMap]: string, [labelMap]: string } 的格式                     | boolean                                                                                                        | false                                       |      |
| labelMap                 | 取 option 上的一个属性作为每一项的显示文本,如果 option 是对象默认取 label 属性,不是对象 option 本身会被当作文本显示                                        | string                                                                                                         | 'label'                                     |      |
| loading                  | 加载中状态                                                                                                                                                 | boolean                                                                                                        | false                                       |      |
| loadingIndicator         | 自定义 input 后缀加载指示器                                                                                                                                | string \| ReactNode                                                                                            | -                                           |      |
| loadingText              | loading 状态时下拉框显示的内容                                                                                                                             | ReactNode                                                                                                      | 'loading...'                                |      |
| maxTagCount              | 最多显示多少个 tag，响应式模式会对性能产生损耗                                                                                                             | number \| `responsive`                                                                                         | -                                           |      |
| maxTagPlaceholder        | 隐藏 tag 时显示的内容                                                                                                                                      | ReactNode \| function(omittedValues)                                                                           | -                                           |      |
| maxTagTextLength         | 最大显示的 tag 文本长度                                                                                                                                    | number                                                                                                         | -                                           |      |
| menuItemSelectedIcon     | 自定义多选时当前选中的条目图标                                                                                                                             | ReactNode                                                                                                      | -                                           |      |
| multiple                 | 设置 Select 的模式为多选                                                                                                                                   | boolean                                                                                                        | false                                       |      |
| notFoundContent          | 当下拉列表为空时显示的内容                                                                                                                                 | ReactNode                                                                                                      | `no options`                                |      |
| open                     | 是否展开下拉菜单                                                                                                                                           | boolean                                                                                                        | -                                           |      |
| options                  | 数据化配置选项内容                                                                                                                                         | { [labelMap]:any, [valueMap]:any}\[] \| string[] \| number[]                                                   | -                                           |      |
| placeholder              | 选择框默认文本                                                                                                                                             | string                                                                                                         | -                                           |      |
| removeIcon               | 自定义的多选框清除图标                                                                                                                                     | ReactNode                                                                                                      | -                                           |      |
| renderOption             | 完全自定义每一项 Option                                                                                                                                    | (option,itemProps,state,highlightParts)=>ReactNode                                                             | -                                           |      |
| searchValue              | 控制搜索文本                                                                                                                                               | string                                                                                                         | -                                           |      |
| showArrow                | 是否显示下拉小箭头或者自定义下拉箭头                                                                                                                       | boolean \| ReactNode                                                                                           | -                                           |      |
| showSearch               | 使输入框可输入搜索                                                                                                                                         | boolean                                                                                                        | false                                       |      |
| size                     | 选择框大小                                                                                                                                                 | `middle` \| `small`                                                                                            | `small`                                     |      |
| style                    | 給最外层容器设置样式                                                                                                                                       | React.CSSProperties                                                                                            |                                             |      |
| tagRender                | 自定义 tag 内容 render，仅在 `mode` 为 `multiple` 或 `tags` 时生效                                                                                         | (props) => ReactNode                                                                                           | -                                           |      |
| tokenSeparators          | 在 `tags` 和 `multiple` 模式下自动分词的分隔符                                                                                                             | string\[]                                                                                                      | -                                           |      |
| value                    | 指定当前选中的条目，多选时为一个数组。（value 数组引用未变化时，Select 不会更新）                                                                          | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[]                              | -                                           |      |
| valueMap                 | 取 option 上的一个属性作为选中的值,如果 option 是对象默认取 value 属性,不是对象 option 本身为选中的值                                                      | string                                                                                                         | 'value'                                     |      |
| variant                  | input 输入框的三种变体                                                                                                                                     | 'outlined' \| 'filled' \| 'standard'                                                                           |                                             |      |
| virtual                  | 设置 false 时关闭虚拟滚动                                                                                                                                  | boolean                                                                                                        | true                                        |      |
| onBlur                   | 失去焦点时回调                                                                                                                                             | function                                                                                                       | -                                           |      |
| onChange                 | 选中 option，或 input 的 value 变化时，调用此函数                                                                                                          | function(value, option:Option \| Array&lt;Option>)                                                             | -                                           |      |
| onClear                  | 清除内容时回调                                                                                                                                             | function                                                                                                       | -                                           |      |
| onDeselect               | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple` 或 `tags` 模式下生效                                                                     | function(string \| number \| LabeledValue)                                                                     | -                                           |      |
| onOpenChange             | 展开下拉菜单的回调                                                                                                                                         | function(open,reason)                                                                                          |                                             |      |
| onDropdownVisibleChange  | 展开下拉菜单的回调                                                                                                                                         | function(open,reason)                                                                                          | -                                           |      |
| onFocus                  | 获得焦点时回调                                                                                                                                             | function                                                                                                       | -                                           |      |
| onInputKeyDown           | 按键按下时回调                                                                                                                                             | function                                                                                                       | -                                           |      |
| onMouseEnter             | 鼠标移入时回调                                                                                                                                             | function                                                                                                       | -                                           |      |
| onMouseLeave             | 鼠标移出时回调                                                                                                                                             | function                                                                                                       | -                                           |      |
| onPopupScroll            | 下拉列表滚动时的回调                                                                                                                                       | function                                                                                                       | -                                           |      |
| onSearch                 | 文本框值变化时回调                                                                                                                                         | function(value: string)                                                                                        | -                                           |      |
| onSelect                 | 被选中时调用，参数为选中项的 value (或 key) 值                                                                                                             | function(string \| number \| LabeledValue, option: Option)                                                     | -                                           |      |

>
