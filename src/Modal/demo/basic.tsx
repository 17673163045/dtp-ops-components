import React from 'react';
import { Button } from '@mui/material';
import useVisible from '../../../hooks/useVisible';
import Modal from '../Modal';

function Basic() {
  const { visible, open, close } = useVisible();

  return (
    <div>
      <Button color="primary" variant="contained" onClick={open}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={visible} onCancel={close}>
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </div>
  );
}

export default Basic;
