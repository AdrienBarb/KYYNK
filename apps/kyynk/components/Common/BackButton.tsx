import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, ReactNode } from 'react';
import styles from '@/styles/BackButton.module.scss';
import Link from 'next/link';

interface Props {
  prevPath: string;
  children?: ReactNode;
  isVisible?: boolean;
}

const BackButton: FC<Props> = ({ prevPath, children, isVisible }) => {
  return (
    <div className={styles.container}>
      <div>
        {isVisible && (
          <Link href={prevPath} prefetch>
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </Link>
        )}
      </div>
      {children && children}
    </div>
  );
};

export default BackButton;
