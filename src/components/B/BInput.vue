<template>
  <a-input
      ref="el"
      :value="formattedValue"
      :disabled="innerDisable"
      :class="{ required: required }"
      size="large"
      @input="onInputCustom"
      @keydown="onKeydown"
      @paste="onPaste"
      v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import STR, { type NumberPattern } from "@/utils/str";

export default defineComponent({
  name: "BInput",
  type: "Input",
  inject: ["formItem"],
  props: {
      value: {
          type: [String, Number],
          default: ""
      },
      pattern: {
          type: String as PropType<NumberPattern>,
          default: ""
      },
      disable: {
          type: Boolean,
          default: true
      },
      onInput: {
          type: Function,
          default: null
      },
      noSpacesSymbols: {
          type: Boolean,
          default: false
      }
  },
  emits: ["update:value", "input"],
  data() {
      return {
          attribute: new Map(),
          innerDisable: false,
          required: false
      };
  },
  // eslint-disable-next-line no-restricted-syntax
  watch: {
      value() {
          // if (this.pattern) {
          //     this.$emit("update:value", STR.removeNumberPattern(this.value as string));
          // }
      }
  },
  computed: {
      // Compute the formatted value based on the pattern
      formattedValue() {
          if (!this.pattern) {
              return this.value; // Return as-is if no pattern is provided
          }

          return this.formatPattern(this.value);
      },
      maxlength() {
          if (this.pattern) {
              return STR.npv[this.pattern].length;
          }
          return undefined;
      }
  },
  mounted() {
      // # Provide & Inject
      if (this.formItem) {
          (this.formItem as any).field = this;
      }

      // # Initial self data
      this.innerDisable = this.disable !== false;
  },
  methods: {
      sanitizeAlphaNumeric(text: string) {
          if (!text) return "";
          return String(text).replace(/[^a-zA-Z0-9]/g, "");
      },
      // Format the input value based on the provided pattern
      formatPattern(value: any) {
          const digits = String(value).replace(/\D/g, ""); // Remove non-digit characters

          if (this.pattern === "Number") {
              return digits;
          }
          return STR.setNumberPattern(digits, this.pattern);
      },
      // Handle input changes and update the value
      onInputCustom(event: any) {
          const input = event.target;
          let rawValue = input.value;
          if (this.noSpacesSymbols) {
              const sanitized = this.sanitizeAlphaNumeric(rawValue);
              if (sanitized !== rawValue) {
                  rawValue = sanitized;
                  input.value = sanitized;
              }
          }
          const cursorPosition = input.selectionStart;
          const unformattedValue = STR.removeNumberPattern(rawValue); // Remove non-digit characters

          if (this.pattern) {
              const formattedValue = this.formatPattern(unformattedValue);

              // Calculate the new cursor position
              const newCursorPosition = this.calculateNewCursorPosition(
                  rawValue,
                  formattedValue,
                  cursorPosition
              );

              // Update the value
              this.$emit("update:value", unformattedValue);

              /* eslint-disable */
              // Restore the cursor position
              this.$nextTick(() => {
                  input.setSelectionRange(newCursorPosition, newCursorPosition);
              });
              /* eslint-enable */
          } else {
              this.$emit("update:value", rawValue);
          }
          // Emit the event
          this.$emit("input", event);

          // # Focus next field
          const maxLength = input?.maxLength;
          if (input && maxLength > 0 && event.target.value.length >= maxLength) {
              (this.formItem as any).focusNext();
          }
      },
      // Calculate the new cursor position after formatting
      calculateNewCursorPosition(
          rawValue: string,
          formattedValue: string,
          cursorPosition: number
      ) {
          let newCursorPosition = cursorPosition;
          let addedChars = 0;

          for (const [i, char] of Array.from(rawValue).entries()) {
              if (i >= cursorPosition) break;
              if (char !== formattedValue[i + addedChars]) {
                  addedChars++;
              }
          }

          newCursorPosition += addedChars;

          return newCursorPosition;
      },
      onKeydown(event: any) {
          if (!this.noSpacesSymbols) return;
          const key = event.key;
          const allowedKeys = [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Tab",
              "Home",
              "End",
              "Enter",
              "Escape"
          ];
          const isCtrlCombo = (event.ctrlKey || event.metaKey) && ["a", "c", "v", "x", "z", "y"].includes(key.toLowerCase());
          if (allowedKeys.includes(key) || isCtrlCombo || event.isComposing) return;
          if (key === " " || (key.length === 1 && !/[a-zA-Z0-9]/.test(key))) {
              event.preventDefault();
          }
      },
      onPaste(event: any) {
          if (!this.noSpacesSymbols) return;
          const clipboard = event.clipboardData || (window as any).clipboardData;
          const text = clipboard ? clipboard.getData("text") : "";
          const sanitized = this.sanitizeAlphaNumeric(text);
          if (text !== sanitized) {
              event.preventDefault();
              const input = event.target as HTMLInputElement;
              const start = input.selectionStart || 0;
              const end = input.selectionEnd || 0;
              const currentValue = input.value || "";
              const newValue = currentValue.slice(0, start) + sanitized + currentValue.slice(end);
              this.$emit("update:value", newValue);
              /* eslint-disable */
              this.$nextTick(() => {
                  /* eslint-enable */
                  const cursor = start + sanitized.length;
                  input.setSelectionRange(cursor, cursor);
              });
          }
      },
      setAttribute(key: string, val: any) {
          this.attribute.set(key, val);
      },
      getAttribute(key: string) {
          return this.attribute.get(key);
      },
      setEnable(enable: boolean = true) {
          this.innerDisable = !enable;
      },
      setRequired(required: boolean = true) {
          (this.formItem as any).required = required;
          this.required = required;
      }
  }
});
</script>

<style scoped>
/* prettier-ignore-start */
/* prettier-ignore-end */
</style>
