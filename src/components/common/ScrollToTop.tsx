/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const axes = {
  normal: {
    bottom: 0,
    right: 0,
  },
  side: {
    bottom: 58,
    right: -159,
  },
};

const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const location = useLocation();
  const [positionAxes, setPositionAxes] = useState(axes['normal']);
  const sidePaths = ['/teacher-dashboard'];

  useEffect(() => {
    sidePaths.includes(location.pathname)
      ? setPositionAxes(axes['side'])
      : setPositionAxes(axes['normal']);
  }, [location]);
  return (
    <Affix position={positionAxes} className="wrapper-x">
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftIcon={<IconArrowUp size={16} />}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTop;
