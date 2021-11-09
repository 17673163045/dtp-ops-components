import React from 'react';
import { Button } from '@mui/material';

import Modal from '../Modal';
import useVisible from '../../../hooks/useVisible';

function TitleModal() {
  const { visible, toggle } = useVisible();

  return (
    <>
      <Button color="primary" variant="contained" onClick={toggle}>
        title
      </Button>
      <Modal
        footer={null}
        visible={visible}
        onCancel={toggle}
        title="this is a custom title"
      >
        <div>some content...</div>
        <div>some content...</div>
        <div>some content...</div>
      </Modal>
    </>
  );
}

function NoTitleModal() {
  const { visible, toggle } = useVisible();

  return (
    <>
      <Button color="primary" variant="contained" onClick={toggle}>
        No Title
      </Button>
      <Modal footer={null} visible={visible} onCancel={toggle}>
        <div>some content...</div>
        <div>some content...</div>
        <div>some content...</div>
      </Modal>
    </>
  );
}

function TitleStyleModal() {
  const { visible, toggle } = useVisible();

  return (
    <>
      <Button color="primary" variant="contained" onClick={toggle}>
        Title Style
      </Button>
      <Modal
        titleStyle={{
          borderBottom: '2px solid red',
          color: '#fff',
          fontSize: 30,
          background: 'rgba(22,22,22,0.66)',
        }}
        title="this is a title"
        footer={null}
        visible={visible}
        onCancel={toggle}
      >
        <div>some content...</div>
        <div>some content...</div>
        <div>some content...</div>
      </Modal>
    </>
  );
}

function NoCloseAbleModal() {
  const { visible, toggle } = useVisible();

  return (
    <>
      <Button color="primary" variant="contained" onClick={toggle}>
        No CloseAble
      </Button>

      <Modal
        title="this is a no close icon button modal"
        closable={false}
        footer={null}
        visible={visible}
        onCancel={toggle}
      >
        <div>some content...</div>
        <div>some content...</div>
        <div>some content...</div>
      </Modal>
    </>
  );
}

function CloseIconStyleModal() {
  const { visible, toggle } = useVisible();

  return (
    <>
      <Button color="primary" variant="contained" onClick={toggle}>
        CloseIcon Style
      </Button>

      <Modal
        title="this is a title"
        closeIconStyle={{ color: 'red', fontSize: 30 }}
        footer={null}
        visible={visible}
        onCancel={toggle}
      >
        <div>some content...</div>
        <div>some content...</div>
        <div>some content...</div>
      </Modal>
    </>
  );
}

function CustomCloseIconModal() {
  const { visible, toggle } = useVisible();

  return (
    <>
      <Button color="primary" variant="contained" onClick={toggle}>
        Custom CloseIcon
      </Button>

      <Modal
        title="this is a no close icon button modal"
        closeIcon={
          <div
            style={{
              height: 50,
              width: 50,
              fontSize: 16,
              lineHeight: '50px',
              background: '#f50',
              borderRadius: '50%',
              color: '#fff',
            }}
          >
            Close
          </div>
        }
        footer={null}
        visible={visible}
        onCancel={toggle}
      >
        <div>some content...</div>
        <div>some content...</div>
        <div>some content...</div>
      </Modal>
    </>
  );
}

function Title() {
  return (
    <div
      style={{ width: 860, display: 'flex', justifyContent: 'space-around' }}
    >
      <TitleModal />
      <TitleStyleModal />
      <NoTitleModal />
      <NoCloseAbleModal />
      <CloseIconStyleModal />
      <CustomCloseIconModal />
    </div>
  );
}

export default Title;
