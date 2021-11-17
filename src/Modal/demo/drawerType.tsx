import React from 'react';
import { Button } from '@mui/material';
import { useVisible } from '../../../hooks';
import Modal from '../Modal';

function TopDrawer() {
  const { visible, open, close } = useVisible();

  return (
    <div>
      <Button
        variant="contained"
        onClick={open}
        style={{ margin: '0 16px 16px 0' }}
      >
        Top Drawer
      </Button>
      <Modal
        visible={visible}
        onCancel={close}
        title="This is a drawer modal"
        type="drawer"
        transitionDirection="down"
      >
        <div>this is a content...</div>
        <div>this is a content...</div>
      </Modal>
    </div>
  );
}

function BottomDrawer() {
  const { visible, open, close } = useVisible();

  return (
    <div>
      <Button
        variant="contained"
        onClick={open}
        style={{ margin: '0 16px 16px 0' }}
      >
        Bottom Drawer
      </Button>
      <Modal
        visible={visible}
        onCancel={close}
        title="This is a drawer modal"
        type="drawer"
        transitionDirection="up"
      >
        <div>this is a content...</div>
        <div>this is a content...</div>
      </Modal>
    </div>
  );
}

function LeftDrawer() {
  const { visible, open, close } = useVisible();

  return (
    <div>
      <Button
        variant="contained"
        onClick={open}
        style={{ margin: '0 16px 16px 0' }}
      >
        Left Drawer
      </Button>
      <Modal
        visible={visible}
        onCancel={close}
        footer={null}
        title="This is a drawer modal"
        type="drawer"
        transitionDirection="right"
      >
        <div>this is a content...</div>
        <div>this is a content...</div>
      </Modal>
    </div>
  );
}

function RightDrawer() {
  const { visible, open, close } = useVisible();

  return (
    <div>
      <Button
        variant="contained"
        onClick={open}
        style={{ margin: '0 16px 16px 0' }}
      >
        Right Drawer
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

function DrawerTypeModal() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <TopDrawer />
      <BottomDrawer />
      <LeftDrawer />
      <RightDrawer />
    </div>
  );
}

export default DrawerTypeModal;
