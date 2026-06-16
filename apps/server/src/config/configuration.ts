export default () => {
    if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
        throw new Error('❌ FATAL ERROR: JWT_SECRET environment variable is missing in production!');
    }

    return {
        port: parseInt(process.env.PORT || '3000', 10),
        database: {
            url: process.env.DATABASE_URL
        },
        jwt: {
            secret: process.env.JWT_SECRET || 'local-dev-only-secret',
            expiresIn: process.env.JWT_EXPIRES_IN ?? '7d'
        },
        cors: {
            frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173'
        }
    };
};