import { useEffect, useRef, useState } from 'react';
import getClassNames from 'classnames';

import styles from './styles.module.css';

export const Tooltip = ({ children, content }) => {
  const triggerElement = useRef(null);

  const [isOverlayAboveTrigger, setIsOverlayAboveTrigger] = useState(false);

  useEffect(() => {

      const handleResize = () => {

        const { current } = triggerElement;

        if (!current || !current.getBoundingClientRect) return;

        const nextIsOverlayAboveTrigger = window.innerHeight - current.getBoundingClientRect().bottom < 300;

        setIsOverlayAboveTrigger(nextIsOverlayAboveTrigger);
      };

      global.addEventListener('resize', handleResize);

      handleResize();

      return () => global.removeEventListener('resize', handleResize);

  }, []);

  return (
    <span className={getClassNames(styles.tooltip, { [styles.isAbove]: isOverlayAboveTrigger })  }>
      <a ref={triggerElement}>{children}</a>
      <span className={styles.tooltipOverlay}>
        <span className={styles.tooltipArrow} />
        <span className={styles.tooltipContent}>{content}</span>
      </span>
    </span>
  )
};
