'use client';
import React, { useState } from 'react';
import styles from './reviews-block.module.css';
import { reviewsData, ReviewSource } from '@/app/utils/constants';

const SOURCES: { key: ReviewSource; label: string; rating: string; href?: string }[] = [
    { key: 'yandex', label: 'Яндекс', rating: '5,0★', href: 'https://yandex.ru/profile/183887374171' },
    { key: 'google', label: 'Google', rating: '5,0★', href: 'https://maps.app.goo.gl/vhWL7yY1VUQUGZ5SA' },
    { key: '2gis', label: '2Gis', rating: '5,0★' },
    { key: 'avito', label: 'Авито', rating: '5,0★' },
    { key: 'vk', label: 'ВКонтакте', rating: '', href: 'https://vk.com/pinheadspb' },
];

const ALL_TAGS = ['подарок', 'футболки', 'толстовки', 'срочно', 'качество', 'сервис'];

const CARDS_PER_PAGE = 3;

const ReviewsBlock: React.FC = () => {
    const [activeSource, setActiveSource] = useState<ReviewSource>('yandex');
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [page, setPage] = useState(0);

    const handleSourceChange = (source: ReviewSource) => {
        setActiveSource(source);
        setActiveTag(null);
        setPage(0);
    };

    const handleTagChange = (tag: string) => {
        setActiveTag(prev => (prev === tag ? null : tag));
        setPage(0);
    };

    const filtered = reviewsData
        .filter(r => r.source === activeSource)
        .filter(r => (activeTag ? r.tags.includes(activeTag) : true));

    const pageCount = Math.ceil(filtered.length / CARDS_PER_PAGE);
    const visible = filtered.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

    return (
        <div className={styles.block}>
            <div className={styles.sources}>
                {SOURCES.map(s => (
                    <div key={s.key} className={styles.source_wrapper}>
                        <button
                            type="button"
                            className={
                                activeSource === s.key
                                    ? `${styles.source_active}${s.href ? ' ' + styles.source_active_linked : ''}`
                                    : `${styles.source_btn}${s.href ? ' ' + styles.source_btn_linked : ''}`
                            }
                            onClick={() => handleSourceChange(s.key)}
                        >
                            {s.label}{s.rating ? <span className={styles.source_rating}> {s.rating}</span> : null}
                        </button>
                        {s.href && (
                            <a
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={activeSource === s.key ? styles.source_link_active : styles.source_link}
                                aria-label={`Открыть отзывы на ${s.label}`}
                            >
                                ↗
                            </a>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.tags}>
                {ALL_TAGS.map(tag => (
                    <button
                        key={tag}
                        type="button"
                        className={activeTag === tag ? styles.tag_active : styles.tag_btn}
                        onClick={() => handleTagChange(tag)}
                    >
                        #{tag}
                    </button>
                ))}
            </div>

            <div className={styles.cards}>
                {visible.length > 0 ? visible.map(review => (
                    <div key={review.id} className={styles.card}>
                        <div className={styles.card_header}>
                            <div className={styles.avatar}>{review.initials}</div>
                            <div className={styles.card_meta}>
                                <span className={styles.card_name}>{review.name}</span>
                                <span className={styles.card_date}>{review.date}</span>
                            </div>
                        </div>
                        <div className={styles.card_stars}>{'★'.repeat(review.stars)}</div>
                        <p className={styles.card_text}>{review.text}</p>
                    </div>
                )) : (
                    <p className={styles.empty}>Отзывов с таким фильтром пока нет</p>
                )}
            </div>

            {pageCount > 1 && (
                <div className={styles.pagination}>
                    <button
                        type="button"
                        className={styles.page_btn}
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        aria-label="Предыдущая страница"
                    >
                        ←
                    </button>
                    <span className={styles.page_counter}>{page + 1}/{pageCount}</span>
                    <button
                        type="button"
                        className={styles.page_btn}
                        onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
                        disabled={page === pageCount - 1}
                        aria-label="Следующая страница"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewsBlock;
