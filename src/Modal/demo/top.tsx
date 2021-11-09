import React from 'react';
import ModalButton from '../ModalButton';

const content = <div>this is a content</div>;

function Centered() {
  return (
    <ModalButton buttonText="Centered" title="modal centered" centered={true}>
      {content}
    </ModalButton>
  );
}

function SetTop() {
  return (
    <ModalButton buttonText="top 200" title="modal centered" top={100}>
      {content}
    </ModalButton>
  );
}

function Top() {
  return (
    <div
      style={{ width: 240, display: 'flex', justifyContent: 'space-around' }}
    >
      <Centered />
      <SetTop />
    </div>
  );
}

export default Top;
