<template>
  <a-date-picker
    ref="el"
    style="width: 100%"
    :value="formattedValue"
    :disabled="innerDisable"
    :class="{ required: required, 'b-date-picker': true }"
    :format="format"
    :disabled-date="getDisabledDate"
    size="large"
    @change="onChangeCustom"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs, { type Dayjs } from 'dayjs';

export default defineComponent({
  name: "BDatePicker",
  inject: {
    formItem: {
      from: "formItem",
      default: null
    }
  },
  props: {
    value: {
      type: [String, Object],
      default: ""
    },
    format: {
      type: String,
      default: "DD-MMM-YYYY"
    },
    disable: {
      type: Boolean,
      default: false
    },
    disableFuture: {
      type: Boolean,
      default: false
    },
    disablePast: {
      type: Boolean,
      default: false
    },
    maxDate: {
      type: String,
      default: null
    },
    minDate: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:value", "change"],
  data() {
    return {
      innerDisable: false
    };
  },
  computed: {
    formattedValue(): Dayjs | null {
      if (!this.value) return null;

      if (typeof this.value === 'string') {
        return dayjs(this.value);
      }

      return this.value as Dayjs;
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
    onChangeCustom(date: Dayjs | null, dateString: string) {
      const value = date ? date.format('YYYY-MM-DD') : '';
      this.$emit("update:value", value);
      this.$emit("change", value, dateString);
    },
    getDisabledDate(current: Dayjs): boolean {
      if (!current) return false;

      const today = dayjs();

      // Disable future dates
      if (this.disableFuture && current.isAfter(today, 'day')) {
        return true;
      }

      // Disable past dates
      if (this.disablePast && current.isBefore(today, 'day')) {
        return true;
      }

      // Disable dates after maxDate
      if (this.maxDate && current.isAfter(dayjs(this.maxDate), 'day')) {
        return true;
      }

      // Disable dates before minDate
      if (this.minDate && current.isBefore(dayjs(this.minDate), 'day')) {
        return true;
      }

      return false;
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
.b-date-picker {
  &.required {
    .ant-picker {
      border-color: #ff4d4f;
    }

    &.ant-picker-focused {
      border-color: #ff7875;
      box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
    }
  }
}
</style>
