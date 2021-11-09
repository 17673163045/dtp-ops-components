import React from 'react';
import { Button } from '@mui/material';
import { useVisible } from '../../../hooks';
import Modal from '../Modal';

function DrawerType() {
  const { visible, open, close } = useVisible();

  return (
    <div>
      <Button variant="contained" onClick={open}>
        Drawer Modal
      </Button>
      <Modal
        visible={visible}
        onCancel={close}
        footerStyle={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
        bodyStyle={{ height: 'calc(100% - 180px)', overflowX: 'hidden' }}
        title="This is a drawer modal"
        type="drawer"
      >
        <div>this is a content...</div>
        <div style={{ height: 1000 }}></div>
        <div>this is a content...</div>
      </Modal>
    </div>
  );
}

export default DrawerType;
