import React from 'react';
import ModalButton from '../ModalButton';

const content = <div>this is a content</div>;

function NoMask() {
  return (
    <ModalButton buttonText="No Mask" title="No Mask Modal" mask={false}>
      {content}
    </ModalButton>
  );
}

function MaskStyle() {
  return (
    <ModalButton
      buttonText="Mask Style"
      title="Custom Mask Style Modal"
      maskStyle={{ background: 'rgb(98,103,233)', filter: 'blur(400px)' }}
    >
      {content}
    </ModalButton>
  );
}

function MaskCloseable() {
  return (
    <ModalButton
      buttonText="Mask Closeable"
      title="Mask Click Dont Close Modal"
      maskClosable={false}
    >
      {content}
    </ModalButton>
  );
}

function Mask() {
  return (
    <div
      style={{ width: 460, display: 'flex', justifyContent: 'space-around' }}
    >
      <NoMask />
      <MaskStyle />
      <MaskCloseable />
    </div>
  );
}

export default Mask;
