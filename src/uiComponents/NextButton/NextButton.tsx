import './NextButton.css';

import { MouseEventHandler } from 'react';

interface NextButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  className: string;
}

const NextButton = ({ onClick, label,className }: NextButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default NextButton;