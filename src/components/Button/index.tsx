/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

interface ButtonType {
  type: any;
  variant: any;
  children: any;
  className?: any;
  action?: any;
}
const Button = ({ type, variant, children, className, action }: ButtonType) => {
  let styles =
    'inline-flex border-none align-center px-md py-xs justify-center items-center font-semibold text-sm leading-md  cursor-pointer ';
  if (variant === 'primary') {
    styles += 'bg-primary-700 primary rounded-[8px] text-white hover:bg-sky-700';
  } else if (variant == 'secondary') {
    styles += 'bg-transparent secondary  text-primary-200 rounded-[8px] ';
  } else if (variant == 'subtle') {
    styles +=
      'bg-transparent subtle  text-primary-300 rounded-[8px] hover:bg-primary-700 hover:text-white';
  } else {
    styles += 'border-0 bg-transparent  text-primary-300 hover:text-primary-700';
  }

  return (
    <div>
      <button type={type} className={styles + ' ' + className} onClick={action}>
        {children}
      </button>
    </div>
  );
};
Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  // title: PropTypes.string,
  action: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'subtle', 'text']),
  // size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  // arrow: PropTypes.oneOf([true, false]),
  // link: PropTypes.string,
  // target: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  // size: 'md',
  // target: '__self',
  // arrow: false,
};

export default Button;
