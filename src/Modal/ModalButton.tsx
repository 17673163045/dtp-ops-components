import { ModalProps } from './Modal';
import { ButtonProps } from '@mui/material/Button';
export interface ModalButtonProps extends ModalProps {
  triggerNode?: any;
  buttonProps?: ButtonProps;
  buttonText?: any;
}

import React from 'react';
import Modal from './Modal';
import { Button } from '@mui/material';

function ModalButton(props: ModalButtonProps, ref: any) {
  const {
    triggerNode,
    buttonProps,
    buttonText,
    onOk: onOkFp,
    onCancel: onCancelFp,
    ...restProps
  } = props;

  const [visible, setVisible] = React.useState(false);

  function close() {
    setVisible(false);
  }

  function open() {
    setVisible(true);
  }

  function onOk() {
    if (onOkFp) return onOkFp(close as any);
  }

  function onCancel(...args: any[]) {
    close();
    if (onCancelFp) return onCancelFp(...args);
  }

  const defaultTriggerNode = !triggerNode && (
    <Button
      variant="contained"
      color="primary"
      {...(buttonProps as any)}
      onClick={open}
    >
      {buttonText ?? 'Open'}
    </Button>
  );

  React.useImperativeHandle(
    ref,
    () => {
      return { visible, setVisible, close, open };
    },
    [visible],
  );

  return (
    <>
      {triggerNode
        ? React.cloneElement(triggerNode, {
            onClick: function () {
              open();
              return (
                triggerNode.props.onClick &&
                triggerNode.props.onClick(...arguments)
              );
            },
          })
        : defaultTriggerNode}
      <Modal {...restProps} visible={visible} onCancel={onCancel} onOk={onOk} />
    </>
  );
}

export default React.forwardRef(ModalButton);
