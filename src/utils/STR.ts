export default class STR {
    // Number pattern templates
    public static readonly patterns: Record<string, string> = {
        CustomerNumber: "99-99999999-9",
        ProductCode: "99-99-99-999-9999",
        AccountNumber: "9-999-99999999-9",
        LoanAccountNumber: "9-999-99999999-9",
        LoanNumber: "9999-9999-99-999999",
        CollateralNumber: "9999-9999-99-999999",
        Currency: "999,999.99",
        Rate: "999.99",
        NumberSeparator: "999,999",
        PurchaseNumber: "9-9999-9999-99999",
        Phone: "(999) 999-9999"
    };

    /**
     * Check if string is email
     */
    static isEmail(email: string): boolean {
        const regex = /^.+@[\w-]+\.([a-zA-Z]{2,3}|[0-9]{1,3})$/;
        const invalidRegex = /(@.*@)|(\.\.)|(@\.)|(@$)|(^\.)/;

        return !invalidRegex.test(email) && regex.test(email);
    }

    /**
     * Check if string contains only alphabets
     */
    static isAlphabet(str: string): boolean {
        const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return this.isValidStr(str, validChars, 0);
    }

    /**
     * Check if string contains only numbers
     */
    static isNumber(str: string): boolean {
        const validChars = "0123456789";
        return this.isValidStr(str, validChars, 0);
    }

    /**
     * Check if string is valid based on allowed characters
     */
    static isValidStr(str: string, validChars: string, minLength: number = 0): boolean {
        if (minLength > 0 && str.length < minLength) {
            return false;
        }

        for (const char of str) {
            if (validChars.indexOf(char) === -1) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if string contains special characters
     */
    static isSpecialChar(str: string): boolean {
        const specialChars = "~`!@#$%^&*()-_=+\\|[]{};:',.<>/?";
        for (const char of str) {
            if (specialChars.indexOf(char) !== -1) {
                return true;
            }
        }
        return false;
    }

    /**
     * Count occurrences of a character in string
     */
    static countOccurrences(str: string, char: string): number {
        const matches = str.match(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g"));
        return matches ? matches.length : 0;
    }

    /**
     * Format number with thousand separators
     */
    static formatNumber(value: string | number, pattern: NumberPattern = "NumberSeparator"): string {
        const num = typeof value === 'string' ? parseFloat(value) : value;

        if (isNaN(num)) return '';

        switch (pattern) {
            case "Currency":
                return num.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });

            case "Rate":
                return num.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4
                });

            case "NumberSeparator":
                return num.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });

            default:
                return num.toLocaleString('en-US');
        }
    }

    /**
     * Set number pattern formatting
     */
    static setNumberPattern(value: string, pattern: NumberPattern, options?: { currencyCode?: string }): string {
        if (!value) return '';

        const cleanValue = this.removeNumberPattern(value);

        switch (pattern) {
            case "CustomerNumber":
                return this.formatWithPattern(cleanValue, "99-99999999-9");

            case "Phone":
                return this.formatPhoneNumber(cleanValue);

            case "AccountNumber":
                return this.formatWithPattern(cleanValue, "9-999-99999999-9");

            case "Currency":
                return this.formatCurrency(cleanValue, options?.currencyCode);

            case "Rate":
                return this.formatNumber(cleanValue, "Rate");

            case "NumberSeparator":
                return this.formatNumber(cleanValue, "NumberSeparator");

            default:
                return cleanValue;
        }
    }

    /**
     * Remove number pattern formatting
     */
    static removeNumberPattern(value: string): string {
        return value.replace(/[^\d.]/g, '');
    }

    /**
     * Format with specific pattern
     */
    private static formatWithPattern(value: string, pattern: string): string {
        let result = '';
        let valueIndex = 0;

        for (let i = 0; i < pattern.length && valueIndex < value.length; i++) {
            if (pattern[i] === '9') {
                result += value[valueIndex];
                valueIndex++;
            } else {
                result += pattern[i];
            }
        }

        return result;
    }

    /**
     * Format phone number
     */
    private static formatPhoneNumber(value: string): string {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length >= 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (cleaned.length >= 6) {
            return cleaned.replace(/(\d{3})(\d{3})/, '$1-$2');
        } else if (cleaned.length >= 3) {
            return cleaned.replace(/(\d{3})/, '$1');
        }

        return cleaned;
    }

    /**
     * Format currency
     */
    private static formatCurrency(value: string, currencyCode: string = 'USD'): string {
        const num = parseFloat(value);
        if (isNaN(num)) return '';

        const formatted = num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return currencyCode ? `${formatted} ${currencyCode}` : formatted;
    }

    /**
     * Truncate string with ellipsis
     */
    static truncate(str: string, length: number = 50): string {
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    }

    /**
     * Capitalize first letter
     */
    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Convert to title case
     */
    static toTitleCase(str: string): string {
        return str.replace(/\w\S*/g, (txt) =>
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

    /**
     * Convert camelCase to kebab-case
     */
    static toKebabCase(str: string): string {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    /**
     * Convert kebab-case to camelCase
     */
    static toCamelCase(str: string): string {
        return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    /**
     * Remove HTML tags
     */
    static stripHtml(html: string): string {
        return html.replace(/<[^>]*>/g, '');
    }

    /**
     * Escape HTML characters
     */
    static escapeHtml(str: string): string {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Generate random string
     */
    static randomString(length: number = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Get text width (approximate)
     */
    static getTextWidth(text: string, font: string = '14px Arial'): number {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return text.length * 8; // fallback

        context.font = font;
        return context.measureText(text).width;
    }

    /**
     * Pad string with zeros
     */
    static padZero(value: number | string, length: number): string {
        return String(value).padStart(length, '0');
    }

    /**
     * Generate UUID
     */
    static generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export type NumberPattern =
    | "CustomerNumber"
    | "ProductCode"
    | "AccountNumber"
    | "LoanAccountNumber"
    | "LoanNumber"
    | "CollateralNumber"
    | "Currency"
    | "Rate"
    | "NumberSeparator"
    | "PurchaseNumber"
    | "Phone";
