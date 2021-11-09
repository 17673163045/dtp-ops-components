import React from 'react';

interface Options {
  defaultVisible?: boolean;
}

export default function useVisible(options?: Options) {
  const { defaultVisible = false } = options || {};

  const [visible, setVisible] = React.useState(defaultVisible);

  const open = () => setVisible(true);

  const close = () => setVisible(false);

  const toggle = () => setVisible((pre) => !pre);

  return { visible, open, close, toggle, setVisible };
}
