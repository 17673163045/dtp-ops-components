import React from 'react';
import ModalButton from '../ModalButton';

const content = <div>this is a content</div>;

function WidthSetNumber() {
  return (
    <ModalButton
      buttonText="Width set Number"
      title="modal width 1000px"
      width={1000}
    >
      {content}
    </ModalButton>
  );
}

function WidthSetPercent() {
  return (
    <ModalButton
      buttonText="Width set Percent"
      title="modal width 60%"
      width="60%"
    >
      {content}
    </ModalButton>
  );
}

function WidthSetStyle() {
  return (
    <ModalButton
      buttonText="Width set style prop"
      title="modal width set style prop"
      maskClosable={false}
      style={{ width: '96%', maxWidth: 800 }}
    >
      调整窗口宽度,当窗口宽度小于800时弹窗宽度保持和窗口宽度一致
    </ModalButton>
  );
}

function Width() {
  return (
    <div
      style={{ width: 600, display: 'flex', justifyContent: 'space-around' }}
    >
      <WidthSetNumber />
      <WidthSetPercent />
      <WidthSetStyle />
    </div>
  );
}

export default Width;
