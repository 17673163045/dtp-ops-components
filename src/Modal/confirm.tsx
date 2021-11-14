import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal, { ModalProps, destroyFns } from './Modal';

const IS_REACT_16 = !!ReactDOM.createPortal;

const ConfirmModal = (props: ModalProps) => {
  const { title } = props;

  const titleStyle = {
    paddingBottom: 0,
    borderBottom: 'none',
  };

  const footerStyle: any = {
    padding: '12px 16px',
    textAlign: 'right',
    borderTop: 'none',
    paddingTop: 0,
  };

  const cancelButtonProps: any = {
    variant: 'text',
    style: { fontWeight: 600 },
  };

  const okButtonProps: any = {
    autoFocus: true,
    variant: 'text',
    style: { fontWeight: 600 },
  };

  return (
    <Modal
      destroyOnClose
      top={100}
      closable={false}
      maskClosable={false}
      transitionDirection="down"
      title={title || 'Confirm'}
      okText="Confirm"
      titleStyle={titleStyle}
      footerStyle={footerStyle}
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      {...props}
    ></Modal>
  );
};

export default function confirm(config: ModalProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  let currentConfig = {
    visible: true,
    ...config,
  } as any;

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(props: any) {
    ReactDOM.render(<ConfirmModal {...props} />, div);
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
    };
    if (IS_REACT_16) {
      render(currentConfig);
    } else {
      destroy(...args);
    }
  }

  function update(newConfig: ModalProps) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}
