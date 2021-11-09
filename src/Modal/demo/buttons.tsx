import React from 'react';

import ModalButton from '../ModalButton';
import { Button } from '@mui/material';

function SingleCancelButton() {
  return (
    <ModalButton
      buttonText="buttons is cancel"
      closable={false}
      buttons="cancel"
    >
      <div>buttons can set 'cancel' or 'ok'</div>
    </ModalButton>
  );
}

function SingleOkButton() {
  return (
    <ModalButton buttonText="buttons is ok" closable={false} buttons="ok">
      <div>buttons can set 'cancel' or 'ok'</div>
    </ModalButton>
  );
}

function ArrayButton() {
  return (
    <ModalButton
      buttonText="buttons is array"
      closable={false}
      buttons={['ok', 'cancel']}
    >
      <div>buttons传入数组调整下标对应的string可以调整按钮位置</div>
    </ModalButton>
  );
}

function ButtonProps() {
  return (
    <ModalButton
      buttonText="button props"
      closable={false}
      cancelButtonProps={{
        size: 'small',
        variant: 'text',
        style: { fontWeight: 700 },
      }}
      okButtonProps={{ size: 'large', loading: true } as any}
    >
      <div>传如buttonProps改变按钮样式</div>
    </ModalButton>
  );
}

function ModalButtons() {
  return (
    <div
      style={{ width: 760, display: 'flex', justifyContent: 'space-around' }}
    >
      <SingleCancelButton />
      <SingleOkButton />
      <ArrayButton />
      <ButtonProps />
    </div>
  );
}

export default ModalButtons;
