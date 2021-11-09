import React from 'react';
import { Button } from '@mui/material';
import Modal from '../Modal';

function ConfirmDefault() {
  function confirm() {
    Modal.confirm({ content: 'this is a default confirm modal' });
  }
  return (
    <Button onClick={confirm} variant="contained">
      Confirm
    </Button>
  );
}

function ConfirmMultiple() {
  function confirm() {
    Modal.confirm({ content: 'this is first modal' });

    setTimeout(() => {
      Modal.confirm({
        content: 'this is second modal',
        top: 300,
        mask: false,
        buttons: 'cancel',
        transitionDirection: 'left',
      });
    }, 1000);

    setTimeout(() => {
      Modal.confirm({
        content: 'this is third modal',
        top: 500,
        mask: true,
        buttons: 'ok',
        transitionDirection: 'right',
        onOk: (close) => {
          close();
        },
      });
    }, 2000);

    setTimeout(() => {
      Modal.confirm({
        content: 'this is four modal',
        top: 700,
        mask: true,
        footer: null,
        maskClosable: true,
        transitionDirection: 'up',
      });
    }, 3000);
  }
  return (
    <Button onClick={confirm} variant="contained">
      Confirm multiple
    </Button>
  );
}

function ConfirmAsyncClose() {
  function confirm() {
    const { update } = Modal.confirm({
      content: '异步关闭弹窗并使用loading confirm',
      onOk: (close) => {
        update({ confirmLoading: true });
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        }).then((res) => {
          if (!res) return;
          update({ confirmLoading: false });
          close();
        });
      },
    });
  }
  return (
    <Button onClick={confirm} variant="contained">
      Confirm Async Close
    </Button>
  );
}

function Confirm() {
  return (
    <div
      style={{ width: 520, display: 'flex', justifyContent: 'space-around' }}
    >
      <ConfirmDefault />
      <ConfirmMultiple />
      <ConfirmAsyncClose />
    </div>
  );
}

export default Confirm;
