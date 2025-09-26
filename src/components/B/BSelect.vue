<template>
  <a-select
    ref="el"
    :class="{ required: required, 'b-select': true }"
    :value="value"
    :disabled="innerDisable"
    @change="onChangeCustom"
    :placeholder="placeholder"
    v-bind="$attrs"
    size="large"
    :allow-clear="allowClear"
    :show-search="showSearch"
  >
    <a-select-option
      v-for="(option, key) in processedOptions"
      :key="key"
      :value="option.value"
    >
      {{ option.label }}
    </a-select-option>
    <slot></slot>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export default defineComponent({
  name: "BSelect",
  inject: {
    formItem: {
      from: "formItem",
      default: null
    }
  },
  emits: ["update:value", "change"],
  props: {
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
      required: false
    },
    value: {
      type: [String, Array, Number] as PropType<string | string[] | number>,
      default: ""
    },
    disable: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Please select"
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerDisable: false
    };
  },
  computed: {
    processedOptions(): SelectOption[] {
      return this.options.map(option => ({
        ...option,
        label: option.label || String(option.value),
        value: option.value
      }));
    }
  },
  watch: {
    disable: {
      handler(val: boolean) {
        this.innerDisable = val;
      },
      immediate: true
    }
  },
  methods: {
    onChangeCustom(value: string | string[] | number) {
      this.$emit("update:value", value);
      this.$emit("change", value);
    },
    focus() {
      const el = this.$refs.el as { focus?: () => void } | undefined;
      el?.focus?.();
    },
    blur() {
      const el = this.$refs.el as { blur?: () => void } | undefined;
      el?.blur?.();
    }
  }
});
</script>

<style lang="scss" scoped>
.b-select {
  &.required {
    .ant-select-selector {
      border-color: #ff4d4f !important;
    }

    &.ant-select-focused .ant-select-selector {
      border-color: #ff7875 !important;
      box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2) !important;
    }
  }
}
</style>
