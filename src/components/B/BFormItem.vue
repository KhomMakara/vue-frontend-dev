<template>
  <a-form-item
      :label="label"
      :required="required"
      :validate-status="status"
      :label-col="{ style: { display: displayLabel } }"
      v-bind="$attrs"
  >
      <a-tooltip
          :open="open"
          :title="title"
          placement="bottomLeft"
          color="red"
          trigger="focus"
          destroy-tooltip-on-hide
      >
          <div class="input_search">
              <slot name="field"></slot>
          </div>
      </a-tooltip>
      <slot name="button"></slot>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BFormItem",
  inject: {
      form: { default: null },
      formItems: { default: null },
      formItemFields: { default: null }
  },
  provide() {
      return {
          formItem: this // Provide formItem to child components
      };
  },
  props: {
      label: {
          type: String,
          default: ""
      },
      displayLabel: {
          type: String,
          default: "block"
      }
  },
  data() {
      return {
          title: "",
          open: false,
          status: "success",
          field: {} as any,
          fieldIndex: 0,
          required: false
      };
  },
  mounted() {
      // # Provide & Inject
      if (this.formItems) {
          // Register this form item with the parent form
          (this.formItems as Array<any>).push(this);

          this.fieldIndex = (this.formItemFields as Array<any>).length;
          (this.formItemFields as Array<any>).push(this.field);
      }
  },
  methods: {
      focusNext() {
          // Find the checkbox input for "Pear" and focus on it
          const formItems = this.formItemFields as Array<any>;
          const formItemsLength = formItems.length;
          if (formItemsLength <= this.fieldIndex + 1) {
              return false;
          }
          const formItem = formItems[this.fieldIndex + 1];
          let isFieldDisable = formItem.innerDisable;
          // # skip for disable field
          if (isFieldDisable) {
              for (const formItem of formItems.slice(this.fieldIndex + 2)) {
                  isFieldDisable = formItem.innerDisable;
                  if (!isFieldDisable) {
                      break;
                  }
              }
          }

          const fieldRef = formItem.$refs;

          if (fieldRef && fieldRef.el && fieldRef.el.focus) {
              fieldRef.el.focus();
          }
      },
      autoShowTooltip() {
          this.open = this.status === "error";
      },
      updateTooltip(open: boolean, status?: "success" | "warning" | "error", title?: string) {
          this.open = open;
          this.title = title || this.title;
          this.status = status || this.status;

          // Access the root element of the component
          const rootElement = this.$el;

          // Get the HTMLCollection
          const collectionCheckBoxInner =
              rootElement.getElementsByClassName("ant-checkbox-inner");

          const collectionRadioInner = rootElement.getElementsByClassName("ant-radio-inner");
          if (this.status === "error") {
              for (const item of collectionCheckBoxInner) {
                  item.classList.add("error-box");
              }
              for (const item of collectionRadioInner) {
                  item.classList.add("error-box");
              }
          } else {
              for (const item of collectionCheckBoxInner) {
                  item.classList.remove("error-box");
              }
              for (const item of collectionRadioInner) {
                  item.classList.remove("error-box");
              }
          }
      },
      getTooltipOpen() {
          return this.open;
      },
      getTooltipTitle() {
          return this.title;
      },
      getTooltipStatus() {
          return this.status;
      }
  }
});
</script>

<style scoped>
/* prettier-ignore-start */
/* prettier-ignore-end */
</style>
