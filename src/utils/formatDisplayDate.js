const formatDisplayDate = value => {
    if (!value) return null;

    const trimmed = String(value).trim();
    if (!trimmed) return null;

    if (/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/.test(trimmed)) {
        return trimmed;
    }

    const dateOnlyMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
        const year = Number(dateOnlyMatch[1]);
        const month = Number(dateOnlyMatch[2]) - 1;
        const day = Number(dateOnlyMatch[3]);
        const parsedDate = new Date(Date.UTC(year, month, day));

        if (
            parsedDate.getUTCFullYear() !== year ||
            parsedDate.getUTCMonth() !== month ||
            parsedDate.getUTCDate() !== day
        ) {
            return null;
        }

        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(parsedDate);
    }

    const parsedDate = new Date(trimmed);
    if (Number.isNaN(parsedDate.getTime())) {
        return null;
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(parsedDate);
};

export default formatDisplayDate;
