import React from 'react';
import ModalButton from '../ModalButton';

const content = <div>this is a content</div>;

function TransitionTop() {
  return (
    <ModalButton buttonText="Up" title="Transition Up" transitionDirection="up">
      {content}
    </ModalButton>
  );
}

function TransitionBottom() {
  return (
    <ModalButton
      buttonText="Down"
      title="Transition Down"
      transitionDirection="down"
    >
      {content}
    </ModalButton>
  );
}

function TransitionLeft() {
  return (
    <ModalButton
      buttonText="Left"
      title="Transition Left"
      transitionDirection="left"
    >
      {content}
    </ModalButton>
  );
}

function TransitionRight() {
  return (
    <ModalButton
      buttonText="Right"
      title="Transition Right"
      transitionDirection="right"
    >
      {content}
    </ModalButton>
  );
}

function Transition() {
  return (
    <div
      style={{ width: 400, display: 'flex', justifyContent: 'space-around' }}
    >
      <TransitionTop />
      <TransitionBottom />
      <TransitionLeft />
      <TransitionRight />
    </div>
  );
}

export default Transition;
