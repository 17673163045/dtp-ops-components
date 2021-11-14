---
type: 反馈
category: Components
subtitle: 对话框
title: Modal
---

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

### 基本

<code desc='第一个对话框' src='./demo/basic.tsx'></code>

### 自定义 title

<code desc='传入`title`设置标题; `titleStyle`可以修改标题样式; `borderBottom`属性控制标题`分割线`; 如果不需要标题,不传title即可; `closable`控制是否需要标题上的关闭按钮; `closeIconStyle`修改关闭按钮样式; `closeIcon`可以自定义关闭按钮' src='./demo/title.tsx'></code>

### 自定义页脚

<code desc='`footerStyle`可以修改页脚样式; `borderTop`属性控制页脚`分割线`; 传入`footer`可以覆盖`默认页脚`; 如果不需要页脚，你可以把 `footer 设为 null`' src='./demo/footer.tsx'></code>

### 自定义页脚按钮

<code desc='`buttons`传入`ok`或`cancel`可以获得单个按钮,传入数组`<String>[]`可以方便地调整按钮位置,传入`<ReactNode>[]`可以自定义一组按钮; `okButtonProps`和`cancelButtonProps`的值会分别传入确认按钮和取消按钮' src='./demo/buttons.tsx'></code>

### 异步关闭

<code desc='点击确认按钮异步关闭,比如提交表单' src='./demo/asyncClose.tsx'></code>

### 弹窗宽度

<code desc='`width`设置弹窗的宽度, 也可以用`style`设置宽度,推荐用 style 设置`width`为百分比和设置`maxWidth`可以保证弹窗宽度不会超过窗口宽度' src='./demo/width.tsx'></code>

### 全屏弹窗

<code desc='设置fullScreen为true可以设置弹窗为全屏' src='./demo/fullScreen.tsx'></code>

### 弹窗位置

<code desc='设置`centered`为true使弹窗上下左右居中; `top`可以调整弹窗位置' src='./demo/top.tsx'></code>

### 遮罩

<code desc='`mask`设置是否需要弹窗遮罩层; `maskStyle`设置遮罩层的样式; `maskClosable`设置为`false`点击蒙层将不可关闭弹窗' src='./demo/mask.tsx'></code>

### 过渡动画

<code desc='`transitionDirection`设置弹窗进场动画,包含四个方向' src='./demo/transition.tsx'></code>

### confirm

<code title='确认对话框' desc='使用`Modal.confirm(config:ModalProps)`可以快捷地弹窗确认框,' src='./demo/confirm.tsx'></code>

### 抽屉弹窗

<code title='抽屉弹窗' desc='使用`type=drawer`弹窗将以抽屉的模式展示,可以在简单的抽屉场景下使用,其余api均和Modal保持一致' src='./demo/drawerType.tsx'></code>

## API

| 参数                | 说明                                                                                                           | 类型                                               | 默认值         | 版本 |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------- | ---- |
| afterClose          | Modal 完全关闭后的回调                                                                                         | function                                           | 无             |      |
| bodyStyle           | Modal body 样式                                                                                                | React.CSSProperties                                | 无             |      |
| buttons             | 定义 footer 下的按钮展示                                                                                       | cancel \| ok \| string[] \| ReactNode[]            | 无             |      |
| cancelText          | 取消按钮文字                                                                                                   | string \| ReactNode                                | Cancel         |      |
| centered            | 垂直居中展示 Modal                                                                                             | Boolean                                            | `true`         |      |
| closable            | 是否显示右上角的关闭按钮                                                                                       | boolean                                            | true           |      |
| closeIcon           | 自定义关闭图标                                                                                                 | ReactNode                                          | -              |      |
| closeIconStyle      | 自定义关闭图标样式                                                                                             | React.CSSProperties                                | 无             |      |
| confirmLoading      | 确定按钮 loading                                                                                               | boolean                                            | 无             |      |
| destroyOnClose      | 关闭时销毁 Modal 里的子元素                                                                                    | boolean                                            | false          |      |
| footer              | 可以传新的 ReactNode 完全自定义底部内容; 可以传`footer={null}`取消底部; 可以传函数保留取消按钮和确认按钮的引用 | string \| ReactNode \| (buttons: any[])=>ReactNode | 确定和取消按钮 |      |
| footerStyle         | 设置页脚的样式                                                                                                 | React.CSSProperties                                | 无             |      |
| fullScreen          | 设置弹窗为全屏样式                                                                                             | boolean                                            | false          |      |
| keyboard            | 是否支持键盘 esc 关闭                                                                                          | boolean                                            | true           |      |
| mask                | 是否展示遮罩                                                                                                   | Boolean                                            | true           |      |
| maskClosable        | 点击蒙层是否允许关闭                                                                                           | boolean                                            | true           |      |
| maskStyle           | 遮罩样式                                                                                                       | object                                             | {}             |      |
| okText              | 确认按钮文字                                                                                                   | string \| ReactNode                                | 确定           |      |
| okButtonProps       | ok 按钮 props                                                                                                  | `@mui/material/Button/ButtonProps`                 | -              |      |
| cancelButtonProps   | cancel 按钮 props                                                                                              | `@mui/material/Button/ButtonProps`                 | -              |      |
| style               | 可用于设置浮层的样式，调整浮层位置等                                                                           | React.CSSProperties                                | -              |      |
| title               | 标题                                                                                                           | string \| ReactNode                                | 无             |      |
| titleStyle          | 设置标题样式调                                                                                                 | function                                           | 无             |      |
| top                 | 设置弹窗浮层距离顶部的高度                                                                                     | string \| number                                   | 无             |      |
| transitionDirection | 设置弹窗显示的方向动画                                                                                         | left \| right \| top \| bottom                     | 无             |      |
| type                | 设置弹窗为抽屉形式                                                                                             | drawer \| modal                                    | 无             |      |
| visible             | 对话框是否可见                                                                                                 | boolean                                            | 无             |      |
| width               | 宽度                                                                                                           | string \| number                                   | 520            |      |
| zIndex              | 设置 Modal 的 `z-index`                                                                                        | Number                                             | 3000           |      |
| onCancel            | 点击遮罩层或右上角叉或取消按钮的回调                                                                           | function(e)                                        | 无             |      |
| onOk                | 点击确定回调                                                                                                   | function(e)                                        | 无             |      |

#### 注意

> `<Modal />` 默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 `destroyOnClose`。
