<template>
  <div class="component-showcase">
    <b-card title="B-Component Showcase" class="showcase-header">
      <p>This page demonstrates all the custom B-components cloned from the web-portal-frontend-dev project.</p>
    </b-card>

    <!-- Buttons Showcase -->
    <b-card title="B-Button Components" class="showcase-section">
      <h4>Different Button Modes:</h4>
      <b-space wrap>
        <b-button mode="search">Search</b-button>
        <b-button mode="clear">Clear</b-button>
        <b-button mode="excel">Export Excel</b-button>
        <b-button mode="register">Add New</b-button>
        <b-button mode="edit">Edit</b-button>
        <b-button mode="save">Save</b-button>
        <b-button mode="delete">Delete</b-button>
        <b-button mode="cancel">Cancel</b-button>
        <b-button mode="print">Print</b-button>
        <b-button mode="calc">Calculate</b-button>
      </b-space>

      <br><br>
      <h4>Loading States:</h4>
      <b-space>
        <b-button mode="search" :loading="true">Loading...</b-button>
        <b-button mode="save" :loading="loadingState">Toggle Loading</b-button>
      </b-space>
      <br><br>
      <b-button @click="loadingState = !loadingState" mode="register">
        Toggle Loading State
      </b-button>
    </b-card>

    <!-- Form Components Showcase -->
    <b-card title="B-Form Components" class="showcase-section">
      <b-form :model="formData" layout="vertical">
        <b-row :gutter="16">
          <b-col :span="8">
            <b-form-item label="Text Input" required>
              <template #field>
                <b-input
                  v-model:value="formData.textInput"
                  placeholder="Enter some text"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="8">
            <b-form-item label="Number Input (Integer Pattern)">
              <template #field>
                <b-input
                  v-model:value="formData.numberInput"
                  pattern="integer"
                  placeholder="Numbers only"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="8">
            <b-form-item label="Currency Input">
              <template #field>
                <b-input
                  v-model:value="formData.currencyInput"
                  pattern="currency"
                  placeholder="0.00"
                />
              </template>
            </b-form-item>
          </b-col>
        </b-row>

        <b-row :gutter="16">
          <b-col :span="8">
            <b-form-item label="Date Picker">
              <template #field>
                <b-date-picker
                  v-model:value="formData.dateInput"
                  placeholder="Select date"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="8">
            <b-form-item label="Select Dropdown">
              <template #field>
                <b-select
                  v-model:value="formData.selectInput"
                  placeholder="Choose option"
                  :options="selectOptions"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="8">
            <b-form-item label="Phone Number">
              <template #field>
                <b-input
                  v-model:value="formData.phoneInput"
                  pattern="phone"
                  placeholder="Phone number"
                />
              </template>
            </b-form-item>
          </b-col>
        </b-row>

        <b-row :gutter="16">
          <b-col :span="24">
            <b-flex justify="end" gap="12">
              <b-button mode="clear" @click="clearForm">Clear Form</b-button>
              <b-button mode="save" @click="saveForm">Save Form</b-button>
            </b-flex>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <!-- Table Showcase -->
    <b-card title="B-Table Component" class="showcase-section">
      <b-table
        :columns="tableColumns"
        :data-source="tableData"
        :pagination="{ pageSize: 5, showSizeChanger: true }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'Active' ? 'green' : 'red'">
              {{ record.status }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <b-space>
              <b-button mode="edit" size="small" @click="editRecord(record)">Edit</b-button>
              <b-button mode="delete" size="small" @click="deleteRecord(record)">Delete</b-button>
            </b-space>
          </template>
        </template>
      </b-table>
    </b-card>

    <!-- Tabs Showcase -->
    <b-card title="B-Tabs Component" class="showcase-section">
      <b-tabs v-model:activeKey="activeTab">
        <b-tab-pane key="1" tab="Tab 1">
          <p>Content of Tab Pane 1</p>
          <b-space>
            <b-button mode="search">Search in Tab 1</b-button>
            <b-button mode="excel">Export Tab 1</b-button>
          </b-space>
        </b-tab-pane>
        <b-tab-pane key="2" tab="Tab 2">
          <p>Content of Tab Pane 2</p>
          <b-form :model="tabFormData">
            <b-form-item label="Tab 2 Input">
              <template #field>
                <b-input v-model:value="tabFormData.input" placeholder="Tab 2 data" />
              </template>
            </b-form-item>
          </b-form>
        </b-tab-pane>
        <b-tab-pane key="3" tab="Tab 3" disabled>
          <p>This tab is disabled</p>
        </b-tab-pane>
      </b-tabs>
    </b-card>

    <!-- Layout Components Showcase -->
    <b-card title="Layout Components (B-Row, B-Col, B-Space, B-Flex)" class="showcase-section">
      <h4>Grid Layout (B-Row + B-Col):</h4>
      <b-row :gutter="16">
        <b-col :span="6">
          <div class="grid-demo">Col-6</div>
        </b-col>
        <b-col :span="6">
          <div class="grid-demo">Col-6</div>
        </b-col>
        <b-col :span="6">
          <div class="grid-demo">Col-6</div>
        </b-col>
        <b-col :span="6">
          <div class="grid-demo">Col-6</div>
        </b-col>
      </b-row>
      <br>

      <h4>Space Layout (B-Space):</h4>
      <b-space direction="vertical" size="large">
        <b-space>
          <b-button mode="search">Button 1</b-button>
          <b-button mode="edit">Button 2</b-button>
          <b-button mode="save">Button 3</b-button>
        </b-space>
        <b-space>
          <span>Text 1</span>
          <span>Text 2</span>
          <span>Text 3</span>
        </b-space>
      </b-space>
      <br><br>

      <h4>Flex Layout (B-Flex):</h4>
      <b-flex justify="space-between" align="center">
        <span>Left Content</span>
        <b-space>
          <b-button mode="register" size="small">Add</b-button>
          <b-button mode="excel" size="small">Export</b-button>
        </b-space>
        <span>Right Content</span>
      </b-flex>
    </b-card>

    <div style="margin-bottom: 100px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ComponentShowcase",
  data() {
    return {
      loadingState: false,
      activeTab: "1",
      formData: {
        textInput: "",
        numberInput: "",
        currencyInput: "",
        dateInput: "",
        selectInput: "",
        phoneInput: ""
      },
      tabFormData: {
        input: ""
      },
      selectOptions: [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" },
        { label: "Disabled Option", value: "opt4", disabled: true }
      ],
      tableColumns: [
        { title: "ID", dataIndex: "id", key: "id", width: 80 },
        { title: "Name", dataIndex: "name", key: "name", width: 150 },
        { title: "Email", dataIndex: "email", key: "email", width: 200 },
        { title: "Status", dataIndex: "status", key: "status", width: 100 },
        { title: "Actions", key: "actions", width: 150 }
      ],
      tableData: [
        { id: 1, name: "John Doe", email: "john@example.com", status: "Active", key: "1" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", key: "2" },
        { id: 3, name: "Bob Wilson", email: "bob@example.com", status: "Active", key: "3" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", status: "Active", key: "4" },
        { id: 5, name: "Charlie Davis", email: "charlie@example.com", status: "Inactive", key: "5" },
        { id: 6, name: "Eva Martinez", email: "eva@example.com", status: "Active", key: "6" }
      ]
    };
  },
  methods: {
    clearForm() {
      this.formData = {
        textInput: "",
        numberInput: "",
        currencyInput: "",
        dateInput: "",
        selectInput: "",
        phoneInput: ""
      };
      this.$message.success("Form cleared!");
    },
    saveForm() {
      console.log("Form data:", this.formData);
      this.$message.success("Form saved successfully!");
    },
    editRecord(record: { id: number; name: string; email: string; status: string }) {
      console.log("Editing record:", record);
      this.$message.info(`Editing ${record.name}`);
    },
    deleteRecord(record: { id: number; name: string; email: string; status: string }) {
      console.log("Deleting record:", record);
      this.$message.warning(`Deleting ${record.name}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.component-showcase {
  .showcase-section {
    margin-bottom: 24px;
  }

  .showcase-header {
    margin-bottom: 24px;

    :deep(.ant-card-head) {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

      .ant-card-head-title {
        color: white;
        font-size: 18px;
      }
    }
  }

  .grid-demo {
    background: #f0f2f5;
    padding: 16px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }

  h4 {
    color: #333;
    margin: 16px 0 12px 0;
    font-weight: 600;
  }

  .ant-tag {
    margin: 0;
  }
}
</style>
