# B-Components Documentation

This document describes all the custom B-components cloned from the web-portal-frontend-dev project. These components are wrappers around Ant Design Vue components with additional functionality, consistent styling, and custom behaviors.

## Overview

All B-components are registered globally and can be used throughout the application without importing. They follow the same patterns as the original web-portal-frontend-dev project but are modernized for Vue 3 and TypeScript.

## Available Components

### 1. BButton

**Purpose**: Enhanced button component with predefined modes and icons.

**Props**:
- `mode`: Predefined button styles (`search`, `clear`, `excel`, `register`, `delete`, `edit`, `save`, `cancel`, `print`, `calc`)
- `type`: Manual button type override
- `loading`: Loading state

**Features**:
- Automatic icon assignment based on mode
- Consistent sizing (`size="large"`)
- Custom color schemes for different modes
- Built-in loading state handling

**Example**:
```vue
<b-button mode="search" @click="handleSearch">Search</b-button>
<b-button mode="excel" :loading="exporting">Export</b-button>
<b-button mode="delete" @click="handleDelete">Delete</b-button>
```

### 2. BInput

**Purpose**: Enhanced input with pattern validation and formatting.

**Props**:
- `value`: Input value (v-model supported)
- `pattern`: Input pattern (`integer`, `decimal`, `currency`, `phone`)
- `disable`: Disable state
- `required`: Required field styling
- `noSpacesSymbols`: Remove spaces and symbols
- `maxlength`: Maximum length

**Features**:
- Auto-formatting based on pattern
- Input validation and restriction
- Consistent styling and sizing
- Required field visual indicators

**Example**:
```vue
<b-input v-model:value="amount" pattern="currency" placeholder="0.00" />
<b-input v-model:value="phone" pattern="phone" placeholder="Phone" />
<b-input v-model:value="count" pattern="integer" required />
```

### 3. BSelect

**Purpose**: Enhanced select dropdown with options support.

**Props**:
- `value`: Selected value (v-model supported)
- `options`: Array of `{label, value, disabled?}` objects
- `disable`: Disable state
- `required`: Required field styling
- `allowClear`: Show clear button
- `showSearch`: Enable search functionality
- `placeholder`: Placeholder text

**Features**:
- Options array support
- Consistent styling and sizing
- Built-in search and clear functionality

**Example**:
```vue
<b-select
  v-model:value="selected"
  :options="[
    {label: 'Option 1', value: 'opt1'},
    {label: 'Option 2', value: 'opt2'}
  ]"
  placeholder="Choose option"
/>
```

### 4. BDatePicker

**Purpose**: Enhanced date picker with validation and formatting.

**Props**:
- `value`: Date value (v-model supported)
- `format`: Date format (default: "DD-MMM-YYYY")
- `disable`: Disable state
- `disableFuture`: Disable future dates
- `disablePast`: Disable past dates
- `maxDate`: Maximum selectable date
- `minDate`: Minimum selectable date
- `required`: Required field styling

**Features**:
- Flexible date validation
- Consistent formatting
- Full-width styling
- Date range restrictions

**Example**:
```vue
<b-date-picker
  v-model:value="startDate"
  :disableFuture="true"
  placeholder="Select start date"
/>
```

### 5. BTable

**Purpose**: Enhanced table with advanced features.

**Props**:
- `columns`: Table column definitions
- `dataSource`: Table data array
- `pagination`: Pagination configuration or false
- `loading`: Loading state
- `rowSelection`: Row selection configuration

**Features**:
- Enhanced pagination with size changer and quick jumper
- Loading skeleton support
- Row click and double-click events
- Consistent styling and spacing
- Automatic key generation

**Example**:
```vue
<b-table
  :columns="columns"
  :data-source="data"
  :pagination="{pageSize: 10}"
  @change="handleChange"
/>
```

### 6. BForm & BFormItem

**Purpose**: Enhanced form components with validation support.

**BForm Props**:
- `model`: Form data object
- `layout`: Form layout (`vertical`, `horizontal`, `inline`)

**BFormItem Props**:
- `label`: Field label
- `required`: Required field indicator
- `status`: Validation status
- `help`: Help text
- `displayLabel`: Label display style

**Features**:
- Form validation context
- Error tooltip display
- Consistent spacing and styling
- Slot-based field content

**Example**:
```vue
<b-form :model="formData" layout="vertical">
  <b-form-item label="Username" required>
    <template #field>
      <b-input v-model:value="formData.username" />
    </template>
  </b-form-item>
</b-form>
```

### 7. Layout Components

**BRow & BCol**: Grid system wrappers
**BSpace**: Spacing component wrapper
**BFlex**: Flexbox layout wrapper

**Example**:
```vue
<b-row :gutter="16">
  <b-col :span="12">Column 1</b-col>
  <b-col :span="12">Column 2</b-col>
</b-row>

<b-space>
  <b-button mode="search">Search</b-button>
  <b-button mode="clear">Clear</b-button>
</b-space>

<b-flex justify="space-between">
  <span>Left</span>
  <span>Right</span>
</b-flex>
```

### 8. BTabs & BTabPane

**Purpose**: Enhanced tabs with consistent styling.

**Example**:
```vue
<b-tabs v-model:activeKey="activeTab">
  <b-tab-pane key="1" tab="Tab 1">Content 1</b-tab-pane>
  <b-tab-pane key="2" tab="Tab 2">Content 2</b-tab-pane>
</b-tabs>
```

### 9. BCard

**Purpose**: Enhanced card with consistent styling.

**Features**:
- Consistent border radius and shadows
- Enhanced header styling
- Proper spacing

**Example**:
```vue
<b-card title="Card Title">
  <p>Card content</p>
  <template #extra>
    <b-button mode="edit">Edit</b-button>
  </template>
</b-card>
```

### 10. BSelectOption

**Purpose**: Select option component for use within BSelect.

**Props**:
- `value`: Option value

**Example**:
```vue
<b-select v-model:value="selected">
  <b-select-option value="opt1">Option 1</b-select-option>
  <b-select-option value="opt2">Option 2</b-select-option>
</b-select>
```

## Global Registration

All B-components are automatically registered globally in `main.ts`:

```typescript
import { registerBComponents } from './components/B'

const app = createApp(App)
registerBComponents(app) // Registers all B-components globally
```

## Styling

All B-components include:
- Consistent spacing and sizing
- Custom color schemes
- Responsive design
- Enhanced visual feedback
- SCSS-based styling with deep selectors

## TypeScript Support

All components are fully typed with:
- Proper prop definitions
- Event emission types
- Method signatures
- Interface definitions

## Usage Patterns

### Form Pattern
```vue
<b-form :model="formData">
  <b-row :gutter="16">
    <b-col :span="12">
      <b-form-item label="Field 1" required>
        <template #field>
          <b-input v-model:value="formData.field1" />
        </template>
      </b-form-item>
    </b-col>
  </b-row>

  <b-flex justify="end" gap="12">
    <b-button mode="clear" @click="reset">Clear</b-button>
    <b-button mode="save" @click="save">Save</b-button>
  </b-flex>
</b-form>
```

### Table Pattern
```vue
<b-card>
  <template #extra>
    <b-space>
      <b-button mode="excel" @click="export">Export</b-button>
      <b-button mode="register" @click="add">Add New</b-button>
    </b-space>
  </template>

  <b-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    @change="handleChange"
  />
</b-card>
```

## Browser Support

All B-components support:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Responsive design principles
- Touch-friendly interactions

## Migration from Ant Design Vue

To migrate from regular Ant Design Vue components:

1. Replace `a-` prefix with `b-` prefix
2. Use `template #field` slot for form items
3. Use `mode` prop instead of `type` for buttons
4. Use `:options` array for selects instead of child options
5. Update any custom styling to work with B-component classes

This maintains the same functionality while providing enhanced features and consistent styling across the application.
