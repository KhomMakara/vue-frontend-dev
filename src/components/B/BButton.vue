<template>
  <a-button
    :type="type ? type : onCheckButtonType()"
    v-bind="$attrs"
    size="large"
    :loading="loading"
    :class="getButtonClass()"
  >
    <component :class="getIconClass()" :is="iconComponent" />
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
import { defineComponent, type Component, type PropType } from "vue";
import {
  SearchOutlined,
  ClearOutlined,
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  EditOutlined,
  SaveOutlined,
  PrinterOutlined,
  CloseOutlined,
  CalculatorOutlined
} from "@ant-design/icons-vue";
import type { ButtonType } from "ant-design-vue/es/button/buttonTypes";

type ButtonMode =
  | "search"
  | "clear"
  | "excel"
  | "register"
  | "delete"
  | "list"
  | "edit"
  | "save"
  | "cancel"
  | "calc"
  | "print";

export default defineComponent({
  name: "BButton",
  props: {
    mode: {
      type: String as PropType<ButtonMode>,
      required: false,
      default: ""
    },
    type: {
      type: String as PropType<ButtonType>,
      required: false,
      default: ""
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    const iconButton: Record<ButtonMode, Component> = {
      search: SearchOutlined,
      clear: ClearOutlined,
      excel: DownloadOutlined,
      register: PlusOutlined,
      delete: DeleteOutlined,
      list: UnorderedListOutlined,
      edit: EditOutlined,
      save: SaveOutlined,
      cancel: CloseOutlined,
      print: PrinterOutlined,
      calc: CalculatorOutlined
    };

    return {
      iconButton
    };
  },
  computed: {
    iconComponent(): Component {
      return this.iconButton[this.mode];
    }
  },
  methods: {
    onCheckButtonType(): ButtonType | undefined {
      if (
        this.mode === "search" ||
        this.mode === "register" ||
        this.mode === "list" ||
        this.mode === "edit" ||
        this.mode === "save" ||
        this.mode === "calc"
      ) {
        return "primary";
      } else if (
        this.mode === "clear" ||
        this.mode === "cancel" ||
        this.mode === "excel"
      ) {
        return "default";
      } else if (this.mode === "delete") {
        return "primary";
      } else {
        return "default";
      }
    },
    getIconClass(): string {
      if (this.mode === "calc") {
        return "ico_calc";
      }
      return "";
    },
    getButtonClass(): string {
      return `b-button b-button-${this.mode}`;
    }
  }
});
</script>

<style lang="scss" scoped>
.b-button {
  &.b-button-delete {
    background-color: #ff4d4f;
    border-color: #ff4d4f;

    &:hover {
      background-color: #ff7875;
      border-color: #ff7875;
    }
  }

  &.b-button-excel {
    background-color: #52c41a;
    border-color: #52c41a;
    color: white;

    &:hover {
      background-color: #73d13d;
      border-color: #73d13d;
    }
  }
}

.ico_calc {
  // Custom calculator icon styles
}
</style>
