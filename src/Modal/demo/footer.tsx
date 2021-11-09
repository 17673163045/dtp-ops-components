import React from 'react';
import { Button } from '@mui/material';
import ModalButton from '../ModalButton';

const content = <div>this is a content</div>;

function FooterDefault() {
  return (
    <ModalButton title="footer default" buttonText="Footer">
      {content}
    </ModalButton>
  );
}

function FooterStyle() {
  return (
    <ModalButton
      title="change footer style"
      buttonText="Footer Style"
      footerStyle={{
        borderTop: '1px solid red',
        textAlign: 'left',
        background: '#222',
      }}
    >
      {content}
    </ModalButton>
  );
}

function NoFooter() {
  return (
    <ModalButton title="no footer" buttonText="No Footer" footer={null}>
      {content}
    </ModalButton>
  );
}

function CustomFooter() {
  const modalButtonRef: any = React.useRef();

  const customFooter = (
    <div
      style={{
        borderTop: '1px solid #ccc',
        padding: 20,
      }}
    >
      <div style={{ paddingBottom: 30 }}>this is a custom footer</div>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={() => modalButtonRef.current.close()}>确认</Button>
      </div>
    </div>
  );

  return (
    <ModalButton
      ref={modalButtonRef}
      title="Custom Footer"
      buttonText="Custom Footer"
      footer={customFooter}
    >
      {content}
    </ModalButton>
  );
}

function CustomFooterFn() {
  const customFooterFn = (buttons: any[]) => {
    return (
      <div
        style={{
          borderTop: '1px solid #ccc',
          padding: 20,
        }}
      >
        <div style={{ paddingBottom: 30 }}>this is a custom footer</div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {buttons[1]}
          {buttons[0]}
        </div>
      </div>
    );
  };

  return (
    <ModalButton
      title="Custom Footer with Function"
      buttonText="CustomFooter Function"
      footer={customFooterFn}
    >
      {content}
    </ModalButton>
  );
}

function Footer() {
  return (
    <div
      style={{ width: 860, display: 'flex', justifyContent: 'space-around' }}
    >
      <FooterDefault />
      <FooterStyle />
      <NoFooter />
      <CustomFooter />
      <CustomFooterFn />
    </div>
  );
}

export default Footer;
