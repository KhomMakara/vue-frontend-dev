import { Modal, message } from "ant-design-vue";
import { createApp, h, type Component } from "vue";

export default class POP {
    private static activePopups: Array<{ id: string; name: string }> = [];

    /**
     * Show popup modal
     */
    static showPopup(
        component: Component,
        options: ModalOptions = { props: {}, title: "", width: 80, closable: true }
    ): Promise<{ button: string; data: any }> {
        return new Promise((resolve, reject) => {
            const container = document.createElement('div');
            document.body.appendChild(container);

            const popupId = `popup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const screenName = (component as any).name || options.title || "Popup";

            // Track active popup
            this.activePopups.push({ id: popupId, name: screenName });

            const app = createApp({
                data() {
                    return {
                        visible: true,
                        popupId
                    };
                },
                methods: {
                    onOk(data: any = {}) {
                        resolve({ button: "ok", data });
                        this.visible = false;
                        this.destroy();
                    },
                    onCancel(data: any = {}) {
                        const error = new Error("Popup was cancelled") as any;
                        error.button = "cancel";
                        error.data = data;
                        reject(error);
                        this.visible = false;
                        this.destroy();
                    },
                    destroy() {
                        // Remove from active popups
                        POP.activePopups = POP.activePopups.filter(p => p.id !== this.popupId);

                        setTimeout(() => {
                            app.unmount();
                            if (document.body.contains(container)) {
                                document.body.removeChild(container);
                            }
                        }, 300);
                    }
                },
                render() {
                    return h(Modal, {
                        open: this.visible,
                        title: options.title,
                        onOk: () => this.onOk(),
                        onCancel: () => this.onCancel(),
                        footer: null,
                        width: `${options.width || 80}vw`,
                        centered: true,
                        closable: options.closable !== false,
                        destroyOnClose: true
                    }, {
                        default: () => h(component, {
                            ...options.props,
                            onOk: this.onOk,
                            onCancel: this.onCancel
                        })
                    });
                }
            });

            app.mount(container);
        });
    }

    /**
     * Close popup from inside component
     */
    static closePopup(screenRef: any, data: any = {}): void {
        screenRef.$emit("ok", data);
    }

    /**
     * Cancel popup from inside component
     */
    static closePopupCancel(screenRef: any, data: any = {}): void {
        screenRef.$emit("cancel", data);
    }

    /**
     * Show alert dialog
     */
    static alert(options: { content: string; mode: ModalMode; title?: string }): Promise<string> {
        return new Promise((resolve) => {
            const config = {
                title: options.title || this.getModeTitle(options.mode),
                content: options.content,
                okText: "OK",
                centered: true,
                onOk: () => resolve("ok")
            };

            switch (options.mode) {
                case "Success":
                    Modal.success(config);
                    break;
                case "Warning":
                    Modal.warning(config);
                    break;
                case "Error":
                    Modal.error(config);
                    break;
                case "Info":
                default:
                    Modal.info(config);
                    break;
            }
        });
    }

    /**
     * Show confirmation dialog
     */
    static confirm(options: {
        content: string;
        mode: ModalMode;
        title?: string;
        okBtn?: { btnText?: string };
        cancelBtn?: { btnText?: string };
    }): Promise<string> {
        return new Promise((resolve, reject) => {
            Modal.confirm({
                title: options.title || this.getModeTitle(options.mode),
                content: options.content,
                okText: options.okBtn?.btnText || "OK",
                cancelText: options.cancelBtn?.btnText || "Cancel",
                centered: true,
                onOk: () => resolve("ok"),
                onCancel: () => reject(new Error("cancelled"))
            });
        });
    }

    /**
     * Show success message
     */
    static success(content: string, duration: number = 3): void {
        message.success(content, duration);
    }

    /**
     * Show error message
     */
    static error(content: string, duration: number = 3): void {
        message.error(content, duration);
    }

    /**
     * Show warning message
     */
    static warning(content: string, duration: number = 3): void {
        message.warning(content, duration);
    }

    /**
     * Show info message
     */
    static info(content: string, duration: number = 3): void {
        message.info(content, duration);
    }

    /**
     * Show loading message
     */
    static loading(content: string = "Loading...", duration: number = 0): any {
        return message.loading(content, duration);
    }

    /**
     * Get active popups
     */
    static getActivePopups(): Array<{ id: string; name: string }> {
        return this.activePopups;
    }

    /**
     * Check if popups are active
     */
    static hasActivePopups(): boolean {
        return this.activePopups.length > 0;
    }

    /**
     * Get active popup count
     */
    static getActivePopupCount(): number {
        return this.activePopups.length;
    }

    private static getModeTitle(mode: ModalMode): string {
        switch (mode) {
            case "Success": return "Success";
            case "Warning": return "Warning";
            case "Error": return "Error";
            case "Question": return "Confirmation";
            case "Info":
            default: return "Information";
        }
    }
}

export type ModalMode = "Success" | "Question" | "Warning" | "Error" | "Info";

export interface ModalOptions {
    props?: any;
    title?: string;
    width?: number;
    closable?: boolean;
}
