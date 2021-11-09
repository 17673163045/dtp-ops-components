import React from 'react';
import { Button } from '@mui/material';
import useVisible from '../../../hooks/useVisible';
import Modal from '../Modal';

function AsyncClose() {
  const [okLoading, setOkLoading] = React.useState(false);

  const { visible, open, close } = useVisible();

  function asyncFn() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }

  function onOk() {
    setOkLoading(true);
    asyncFn().then((res) => {
      if (res) {
        setOkLoading(false);
        close();
      }
    });
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={open}>
        Open Modal with async logic
      </Button>

      <Modal
        title="Title"
        visible={visible}
        onCancel={close}
        onOk={onOk}
        confirmLoading={okLoading}
      >
        <div>The modal will be closed after two seconds</div>
      </Modal>
    </div>
  );
}

export default AsyncClose;
