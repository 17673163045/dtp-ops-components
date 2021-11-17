import React from 'react';

interface OptionProps {
  title?: string;
  key?: string;
  value: string | number;
  className?: string;
}

function Option(props: OptionProps) {
  return <div>Option</div>;
}

export default Option;
