import React from 'react';
import { Button } from '@mui/material';

import useVisible from '../../../hooks/useVisible';
import Modal from '../Modal';

function FullScreen() {
  const { visible, open, close } = useVisible();

  return (
    <div>
      <Button color="primary" variant="contained" onClick={open}>
        Open Modal with FullScreen
      </Button>
      <Modal
        closable={false}
        footer={null}
        visible={visible}
        onCancel={close}
        fullScreen
      >
        <div
          style={{
            height: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button color="primary" variant="contained" onClick={close}>
            close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default FullScreen;
