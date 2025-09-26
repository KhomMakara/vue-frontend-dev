interface EventListenerRecord {
    element: HTMLElement;
    event: string;
    handler: EventListenerOrEventListenerObject;
}

export default class EL {
    private static screenEventListenersMap = new Map<string, EventListenerRecord[]>();

    /**
     * Add event listener to HTML element with screen-based tracking
     */
    public static addEventListener(
        screenID: string,
        element: HTMLElement,
        event: string,
        handler: EventListener
    ): void {
        if (!this.screenEventListenersMap.has(screenID)) {
            this.screenEventListenersMap.set(screenID, []);
        }

        const screenListeners = this.screenEventListenersMap.get(screenID)!;

        // Check if listener already exists
        const existingListener = screenListeners.find(
            (listener) =>
                listener.element === element &&
                listener.event === event &&
                String(listener.handler) === String(handler)
        );

        if (existingListener) {
            return;
        }

        // Add event listener
        element.addEventListener(event, handler);
        screenListeners.push({ element, event, handler });
    }

    /**
     * Remove specific event listener
     */
    public static removeEventListener(screenID: string, element: HTMLElement, event: string): void {
        const screenListeners = this.screenEventListenersMap.get(screenID);
        if (!screenListeners) return;

        const listenerIndex = screenListeners.findIndex(
            (listener) => listener.element === element && listener.event === event
        );

        if (listenerIndex !== -1) {
            const listener = screenListeners[listenerIndex];
            element.removeEventListener(listener.event, listener.handler);
            screenListeners.splice(listenerIndex, 1);
        }
    }

    /**
     * Remove all event listeners for a screen
     */
    public static removeAllEventListeners(screenID: string): void {
        const screenListeners = this.screenEventListenersMap.get(screenID);
        if (!screenListeners) return;

        // Remove all listeners
        for (const listener of screenListeners) {
            listener.element.removeEventListener(listener.event, listener.handler);
        }

        this.screenEventListenersMap.delete(screenID);
    }

    /**
     * Focus element
     */
    public static focus(element: HTMLElement | { focus: () => void }): void {
        if ('focus' in element && typeof element.focus === 'function') {
            element.focus();
        } else if (element instanceof HTMLElement) {
            element.focus();
        }
    }

    /**
     * Blur element
     */
    public static blur(element: HTMLElement | { blur: () => void }): void {
        if ('blur' in element && typeof element.blur === 'function') {
            element.blur();
        } else if (element instanceof HTMLElement) {
            element.blur();
        }
    }

    /**
     * Get element value
     */
    public static getValue(element: HTMLElement): string {
        if (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement) {
            return element.value;
        }
        return '';
    }

    /**
     * Set element value
     */
    public static setValue(element: HTMLElement, value: string): void {
        if (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement) {
            element.value = value;

            // Trigger change event
            const event = new Event('change', { bubbles: true });
            element.dispatchEvent(event);
        }
    }

    /**
     * Show element
     */
    public static show(element: HTMLElement): void {
        element.style.display = '';
        element.classList.remove('hidden');
    }

    /**
     * Hide element
     */
    public static hide(element: HTMLElement): void {
        element.style.display = 'none';
        element.classList.add('hidden');
    }

    /**
     * Toggle element visibility
     */
    public static toggle(element: HTMLElement): void {
        if (element.style.display === 'none' || element.classList.contains('hidden')) {
            this.show(element);
        } else {
            this.hide(element);
        }
    }

    /**
     * Add CSS class
     */
    public static addClass(element: HTMLElement, className: string): void {
        element.classList.add(className);
    }

    /**
     * Remove CSS class
     */
    public static removeClass(element: HTMLElement, className: string): void {
        element.classList.remove(className);
    }

    /**
     * Toggle CSS class
     */
    public static toggleClass(element: HTMLElement, className: string): void {
        element.classList.toggle(className);
    }

    /**
     * Check if element has class
     */
    public static hasClass(element: HTMLElement, className: string): boolean {
        return element.classList.contains(className);
    }

    /**
     * Get element by selector
     */
    public static querySelector(selector: string, parent: HTMLElement = document.body): HTMLElement | null {
        return parent.querySelector(selector);
    }

    /**
     * Get elements by selector
     */
    public static querySelectorAll(selector: string, parent: HTMLElement = document.body): HTMLElement[] {
        return Array.from(parent.querySelectorAll(selector));
    }

    /**
     * Get closest parent element by selector
     */
    public static closest(element: HTMLElement, selector: string): HTMLElement | null {
        return element.closest(selector);
    }

    /**
     * Scroll to element
     */
    public static scrollToElement(
        element: HTMLElement,
        options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center' }
    ): void {
        element.scrollIntoView(options);
    }

    /**
     * Get element position
     */
    public static getPosition(element: HTMLElement): { top: number; left: number; width: number; height: number } {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
        };
    }

    /**
     * Check if element is visible
     */
    public static isVisible(element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 &&
               window.getComputedStyle(element).visibility !== 'hidden' &&
               window.getComputedStyle(element).display !== 'none';
    }

    /**
     * Wait for element to appear
     */
    public static waitForElement(
        selector: string,
        timeout: number = 5000
    ): Promise<HTMLElement> {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector) as HTMLElement;
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector) as HTMLElement;
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
}
