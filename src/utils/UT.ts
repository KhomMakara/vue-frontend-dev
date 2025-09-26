import { nextTick } from "vue";
import EL from "./EL";
import POP from "./POP";
import STR from "./STR";
// import DOMPurify from "dompurify";
// import i18n from "@/locale/i18n";
// import Bowser from "bowser";

export default class UT {
    /**
     * Check if text element is showing ellipsis (truncated)
     */
    static isTextEllipsis(element: HTMLElement): boolean {
        return element.scrollWidth > element.clientWidth;
    }

    static isNullOrEmpty(val: any): boolean {
        if (val === null || val === undefined || val.toString().trim() === "") {
            return true;
        } else if (typeof val === "object" && Object.keys(val).length < 1) {
            return true;
        }

        return false;
    }

    static validatePhoneNumber(ctrl: any, countryCode: string): boolean {
        const number = ctrl;

        // # Skipped cond
        if (countryCode !== "855" && countryCode !== "+855") {
            return true;
        }

        if (!number) {
            return true;
        }

        if (number.substring(0, 1) !== "0") {
            void POP.alert({
                content: "Phone number first digit must be 0",
                mode: "Success"
            });
            return false;
        }

        if (number.substring(1, 2) === "0") {
            void POP.alert({
                content: "Phone number second digit cannot be 0",
                mode: "Success"
            });
            return false;
        }

        if (number.length < 9) {
            void POP.alert({
                content: "Phone number min length is 9",
                mode: "Success"
            });
            return false;
        }

        if (number.length > 10) {
            void POP.alert({
                content: "Phone number max length is 10",
                mode: "Success"
            });
            return false;
        }
        return true;
    }

    private static validateEmail(strEmail: any): boolean {
        //const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(strEmail)) {
            return false;
        }
        return true;
    }

    /**
     * Check if list has equals object
     * @param {Array<any>} arrList
     * @param {string | object} check
     * @return {number} index
     */
    static hasListValue(arrList: Array<any>, check: string | object): number {
        if (null != arrList && arrList.length > 0) {
            for (const [i, value] of arrList.entries()) {
                if (value === check) {
                    return i;
                }
            }
        }
        return -1;
    }

    static doRequestPickListData(allArray?: any): Promise<[]> {
        return new Promise((resolve) => {
            resolve(allArray);
        });
    }

    /**
     * Set fields enable/disable/readonly
     *
     * @param {*} screenRef
     * @param {{section?: string, fields: Array<string>, enable: boolean, inputType?: InputType}} options
     * @example
     * const mandatoryFields = ["employeeNo", "customerNo"];
     * UT.arraySetEnable(this, {
     *     fields: mandatoryFields,
     *     enable: true,
     *     inputType: "M"
     * });
     */
    static arraySetEnable(
        screenRef: any,
        options: {
            section?: string;
            fields: Array<string>;
            enable: boolean;
            inputType?: InputType;
        }
    ): void {
        for (const fieldName of Object.keys(screenRef.$refs)) {
            if (options.fields.indexOf(fieldName) < 0) {
                continue;
            }
            const hasLoopRef = fieldName.includes("_"); // check validations for loop input
            const fieldRef = hasLoopRef
                ? screenRef.$refs[fieldName][0]
                : screenRef.$refs[fieldName];

            if (!fieldRef) {
                continue;
            }

            try {
                const formItem =
                    fieldRef.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent;
                if (formItem && formItem.updateTooltip) {
                    formItem.updateTooltip(false, "success");
                }
                //check prevent clear validation when click add more input form
                if (formItem.title !== "" && formItem.field.value === "") {
                    void nextTick(() => formItem.field.setRequired(false));
                    formItem.updateTooltip(false, "error", formItem.title);
                }
            } catch {
                // skip cause don't have tooltip
            }

            // # Enable/disable
            try {
                fieldRef.setAttribute("inputType", options.inputType);
                fieldRef.setEnable(options.enable);
                fieldRef.setRequired(options.inputType === "M");
            } catch {
                // skip for component that don't need to set as require
            }
        }
    }

    /**
     * Set fields enable/disable/readonly by form ref name
     *
     * @param {*} screenRef
     * @param {string} formRefName
     * @param {{ enable: boolean }} options
     * @example
     * UT.formInputEnable(this, "formRefName" {
     *     enable: true,
     * });
     */
    static formInputEnable(
        screenRef: any,
        formRef: string,
        options: {
            ignoreFields?: Array<string>;
            inputType?: "O" | "M" | "X";
            enable: boolean;
            overrides?: [{ inputType: "O" | "M" | "X"; fields: string[] }];
        }
    ): void {
        // # get all field from form
        const formItems = screenRef.$refs[formRef].getFormItems();

        // # list fields to be enable
        let arrayEnableFields = [] as Array<string>;
        for (const formItem of formItems) {
            try {
                for (const field of formItem.$slots.field("field")) {
                    const fieldName = field.props.ref;

                    // eslint-disable-next-line max-depth
                    if (
                        options?.ignoreFields &&
                        options?.ignoreFields.find((element) => element === fieldName) === fieldName
                    ) {
                        continue;
                    }

                    arrayEnableFields = [...arrayEnableFields, field.props.ref];
                }
                for (const field of formItem.$slots.button("button")) {
                    const fieldName = field.props.ref;

                    // eslint-disable-next-line max-depth
                    if (
                        options?.ignoreFields &&
                        options?.ignoreFields.find((element) => element === fieldName) === fieldName
                    ) {
                        continue;
                    }

                    arrayEnableFields = [...arrayEnableFields, field.props.ref];
                }
            } catch {
                // skip for that form items don't have field or button template
            }
        }

        // # set enable
        this.arraySetEnable(screenRef, {
            enable: options.enable,
            fields: arrayEnableFields,
            inputType: options.inputType || "O"
        });

        // # override
        if (options.overrides?.length) {
            for (const override of options.overrides) {
                this.arraySetEnable(screenRef, {
                    enable: options.enable,
                    fields: override.fields,
                    inputType: override.inputType || "O"
                });
            }
        }
    }

    /**
     * Validate form item with default rule and custom rule
     *
     * @param {*} screenRef - This object from the component
     * @param {string} formRef - Form ref name
     * @param {CustomRule} customRule
     * @param {Rule} customRule.field - Name of the field
     * @param {string} customRule.field.label - Override field label
     * @param {"tiny" | "codevalue" | "number" | "date" | "string"} customRule.field.type - Type of the field:
     * - `tiny`: compare value field1 < field2 < ... < fieldN
     * - `codevalue`: validate correct code
     * - `number`: input value must be number
     * - `date`
     * - `string`
     * @param {number} customRule.field.min - Minimum value of the field
     * @param {number} customRule.field.max - Maximum value of the field
     * @param {number} customRule.field.len - Length of the field
     * @param {number} customRule.field.regex
     * @param {CustomRule} customRule.fields.field - Sub field
     * @param {string} customRule.fields.field.label - Override sub field label
     * @returns {boolean} - true:success, false:error
     * @example
     * UT.dynamicValidate(this, "fromInformationDetail", {
     *     "employeeNo": {
     *         min: 6
     *         fields: ["employeeName"]
     *     },
     *     "branchCode": {
     *         regex: new Regex(/[1-9]/)
     *         message: "My custom error message xD"
     *     }
     * });
     */
    static validate(
        screenRef: any,
        formRef: string,
        customRules: CustomRules = {},
        skipDefault: boolean = false
    ): boolean {
        const fieldsMap = new Map<string, any>(); // Fields as reference for double check
        const formItems = screenRef.$refs[formRef].getFormItems();

        for (const formItem of formItems) {
            if (!formItem.$slots.field) {
                continue;
            }
            const field = formItem.$slots.field("field")[0];
            fieldsMap.set(field.props.ref, formItem);
        }

        // # Loop and validate
        let resultStatus = true;
        for (const formItem of formItems) {
            if (!formItem.$slots.field) {
                continue;
            }

            const field = formItem.$slots.field("field")[0];
            const fieldName = field.props.ref;

            if (!fieldName) {
                continue;
            }
            const hasLoopRef = fieldName.includes("_"); // check validations for loop input

            const fieldRef = hasLoopRef
                ? screenRef.$refs[fieldName][0]
                : screenRef.$refs[fieldName];
            if (!fieldRef) {
                continue;
            }
            const fieldEL = fieldRef.$el;
            // let fieldLabel = formItem.label;

            // # Default check
            // # Custom rule basic check
            const errorMessage = this.validateRule(
                screenRef,
                fieldsMap,
                formItem,
                customRules,
                skipDefault
            );

            // update result status
            if (errorMessage !== "") {
                resultStatus = false;
            }

            // # Tiny field check

            // # Set tooltip
            const status1 = errorMessage !== "" ? "error" : "success";
            formItem.updateTooltip(false, status1, errorMessage);
            // console.log( fieldName );
            // screenRef.$refs[fieldName].setRequired( errorMessage != "" ? false : true );
            // # Change color

            // # Register event
            EL.addEventListener(screenRef.$options.name, fieldEL, "focusout", () => {
                formItem.updateTooltip(false);
            });
            EL.addEventListener(screenRef.$options.name, fieldEL, "focus", () => {
                formItem.autoShowTooltip();
            });
            EL.addEventListener(screenRef.$options.name, fieldEL, "mouseover", () => {
                formItem.autoShowTooltip();
            });
            EL.addEventListener(screenRef.$options.name, fieldEL, "mouseleave", () => {
                formItem.updateTooltip(false);
            });
            EL.addEventListener(screenRef.$options.name, fieldEL, "change", () => {
                let errorMessage2 = "";

                // # Default check
                // # Custom rule basic check
                errorMessage2 = this.validateRule(
                    screenRef,
                    fieldsMap,
                    formItem,
                    customRules,
                    skipDefault
                );

                // # Set tooltip
                const status2 = errorMessage2 !== "" ? "error" : "success";
                formItem.updateTooltip(!!errorMessage2, status2, errorMessage2);
            });
            EL.addEventListener(screenRef.$options.name, fieldEL, "input", () => {
                let errorMessage2 = "";

                // # Default check
                // # Custom rule basic check
                errorMessage2 = this.validateRule(
                    screenRef,
                    fieldsMap,
                    formItem,
                    customRules,
                    skipDefault
                );

                // # Set tooltip
                const status2 = errorMessage2 !== "" ? "error" : "success";
                formItem.updateTooltip(!!errorMessage2, status2, errorMessage2);
            });
            if (field.type.name.match("BSelect|BDatePicker|BTimePicker|BRadioGroup")) {
                const refData = hasLoopRef
                    ? screenRef.$refs[fieldName][0]
                    : screenRef.$refs[fieldName]; // check validations for loop input
                refData.setChangeCallbackFn(() => {
                    let errorMessage2 = "";

                    // # Default check
                    // # Custom rule basic check
                    errorMessage2 = this.validateRule(
                        screenRef,
                        fieldsMap,
                        formItem,
                        customRules,
                        skipDefault
                    );

                    // # Set tooltip
                    const status2 = errorMessage2 !== "" ? "error" : "success";
                    formItem.updateTooltip(!!errorMessage2, status2, errorMessage2);
                });
            }
        }

        this.scrollToErrorField();

        return resultStatus;
    }

    private static scrollToErrorField(): void {
        Promise.resolve().then(() => {
            const errorField = document.getElementsByClassName("ant-input-status-error")[0] as HTMLElement;
            if (errorField) {
                setTimeout(() => {
                    const scrollOptions = {
                        block: "center",
                        behavior: "smooth",
                    } as ScrollIntoViewOptions;
                    errorField.scrollIntoView(scrollOptions);
                }, 300);
            }
            return undefined;
        }).catch(() => {
            // skip
        });
    }

    // eslint-disable-next-line max-params
    private static validateRule(
        screenRef: any,
        fieldsMap: any,
        formItem: any,
        customRules: any = {},
        skipDefault: boolean = false
    ): string {
        let errorMessage = "";

        const field = formItem.$slots.field("field")[0];
        const fieldName = field.props.ref;
        const hasLoopRef = fieldName.includes("_"); // check validations for loop input
        const fieldRef = hasLoopRef ? screenRef.$refs[fieldName][0] : screenRef.$refs[fieldName];
        const fieldEl = fieldRef.$el;
        const rulesForField = customRules[fieldName] || {};

        let fieldLabel = formItem.label;
        if (!fieldLabel) {
            fieldLabel =
                fieldName.substring(0, 1).toLocaleUpperCase() +
                fieldName.substring(1, fieldName.length);
            fieldLabel = fieldLabel.replace(/([a-z])([A-Z])/g, "$1 $2");
        }

        let required;
        if (typeof fieldRef.getAttribute === "function") {
            required = fieldRef.getAttribute("inputType") === "M";
        } else {
            required = fieldEl.getAttribute("inputType") === "M";
        }

        // # Default check
        // - Mandatory

        let fieldValue = field.props.value;
        if (fieldValue === null || fieldValue === undefined) {
            fieldValue = fieldRef.value || fieldEl.value || "";
        }

        if (
            skipDefault &&
            Object.keys(customRules).includes(fieldName) &&
            required &&
            fieldValue.length === 0
        ) {
            errorMessage = `${fieldLabel} is required`;
            return errorMessage;
        }
        if (!skipDefault && required && fieldValue.length === 0) {
            errorMessage = `${fieldLabel} is required`;
            return errorMessage;
        }

        // # Custom rule basic check (supports single object or array of rule objects)
        if (Array.isArray(rulesForField)) {
            for (const ruleObj of rulesForField) {
                errorMessage = this.validateCustomRule(ruleObj, field, fieldEl, fieldsMap);
                if (errorMessage) {
                    break;
                }
            }
        } else {
            errorMessage = this.validateCustomRule(rulesForField, field, fieldEl, fieldsMap);
        }

        return errorMessage;
    }

    // eslint-disable-next-line complexity
    private static validateCustomRule(rules: any = {}, field: any, fieldEl: any, fieldsMap: any): string {
        let errorMessage = "";
        const fieldName = field.props.ref;
        const formItem = fieldsMap.get(fieldName);
        const fieldValue = field.props.value;
        const fieldPattern = field.props.pattern;

        let fieldLabel = formItem.label;
        if (!fieldLabel) {
            fieldLabel =
                fieldName.substring(0, 1).toLocaleUpperCase() +
                fieldName.substring(1, fieldName.length);
            fieldLabel = fieldLabel.replace(/([a-z])([A-Z])/g, "$1 $2");
        }

        if (!fieldValue) {
            return errorMessage;
        }

        // if (
        //     !rules.ignoreLenCheck &&
        //     !rules.len &&
        //     // fieldEl.maxLength !== fieldValue.length &&
        //     !fieldPattern
        // ) {
        //     errorMessage = rules.message || `${fieldLabel} length must be ${fieldEl.maxLength}`;
        //     return errorMessage;
        // }

        for (const key of Object.keys(rules)) {
            if (key === "min" && typeof rules[key] === "number" && rules[key] > fieldValue) {
                errorMessage = rules.message || `${fieldLabel} minimum must be ${rules[key]}`;
                return errorMessage;
            }

            if (key === "min" && typeof rules[key] === "object") {
                const minFieldName = rules[key].field;
                const minFieldFormItem = fieldsMap.get(minFieldName);
                const minFieldField = minFieldFormItem.$slots.field("field")[0];
                const minFieldValue = minFieldField.props.value;

                let minFieldLabel = minFieldFormItem.label;
                if (!minFieldLabel) {
                    minFieldLabel =
                        minFieldName.substring(0, 1).toLocaleUpperCase() +
                        minFieldName.substring(1, minFieldName.length);
                    minFieldLabel = minFieldLabel.replace(/([a-z])([A-Z])/g, "$1 $2");
                }

                if (fieldValue < minFieldValue) {
                    errorMessage =
                        rules.message ||
                        `${fieldLabel} must be equal or bigger than ${minFieldLabel}`;
                    return errorMessage;
                }
            }

            if (key === "max" && rules[key] < fieldValue) {
                errorMessage = rules.message || `${fieldLabel} maximum must be ${rules[key]}`;
                return errorMessage;
            }

            if (key === "max" && typeof rules[key] === "object") {
                const maxFieldName = rules[key].field;
                const maxFieldFormItem = fieldsMap.get(maxFieldName);
                const maxFieldField = maxFieldFormItem.$slots.field("field")[0];
                const maxFieldValue = maxFieldField.props.value;

                let maxFieldLabel = maxFieldFormItem.label;
                if (!maxFieldLabel) {
                    maxFieldLabel =
                        maxFieldName.substring(0, 1).toLocaleUpperCase() +
                        maxFieldName.substring(1, maxFieldName.length);
                    maxFieldLabel = maxFieldLabel.replace(/([a-z])([A-Z])/g, "$1 $2");
                }

                if (fieldValue > maxFieldValue) {
                    errorMessage =
                        rules.message ||
                        `${fieldLabel} must be equal or smaller than ${maxFieldLabel}`;
                    return errorMessage;
                }
            }

            if (
                key === "len" &&
                ((fieldPattern && rules[key] !== STR.removeNumberPattern(fieldValue).length) ||
                    (!fieldPattern && rules[key] !== fieldValue.length))
            ) {
                errorMessage = rules.message || `${fieldLabel} length must be ${rules[key]}`;
                return errorMessage;
            }

            if (key === "regex" && !rules[key].test(fieldValue)) {
                errorMessage = rules.message || `${fieldLabel} regex ${rules[key]}`;
                return errorMessage;
            }

            if (key === "type" && rules[key] === "email") {
                const isEmail = this.validateEmail(fieldValue);
                if (!isEmail) {
                    errorMessage = rules.message || `${fieldLabel} is invalid.`;
                    return errorMessage;
                }
            }

            if (
                key === "type" &&
                rules[key] === "number" &&
                ((fieldPattern && isNaN(+STR.removeNumberPattern(fieldValue))) ||
                    (!fieldPattern && isNaN(fieldValue)))
            ) {
                errorMessage = rules.message || `${fieldLabel} is not number.`;
                return errorMessage;
            }

            if (key === "check") {
                const isValid = typeof rules[key] === "function" ? rules[key](fieldValue) : !!rules[key];
                if (!isValid) {
                    errorMessage = rules.message || `${fieldLabel} validation failed`;
                    return errorMessage;
                }
            }

            if (key === "fields") {
                for (const subKey of rules[key]) {
                    const subFormItem = fieldsMap.get(subKey);
                    const subField = subFormItem.$slots.field("field")[0];
                    const subValue = subField.props.value;

                    let subLabel = subFormItem.label;
                    // eslint-disable-next-line max-depth
                    if (!subLabel) {
                        subLabel =
                            subKey.substring(0, 1).toLocaleUpperCase() +
                            subKey.substring(1, subKey.length);
                        subLabel = subLabel.replace(/([a-z])([A-Z])/g, "$1 $2");
                    }
                    // eslint-disable-next-line max-depth
                    if (!subValue && subField.type.name === "BInput") {
                        errorMessage =
                            rules.message ||
                            `${fieldLabel} is not valid, it's ${subLabel} is not found`;
                        return errorMessage;
                    }
                }
            }
        }

        return errorMessage;
    }

    /**
     * all inputted from form
     *
     * @param {*} screenRef
     * @param {string} formRef - Form ref name
     * @example
     * UT.clearForm(this, "formInformationDetailRef", {
     *     ignoreFields: ["employeeNo"]
     * });
     */
    static clearForm(screenRef: any, formRef: string, options?: { ignoreFields: Array<string> }): void {
        const formItems = screenRef.$refs[formRef].getFormItems();
        for (const formItem of formItems) {
            const field = formItem.$slots.field("field")[0];
            const fieldName = field.props.ref;
            // const fieldValue = screenRef.store[fieldName];

            // # Clear tooltip
            formItem.updateTooltip(false, "success");

            if (
                options?.ignoreFields &&
                options?.ignoreFields.find((element) => element === fieldName) === fieldName
            ) {
                continue;
            }

            if (field.props["onUpdate:value"]) {
                if (typeof field.props.value === "object") {
                    field.props["onUpdate:value"]({});
                } else {
                    field.props["onUpdate:value"]("");
                }
            }

            // if (typeof fieldValue == "object") {
            // 	screenRef.store[fieldName] = [];
            // } else {
            // 	screenRef.store[fieldName] = "";
            // }
        }
    }

    /**
     * minus object from array pick list
     *
     * @author Sienghor
     * @param {Array<{code: string}>} arrayList
     * @param {Array<{code: string}>} minusList
     * @example
     *  import { WorkStatusTypeCode } from "../../shared/picklist/common-picklist";
     *  export const DRF999004SC00Store = defineStore("DRF999004SC00Store", {
     *      state: () => ({
     *          workStatusOpts: UT.pickListMinus( WorkStatusTypeCode, ["01", "02"] ),
     *      }),
     *  });
     */
    static pickListMinus(
        arrayList: Array<{ code: string }>,
        minusList: Array<string>
    ): Array<{ code: string }> {
        return arrayList.filter((obj) => !minusList.includes(obj.code));
    }

    /**
     * Set fields visible
     *
     * @author Sienghor
     * @param {*} screenRef
     * @param {{ fields: Array<string>, visible: boolean }} options
     * @example
     * const visibleFields = [ "grid01", "testRadio", "btnDetail" ];
     *  UT.arraySetVisible( this, {
     *      fields:visibleFields,
     *      visible: false,
     *  } );
     */
    static arraySetVisible(screenRef: any, options: { fields: Array<string>; visible: boolean }): void {
        for (const fieldName of Object.keys(screenRef.$refs)) {
            if (options.fields.indexOf(fieldName) < 0) {
                continue;
            }

            const fieldRef = screenRef.$refs[fieldName];

            if (!fieldRef) {
                continue;
            }

            try {
                const colEl =
                    fieldRef.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent
                        .$el;
                if (!options.visible) {
                    colEl.classList.add("hide");
                }
                if (options.visible) {
                    colEl.classList.remove("hide");
                }
            } catch {
                // btn
                if (!options.visible) {
                    fieldRef.$el.classList.add("hide");
                }
                if (options.visible) {
                    fieldRef.$el.classList.remove("hide");
                }
            }
        }
    }

    /* eslint-disable */
    static debounce(func: Function, delay: number): any {
        let timeout: any;

        return function (this: any, ...args: any[]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.call(this, ...args), delay);
        };
    }
    /* eslint-enable */
    /**
     * Get Cookie By Name
     * @param {string} name Name of cookie
     * @returns return cookie value base on its key
     *
     * A function used to get all cookie set by current domain and
     * return cookie value base on its key
     */
    static getCookie(name: string): string {
        const regex = new RegExp(`(^| )${name}=([^;]+)`);
        const match = RegExp(regex).exec(document.cookie);
        if (match) {
            return match[2];
        }
        return "";
    }

    /**
     * Get browser info
     * @returns {BrowserInfo}
     * Will remove potentially dangerous script in html string.
     *
     * return browser name and version
     */
    static getBrowserInfo(): BrowserInfo {
        // eslint-disable-next-line import/no-named-as-default-member
        const result = Bowser.getParser(window.navigator.userAgent);

        if (result) {
            return {
                browser: `${result.getBrowserName()} ${result.getBrowserVersion()}`,
                os: `${result.getOSName()} ${result.getOSVersion()}`,
                platform: `${result.getPlatformType()}`
            };
        }
        return { browser: "", os: "", platform: "" };
    }

    /**
     * Filter out dangerous string
     * @param {string} html
     * @returns {string}
     *
     * example: <p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>
     * will be filtered out to <p>abc</p>
     */
    static purifyHTML(html: string): string {
        return DOMPurify.sanitize(html);
    }

    /**
     * Removes HTML tags from a given string.
     * @param {string} html - The input string containing HTML tags.
     * @returns {string} - The input string with all HTML tags removed.
     */
    static removeHtml(html: string): string {
        if (!html)
            return "";
        return html.replace(/<\/?[^>]+(>|$)|&\w+;/g, "");
    }

    /**
     * Return the current locale as a string.
     * The locale is returned in the format of the first character being uppercase, followed by the rest of the string in lowercase.
     * If the locale is not found, the function will return "En".
     * @returns {string} - The current locale.
     */
    static getCurrentLocale(): string {
        const lang = i18n?.global?.locale.value;
        if (!lang)
            return "En";
        return lang.charAt(0).toLocaleUpperCase() + lang.slice(1);
    }

    /**
     * Set the current locale to the given value.
     * The locale should be a valid language code.
     * @param {string} value - The new locale.
     */
    static setCurrentLocale(value: string): void {
        i18n.global.locale.value = value;
    }
}

export interface CustomRules {
    [field: string]: Rules | Array<Rules>;
}

export interface Rules {
    type?: RuleFieldType;
    regex?: RegExp;
    min?: { field: string } | number | string;
    max?: { field: string } | number | string;
    len?: number;
    label?: string;
    fields?: [string];
    check?: boolean | (() => boolean) | ((value: unknown) => boolean);
    message?: string;
    ignoreLenCheck?: boolean;
}

export type RuleFieldType = "tiny" | "codevalue" | "number" | "date" | "string" | "email";

export type InputType = "M" | "O" | "X";

interface BrowserInfo {
    browser: string,
    os: string,
    platform: string
}
