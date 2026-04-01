'use client';
import { Skeleton } from '@mui/material';

export default function Loading() {
    return (
        <div style={{
            width: '100%',
            boxSizing: 'border-box',
            marginTop: '120px',
            padding: '0 5px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '5px',
        }}>
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ padding: '8px' }}>
                    <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '8px', mb: 1 }} />
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="40%" height={20} />
                </div>
            ))}
        </div>
    );
}
