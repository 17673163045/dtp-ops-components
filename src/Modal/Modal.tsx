import { ButtonProps } from '@mui/material/Button';
type TransitionDirection = 'left' | 'right' | 'up' | 'down';
export interface ModalProps {
  visible?: boolean;
  keyboard?: boolean;
  confirmLoading?: boolean;
  title?: React.ReactNode | string;
  titleStyle?: React.CSSProperties;
  closable?: boolean;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  afterClose?: (...args: any[]) => any;
  top?: string | number;
  centered?: boolean;
  width?: string | number;
  footer?: React.ReactNode | Function | null;
  footerStyle?: React.CSSProperties;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  maskClosable?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  closeIcon?: React.ReactNode;
  closeIconStyle?: React.CSSProperties;
  children?: any;
  content?: any;
  fullScreen?: boolean;
  transitionDirection?: TransitionDirection;
  buttons?: 'cancel' | 'ok' | string[] | React.ReactNode[];
  type?: 'modal' | 'drawer';
}

export const destroyFns: Array<() => void> = [];

import React from 'react';

import { styled } from '@mui/styles';
import confirm from './confirm';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Slide,
} from '@mui/material';
import { LoadingButton as Button } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

function Modal(props: ModalProps) {
  const {
    visible: outVisible,
    onCancel,
    afterClose,
    maskClosable = true,
    destroyOnClose = false,
    keyboard = true,
    transitionDirection: transitionDirectionFp,
    type,
  } = props;

  const transitionDirection = transitionDirectionFp
    ? transitionDirectionFp
    : type === 'drawer'
    ? 'left'
    : undefined;

  const { visible, close } = useModalVisible(outVisible);

  const { isTitleRender, modalTitle } = useModalTitle(props);

  const { modalCloseIcon } = useModalCloseIcon(props, { isTitleRender, close });

  const { modalContent } = useModalContent(props);

  const { actionButtons } = useActionButtons(props, {
    close,
  });

  const { modalFooter } = useModalFooter(props, {
    actionButtons,
    close,
  });

  const Transition = useTransitionDirection(transitionDirection);

  const ModalStyleOverride = useModalStyleOverride(props, {
    transitionDirection,
  });

  function onClose(e: any, reason: any) {
    if (reason === 'backdropClick' && !maskClosable) return;
    if (onCancel) {
      onCancel(e, reason);
    } else {
      close();
    }
    setTimeout(() => {
      afterClose?.();
    }, 100);
  }

  if (destroyOnClose && !visible) return null;

  return (
    <ModalStyleOverride
      maxWidth={false}
      open={visible as any}
      onClose={onClose}
      disableEscapeKeyDown={!keyboard}
      TransitionComponent={Transition}
      keepMounted={!destroyOnClose}
    >
      {modalCloseIcon}
      {modalTitle}
      {modalContent}
      {modalFooter}
    </ModalStyleOverride>
  );
}

export const useModalVisible = (visibleOut: any) => {
  const [visible, setVisible] = React.useState<any>(visibleOut);

  React.useEffect(() => {
    setVisible(visibleOut);
  }, [visibleOut]);

  function close() {
    setVisible(false);
  }

  function open() {
    setVisible(true);
  }

  function toggle() {
    setVisible((pre: any) => !pre);
  }

  return { visible, open, close, toggle };
};

export const useModalTitle = (
  props: Pick<ModalProps, 'title' | 'titleStyle'>,
) => {
  const { title, titleStyle } = props;

  const isTitleRender = !(
    title === false ||
    title === null ||
    title === undefined
  );

  const modalTitle = React.useMemo(() => {
    return isTitleRender ? (
      <DialogTitle
        style={{
          boxSizing: 'border-box',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          ...(titleStyle || {}),
        }}
      >
        {title}
      </DialogTitle>
    ) : null;
  }, [title, JSON.stringify(titleStyle)]);

  return { isTitleRender, modalTitle };
};

export const useModalCloseIcon = (
  props: Pick<
    ModalProps,
    'onCancel' | 'closable' | 'closeIcon' | 'closeIconStyle'
  >,
  { isTitleRender }: any,
) => {
  const { onCancel, closable = true, closeIcon, closeIconStyle } = props;

  const modalCloseIcon = React.useMemo(() => {
    if (!closable) return null;

    const { left, right, top, bottom, ...restCloseIconStyle } =
      closeIconStyle || {};

    const renderCloseIcon = (
      <IconButton
        onClick={onCancel}
        style={{
          position: 'absolute',
          zIndex: 1,
          left,
          bottom,
          top: top || 8,
          right: right || 8,
        }}
      >
        {closeIcon || <CloseIcon style={restCloseIconStyle} />}
      </IconButton>
    );

    return isTitleRender ? (
      renderCloseIcon
    ) : (
      <div style={{ height: 20 }}>{renderCloseIcon}</div>
    );
  }, [
    closable,
    closeIcon,
    JSON.stringify(closeIconStyle),
    onCancel,
    isTitleRender,
  ]);

  return { modalCloseIcon };
};

export const useModalContent = (
  props: Pick<ModalProps, 'content' | 'children'>,
) => {
  const { content, children } = props;

  const modalContent = React.useMemo(() => {
    return <DialogContent>{content || children}</DialogContent>;
  }, [children, content]);

  return { modalContent };
};

export const useModalFooter = (
  props: Pick<ModalProps, 'footer' | 'footerStyle'>,
  { actionButtons, close }: any,
) => {
  const { footer, footerStyle } = props;

  const defaultFooterStyle: any = {
    boxSizing: 'border-box',
    padding: '12px 16px',
    textAlign: 'right',
    borderTop: '1px solid rgba(0,0,0,0.12)',
  };

  const modalFooter = React.useMemo(() => {
    if (footer === null || footer === false) return null;

    if (typeof footer === 'function') return footer(actionButtons, close);

    if (footer !== undefined) return footer;

    return (
      <div
        style={{
          ...defaultFooterStyle,
          ...(footerStyle || {}),
        }}
      >
        {actionButtons}
      </div>
    );
  }, [footer, actionButtons, JSON.stringify(footerStyle)]);

  return { modalFooter };
};

export const useActionButtons = (
  props: Pick<
    ModalProps,
    | 'onCancel'
    | 'cancelText'
    | 'cancelButtonProps'
    | 'buttons'
    | 'onOk'
    | 'okText'
    | 'confirmLoading'
    | 'okButtonProps'
  >,
  { close }: any,
): { actionButtons: any[] } => {
  const { onCancel, cancelText = 'Cancel', cancelButtonProps, buttons } = props;

  const { onOk, okText = 'Submit', confirmLoading, okButtonProps } = props;

  function onOkClick(...args: any[]) {
    if (onOk) return onOk(close, ...args);
  }

  function onCancelClick(...args: any[]) {
    if (onCancel) return onCancel(...args);
    close();
  }

  const cancelButton = React.useMemo(() => {
    return (
      <Button
        variant="outlined"
        color="primary"
        {...((cancelButtonProps as any) || {})}
        style={{ margin: '0px 8px', ...(cancelButtonProps?.style || {}) }}
        onClick={onCancelClick}
      >
        {cancelText}
      </Button>
    );
  }, [cancelText, onCancel, cancelButtonProps]);

  const okButton = React.useMemo(() => {
    return (
      <Button
        variant="contained"
        color="primary"
        loading={confirmLoading}
        {...(okButtonProps as any)}
        style={{ margin: '0px 8px', ...(okButtonProps?.style || {}) }}
        onClick={onOkClick}
      >
        {okText}
      </Button>
    );
  }, [okText, onOk, confirmLoading, okButtonProps]);

  const buttonsMap: any = {
    cancel: cancelButton,
    ok: okButton,
  };

  const actionButtons = React.useMemo(() => {
    let _buttons;
    if (!buttons) {
      _buttons = ['cancel', 'ok'];
    } else if (Array.isArray(buttons)) {
      _buttons = buttons;
    } else {
      _buttons = [buttons];
    }

    return _buttons.map((item) => {
      const cancelOrOk = buttonsMap[String(item)];
      if (cancelOrOk) return cancelOrOk;
      return item;
    });
  }, [buttons, okButton, cancelButton]);

  return { actionButtons };
};

export const useTransitionDirection = (
  transitionDirection: TransitionDirection | undefined,
) => {
  if (!transitionDirection) return;

  return React.useMemo(
    () =>
      React.forwardRef(function Transition(props: any, ref) {
        return <Slide direction={transitionDirection} ref={ref} {...props} />;
      }),
    [transitionDirection],
  );
};

export const useModalStyleOverride = (
  props: Pick<
    ModalProps,
    | 'zIndex'
    | 'mask'
    | 'top'
    | 'width'
    | 'centered'
    | 'fullScreen'
    | 'style'
    | 'maskStyle'
    | 'bodyStyle'
    | 'type'
  >,
  { transitionDirection }: any,
) => {
  const {
    zIndex,
    mask = true,
    top = 200,
    width = 520,
    centered = true,
    fullScreen,
    style,
    maskStyle,
    bodyStyle,
    type,
  } = props;

  return React.useMemo(
    () => {
      const useCentered = centered && !fullScreen && !('top' in props);
      const isDrawerType = type === 'drawer';
      const transitionHorizontal =
        transitionDirection === 'left' || transitionDirection === 'right';
      const transitionColumn =
        transitionDirection === 'down' || transitionDirection === 'up';
      const drawerTypeTransitionHorizontalStyle = {
        height: '100%',
        maxHeight: '100%',
        borderRadius: 0,
        position: 'absolute',
        left: transitionDirection === 'right' ? 0 : undefined,
        right: transitionDirection === 'left' ? 0 : undefined,
      };
      const drawerTypeTransitionColumnStyle = {
        width: '100%',
        maxWidth: '100%',
        borderRadius: 0,
        position: 'absolute',
        top: transitionDirection === 'down' ? 0 : undefined,
        bottom: transitionDirection === 'up' ? 0 : undefined,
      };

      const drawerTypeStyle = !isDrawerType
        ? {}
        : transitionHorizontal
        ? drawerTypeTransitionHorizontalStyle
        : transitionColumn
        ? drawerTypeTransitionColumnStyle
        : {};

      return styled(Dialog)(() => ({
        // root
        '&.MuiDialog-root': { zIndex },
        // mask
        '& .MuiBackdrop-root': {
          display: mask ? 'block' : 'none',
          ...(maskStyle || {}),
        },
        // outer
        '& .MuiDialog-container': {
          ...(useCentered
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : { display: 'block' }),
        },
        // wrapper
        '& .MuiPaper-root': {
          top: useCentered ? undefined : top,
          width,
          display: 'block',
          margin: '0 auto',
          ...(fullScreen
            ? {
                margin: 0,
                top: 0,
                left: 0,
                borderRadius: 0,
                height: '100%',
                minHeight: '100vh',
                maxHeight: '100vh',
                width: '100%',
                minWidth: '100%',
              }
            : {}),
          ...drawerTypeStyle,
          ...(style || {}),
        },
        // title
        '& .MuiDialogTitle-root': {
          position: 'relative',
          padding: '16px 24px',
        },
        // body
        '& .MuiDialog-container .MuiDialogContent-root': {
          padding: 24,
          maxHeight: 'unset',
          overflow: 'auto',
          ...(bodyStyle || {}),
        },
      }));
    },
    [
      type,
      transitionDirection,
      zIndex,
      mask,
      top,
      width,
      centered,
      fullScreen,
      style,
      JSON.stringify(maskStyle),
      JSON.stringify(bodyStyle),
    ].map((i) => JSON.stringify(i)),
  );
};

Modal.confirm = function confirmFn(props: ModalProps) {
  const config: any = {
    type: 'confirm',
    ...props,
  };
  return confirm(config);
};

export default Modal;
