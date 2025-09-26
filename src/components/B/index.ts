// B-Component exports for global registration
export { default as BButton } from './BButton.vue';
export { default as BCard } from './BCard.vue';
export { default as BCol } from './BCol.vue';
export { default as BDatePicker } from './BDatePicker.vue';
export { default as BFlex } from './BFlex.vue';
export { default as BForm } from './BForm.vue';
export { default as BFormItem } from './BFormItem.vue';
export { default as BInput } from './BInput.vue';
export { default as BRow } from './BRow.vue';
export { default as BSelect } from './BSelect.vue';
export { default as BSelectOption } from './BSelectOption.vue';
export { default as BSpace } from './BSpace.vue';
export { default as BTable } from './BTable.vue';
export { default as BTabPane } from './BTabPane.vue';
export { default as BTabs } from './BTabs.vue';

// Import all components for registration helper
import BButton from './BButton.vue';
import BCard from './BCard.vue';
import BCol from './BCol.vue';
import BDatePicker from './BDatePicker.vue';
import BFlex from './BFlex.vue';
import BForm from './BForm.vue';
import BFormItem from './BFormItem.vue';
import BInput from './BInput.vue';
import BRow from './BRow.vue';
import BSelect from './BSelect.vue';
import BSelectOption from './BSelectOption.vue';
import BSpace from './BSpace.vue';
import BTable from './BTable.vue';
import BTabPane from './BTabPane.vue';
import BTabs from './BTabs.vue';

import type { App } from 'vue';

// Component map for registration
const components = {
  BButton,
  BCard,
  BCol,
  BDatePicker,
  BFlex,
  BForm,
  BFormItem,
  BInput,
  BRow,
  BSelect,
  BSelectOption,
  BSpace,
  BTable,
  BTabPane,
  BTabs
};

// Plugin function to register all B-components globally
export function registerBComponents(app: App): void {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}

// Export the components map
export default components;
