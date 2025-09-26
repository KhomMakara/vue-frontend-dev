import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default class DATE {
    /**
     * Get current date/time
     */
    static now(): Dayjs {
        return dayjs();
    }

    /**
     * Parse date string
     */
    static parse(date: string, format?: string): Dayjs {
        return format ? dayjs(date, format) : dayjs(date);
    }

    /**
     * Format date
     */
    static format(date: string | Dayjs, format: string = 'DD-MMM-YYYY'): string {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.isValid() ? d.format(format) : '';
    }

    /**
     * Set date format
     */
    static setDateFormat(dateStr: string, format: string = 'DD-MMM-YYYY'): string {
        if (!dateStr) return '';

        const date = dayjs(dateStr);
        return date.isValid() ? date.format(format) : '';
    }

    /**
     * Set time format
     */
    static setTimeFormat(timeStr: string, format: '12h' | '24h' | 'r24h' = '12h'): string {
        if (!timeStr) return '';

        const time = dayjs(timeStr, 'HH:mm:ss');
        if (!time.isValid()) return timeStr;

        switch (format) {
            case '12h':
                return time.format('hh:mm:ss A');
            case '24h':
                return time.format('HH:mm:ss');
            case 'r24h':
                return time.format('HH:mm');
            default:
                return timeStr;
        }
    }

    /**
     * Get difference in days
     */
    static getDiffDay(startDate: string, endDate: string): number {
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        if (!start.isValid() || !end.isValid()) return 0;

        return end.diff(start, 'day');
    }

    /**
     * Get difference in months
     */
    static getDiffMonth(startDate: string, endDate: string, monthOnly?: boolean): number {
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        if (!start.isValid() || !end.isValid()) return 0;

        if (monthOnly) {
            return end.diff(start, 'month');
        }

        // Include partial months
        const years = end.year() - start.year();
        const months = end.month() - start.month();
        const days = end.date() - start.date();

        return years * 12 + months + (days >= 0 ? 0 : -1);
    }

    /**
     * Get difference in years
     */
    static getDiffYear(startDate: string, endDate: string): number {
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        if (!start.isValid() || !end.isValid()) return 0;

        return end.diff(start, 'year');
    }

    /**
     * Add days to date
     */
    static addDays(date: string | Dayjs, days: number): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.add(days, 'day');
    }

    /**
     * Add months to date
     */
    static addMonths(date: string | Dayjs, months: number): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.add(months, 'month');
    }

    /**
     * Add years to date
     */
    static addYears(date: string | Dayjs, years: number): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.add(years, 'year');
    }

    /**
     * Subtract days from date
     */
    static subtractDays(date: string | Dayjs, days: number): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.subtract(days, 'day');
    }

    /**
     * Subtract months from date
     */
    static subtractMonths(date: string | Dayjs, months: number): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.subtract(months, 'month');
    }

    /**
     * Get start of day
     */
    static startOfDay(date: string | Dayjs): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.startOf('day');
    }

    /**
     * Get end of day
     */
    static endOfDay(date: string | Dayjs): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.endOf('day');
    }

    /**
     * Get start of month
     */
    static startOfMonth(date: string | Dayjs): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.startOf('month');
    }

    /**
     * Get end of month
     */
    static endOfMonth(date: string | Dayjs): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.endOf('month');
    }

    /**
     * Check if date is today
     */
    static isToday(date: string | Dayjs): boolean {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.isSame(dayjs(), 'day');
    }

    /**
     * Check if date is yesterday
     */
    static isYesterday(date: string | Dayjs): boolean {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.isSame(dayjs().subtract(1, 'day'), 'day');
    }

    /**
     * Check if date is tomorrow
     */
    static isTomorrow(date: string | Dayjs): boolean {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.isSame(dayjs().add(1, 'day'), 'day');
    }

    /**
     * Check if date is weekend
     */
    static isWeekend(date: string | Dayjs): boolean {
        const d = typeof date === 'string' ? dayjs(date) : date;
        const day = d.day();
        return day === 0 || day === 6; // Sunday or Saturday
    }

    /**
     * Check if date is weekday
     */
    static isWeekday(date: string | Dayjs): boolean {
        return !this.isWeekend(date);
    }

    /**
     * Get age from birthdate
     */
    static getAge(birthDate: string | Dayjs): number {
        const birth = typeof birthDate === 'string' ? dayjs(birthDate) : birthDate;
        return dayjs().diff(birth, 'year');
    }

    /**
     * Get relative time (e.g., "2 hours ago")
     */
    static fromNow(date: string | Dayjs): string {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.fromNow();
    }

    /**
     * Get relative time to (e.g., "in 2 hours")
     */
    static toNow(date: string | Dayjs): string {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.toNow();
    }

    /**
     * Check if date is valid
     */
    static isValid(date: string | Dayjs): boolean {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.isValid();
    }

    /**
     * Check if first date is before second date
     */
    static isBefore(date1: string | Dayjs, date2: string | Dayjs): boolean {
        const d1 = typeof date1 === 'string' ? dayjs(date1) : date1;
        const d2 = typeof date2 === 'string' ? dayjs(date2) : date2;
        return d1.isBefore(d2);
    }

    /**
     * Check if first date is after second date
     */
    static isAfter(date1: string | Dayjs, date2: string | Dayjs): boolean {
        const d1 = typeof date1 === 'string' ? dayjs(date1) : date1;
        const d2 = typeof date2 === 'string' ? dayjs(date2) : date2;
        return d1.isAfter(d2);
    }

    /**
     * Check if dates are the same
     */
    static isSame(date1: string | Dayjs, date2: string | Dayjs, unit: string = 'day'): boolean {
        const d1 = typeof date1 === 'string' ? dayjs(date1) : date1;
        const d2 = typeof date2 === 'string' ? dayjs(date2) : date2;
        return d1.isSame(d2, unit);
    }

    /**
     * Get timezone
     */
    static getTimezone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    /**
     * Convert to timezone
     */
    static toTimezone(date: string | Dayjs, timezone: string): Dayjs {
        const d = typeof date === 'string' ? dayjs(date) : date;
        return d.tz(timezone);
    }

    /**
     * Get common date formats
     */
    static getFormats() {
        return {
            DATE_SHORT: 'DD/MM/YYYY',
            DATE_MEDIUM: 'DD-MMM-YYYY',
            DATE_LONG: 'DD MMMM YYYY',
            DATE_FULL: 'dddd, DD MMMM YYYY',
            TIME_12: 'hh:mm:ss A',
            TIME_24: 'HH:mm:ss',
            DATETIME_SHORT: 'DD/MM/YYYY HH:mm',
            DATETIME_MEDIUM: 'DD-MMM-YYYY HH:mm:ss',
            DATETIME_LONG: 'DD MMMM YYYY HH:mm:ss',
            ISO: 'YYYY-MM-DDTHH:mm:ssZ'
        };
    }
}
