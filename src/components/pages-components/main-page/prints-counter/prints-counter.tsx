'use client';
import React, { useState, useEffect } from 'react';
import styles from './prints-counter.module.css';

const START_DATE = new Date('2021-11-01').getTime();
const END_DATE = new Date('2026-11-01').getTime();
const TARGET_COUNT = 75000;

function getCurrentCount(): number {
    const elapsed = Date.now() - START_DATE;
    const total = END_DATE - START_DATE;
    return Math.floor((elapsed / total) * TARGET_COUNT);
}

const PrintsCounter: React.FC = () => {
    const [count, setCount] = useState(getCurrentCount);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(getCurrentCount());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const digits = String(count).split('');

    return (
        <div className={styles.block}>
            <p className={styles.label_top}>мы напечатали</p>
            <div className={styles.digits}>
                {digits.map((d, i) => (
                    <span key={i} className={styles.digit}>{d}</span>
                ))}
            </div>
            <p className={styles.label_bottom}>принтов — и продолжаем</p>
        </div>
    );
};

export default PrintsCounter;
