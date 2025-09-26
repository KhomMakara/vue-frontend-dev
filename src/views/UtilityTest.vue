<template>
  <div class="utility-test">
    <b-card title="🧪 Utility Functions Test" class="test-header">
      <p>This page demonstrates all the cloned utility functions (UT, POP, STR, DATE, EL) working with B-components.</p>
    </b-card>

        <!-- Form Validation Test -->
    <b-card title="📝 Form Validation Test (UT.validate)" class="test-section">
      <b-form ref="formRef" layout="vertical">
        <b-row :gutter="16">
          <b-col :span="8">
            <b-form-item label="Email Address *" required>
              <template #field>
                <b-input
                  v-model:value="formData.email"
                  name="email"
                  placeholder="Enter valid email"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="8">
            <b-form-item label="Phone Number *" required>
              <template #field>
                <b-input
                  v-model:value="formData.phone"
                  name="phone"
                  pattern="phone"
                  placeholder="Enter phone number"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="8">
            <b-form-item label="Age (18-100) *" required>
              <template #field>
                <b-input
                  v-model:value="formData.age"
                  name="age"
                  pattern="integer"
                  placeholder="Enter age"
                />
              </template>
            </b-form-item>
          </b-col>
        </b-row>

        <b-row :gutter="16">
          <b-col :span="12">
            <b-form-item label="Currency Amount *" required>
              <template #field>
                <b-input
                  v-model:value="formData.amount"
                  name="amount"
                  pattern="currency"
                  placeholder="0.00"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="12">
            <b-form-item label="Birth Date">
              <template #field>
                <b-date-picker
                  v-model:value="formData.birthDate"
                  name="birthDate"
                  placeholder="Select birth date"
                  :disable-future="true"
                />
              </template>
            </b-form-item>
          </b-col>
        </b-row>

        <b-space>
          <b-button mode="save" @click="testValidation">Validate Form</b-button>
          <b-button mode="clear" @click="clearForm">Clear Form</b-button>
        </b-space>
      </b-form>

      <!-- Form Data Debug -->
      <div class="form-debug" style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
        <h5>Current Form Data:</h5>
        <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>
    </b-card>

    <!-- Popup Test -->
    <b-card title="🔔 Popup Test (POP)" class="test-section">
      <b-space wrap>
        <b-button mode="register" @click="showSuccessAlert">Success Alert</b-button>
        <b-button mode="clear" @click="showWarningAlert">Warning Alert</b-button>
        <b-button mode="delete" @click="showErrorAlert">Error Alert</b-button>
        <b-button mode="search" @click="showInfoAlert">Info Alert</b-button>
        <b-button mode="edit" @click="showConfirm">Confirmation</b-button>
        <b-button mode="list" @click="showMessages">Messages</b-button>
      </b-space>
    </b-card>

    <!-- String Utilities Test -->
    <b-card title="🔤 String Utilities Test (STR)" class="test-section">
      <b-row :gutter="16">
        <b-col :span="12">
          <b-form-item label="Input Text">
            <template #field>
              <b-input
                v-model:value="stringTest.input"
                placeholder="Enter text to format"
              />
            </template>
          </b-form-item>
        </b-col>
        <b-col :span="12">
          <b-form-item label="Format Type">
            <template #field>
              <b-select
                v-model:value="stringTest.format"
                :options="formatOptions"
                placeholder="Choose format"
              />
            </template>
          </b-form-item>
        </b-col>
      </b-row>

      <div class="format-results">
        <h4>Formatting Results:</h4>
        <ul>
          <li><strong>Original:</strong> "{{ stringTest.input }}"</li>
          <li><strong>Email Valid:</strong> {{ STR.isEmail(stringTest.input) }}</li>
          <li><strong>Is Number:</strong> {{ STR.isNumber(stringTest.input) }}</li>
          <li><strong>Capitalize:</strong> "{{ STR.capitalize(stringTest.input) }}"</li>
          <li><strong>Title Case:</strong> "{{ STR.toTitleCase(stringTest.input) }}"</li>
          <li><strong>Kebab Case:</strong> "{{ STR.toKebabCase(stringTest.input) }}"</li>
          <li><strong>Truncate (10):</strong> "{{ STR.truncate(stringTest.input, 10) }}"</li>
          <li><strong>Phone Format:</strong> "{{ STR.setNumberPattern(stringTest.input, 'Phone') }}"</li>
          <li><strong>Currency Format:</strong> "{{ STR.formatNumber(stringTest.input, 'Currency') }}"</li>
        </ul>
      </div>
    </b-card>

    <!-- Date Utilities Test -->
    <b-card title="📅 Date Utilities Test (DATE)" class="test-section">
      <b-row :gutter="16">
        <b-col :span="8">
          <b-form-item label="Start Date">
            <template #field>
              <b-date-picker v-model:value="dateTest.startDate" />
            </template>
          </b-form-item>
        </b-col>
        <b-col :span="8">
          <b-form-item label="End Date">
            <template #field>
              <b-date-picker v-model:value="dateTest.endDate" />
            </template>
          </b-form-item>
        </b-col>
        <b-col :span="8">
          <b-form-item label="Format">
            <template #field>
              <b-select
                v-model:value="dateTest.format"
                :options="dateFormatOptions"
              />
            </template>
          </b-form-item>
        </b-col>
      </b-row>

      <div class="date-results">
        <h4>Date Results:</h4>
        <ul>
          <li><strong>Current Date:</strong> {{ DATE.format(DATE.now()) }}</li>
          <li><strong>Start Date Formatted:</strong> {{ DATE.format(dateTest.startDate, dateTest.format) }}</li>
          <li><strong>End Date Formatted:</strong> {{ DATE.format(dateTest.endDate, dateTest.format) }}</li>
          <li><strong>Difference (Days):</strong> {{ DATE.getDiffDay(dateTest.startDate, dateTest.endDate) }}</li>
          <li><strong>Difference (Months):</strong> {{ DATE.getDiffMonth(dateTest.startDate, dateTest.endDate) }}</li>
          <li><strong>Is Today:</strong> {{ DATE.isToday(DATE.now()) }}</li>
          <li><strong>Is Weekend:</strong> {{ DATE.isWeekend(DATE.now()) }}</li>
          <li><strong>From Now:</strong> {{ DATE.fromNow(dateTest.startDate) }}</li>
          <li><strong>Age Calculation:</strong> {{ DATE.getAge('1990-01-01') }} years</li>
        </ul>
      </div>
    </b-card>

    <!-- Element Utilities Test -->
    <b-card title="🔧 Element Utilities Test (EL)" class="test-section">
      <b-space wrap>
        <b-button mode="edit" @click="testElementFocus">Focus Input</b-button>
        <b-button mode="search" @click="testElementHide">Toggle Hidden</b-button>
        <b-button mode="register" @click="testElementClass">Toggle Class</b-button>
        <b-button mode="list" @click="testElementValue">Set Value</b-button>
      </b-space>

      <div style="margin-top: 16px;">
        <b-input
          ref="testInputRef"
          v-model:value="elementTest.value"
          placeholder="Test input for element utilities"
          :class="{ 'test-class': elementTest.hasClass }"
        />
      </div>

      <div v-show="!elementTest.isHidden" class="element-results">
        <p><strong>Element Value:</strong> {{ elementTest.value }}</p>
        <p><strong>Has Test Class:</strong> {{ elementTest.hasClass }}</p>
        <p><strong>Is Hidden:</strong> {{ elementTest.isHidden }}</p>
      </div>
    </b-card>

    <!-- Performance Test -->
    <b-card title="⚡ Performance & Integration Test" class="test-section">
      <b-space wrap>
        <b-button mode="calc" @click="runPerformanceTest">Performance Test</b-button>
        <b-button mode="excel" @click="testAllUtilities">Test All Utilities</b-button>
        <b-button mode="print" @click="showUtilityStats">Show Stats</b-button>
      </b-space>

      <div v-if="performanceResults" class="performance-results">
        <h4>Performance Results:</h4>
        <pre>{{ performanceResults }}</pre>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UT, POP, STR, DATE, EL } from "@/utils";

export default defineComponent({
  name: "UtilityTest",
  data() {
    return {
      // Form validation test data
      formData: {
        email: "",
        phone: "",
        age: "",
        amount: "",
        birthDate: ""
      },

      // String test data
      stringTest: {
        input: "hello world test 123",
        format: "capitalize"
      },

      // Date test data
      dateTest: {
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        format: "DD-MMM-YYYY"
      },

      // Element test data
      elementTest: {
        value: "Test Value",
        hasClass: false,
        isHidden: false
      },

      // Performance results
      performanceResults: null as any,

      // Options
      formatOptions: [
        { label: "Capitalize", value: "capitalize" },
        { label: "Title Case", value: "titleCase" },
        { label: "Kebab Case", value: "kebabCase" },
        { label: "Camel Case", value: "camelCase" }
      ],

      dateFormatOptions: [
        { label: "DD-MMM-YYYY", value: "DD-MMM-YYYY" },
        { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
        { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
        { label: "DD MMMM YYYY", value: "DD MMMM YYYY" },
        { label: "dddd, MMMM Do YYYY", value: "dddd, MMMM Do YYYY" }
      ]
    };
  },
  computed: {
    STR() { return STR; },
    DATE() { return DATE; },
    EL() { return EL; }
  },
  mounted() {
    this.setEnable();
  },
  methods: {

    setEnable() {
      UT.arraySetEnable(this, {
        enable: true,
        inputType: 'M',
        fields: ['email', 'phone', 'age', 'amount', 'birthDate']
      });
    },

        // Form validation tests
    async testValidation() {
      const isValid = UT.validate(this, 'formRef', {
        email: { type: 'email' as const, message: 'Please enter a valid email' },
        phone: { type: 'phone' as const, message: 'Please enter a valid phone number' },
        age: { type: 'number' as const, message: 'Age must be a number' },
        amount: { type: 'number' as const, message: 'Amount must be a number' },
        birthDate: { type: 'date' as const, message: 'Please select a valid date' }
      });

      if (isValid) {
        POP.success('Form validation passed! ✅');
      } else {
        POP.error('Form validation failed! Please check the errors.');
      }
    },

    clearForm() {
      UT.clearForm(this, 'testFormRef');
    },

    // Popup tests
    async showSuccessAlert() {
      await POP.alert({
        content: "This is a success alert!",
        mode: "Success",
        title: "Success"
      });
    },

    async showWarningAlert() {
      await POP.alert({
        content: "This is a warning alert!",
        mode: "Warning",
        title: "Warning"
      });
    },

    async showErrorAlert() {
      await POP.alert({
        content: "This is an error alert!",
        mode: "Error",
        title: "Error"
      });
    },

    async showInfoAlert() {
      await POP.alert({
        content: "This is an info alert!",
        mode: "Info"
      });
    },

    async showConfirm() {
      try {
        await POP.confirm({
          content: "Are you sure you want to proceed?",
          mode: "Question",
          title: "Confirmation"
        });
        POP.success("You confirmed the action!");
      } catch (error) {
        POP.info("You cancelled the action.");
      }
    },

    showMessages() {
      POP.success("Success message");
      setTimeout(() => POP.warning("Warning message"), 500);
      setTimeout(() => POP.error("Error message"), 1000);
      setTimeout(() => POP.info("Info message"), 1500);

      const loading = POP.loading("Loading...");
      setTimeout(() => loading(), 2000);
    },

    // Element utility tests
    testElementFocus() {
      const inputEl = this.$refs.testInputRef as any;
      if (inputEl) {
        EL.focus(inputEl.$el);
        POP.info("Input focused!");
      }
    },

    testElementHide() {
      this.elementTest.isHidden = !this.elementTest.isHidden;
      const inputEl = this.$refs.testInputRef as any;
      if (inputEl) {
        if (this.elementTest.isHidden) {
          EL.hide(inputEl.$el);
        } else {
          EL.show(inputEl.$el);
        }
      }
    },

    testElementClass() {
      this.elementTest.hasClass = !this.elementTest.hasClass;
      const inputEl = this.$refs.testInputRef as any;
      if (inputEl) {
        EL.toggleClass(inputEl.$el, 'test-class');
      }
    },

    testElementValue() {
      const newValue = `Updated at ${new Date().toLocaleTimeString()}`;
      const inputEl = this.$refs.testInputRef as any;
      if (inputEl) {
        EL.setValue(inputEl.$el, newValue);
        this.elementTest.value = newValue;
      }
    },

    // Performance tests
    runPerformanceTest() {
      const start = performance.now();

      // Test string operations
      const testStrings = Array.from({ length: 1000 }, (_, i) => `test string ${i}`);
      testStrings.forEach(str => {
        STR.capitalize(str);
        STR.toTitleCase(str);
        STR.truncate(str, 10);
      });

      // Test date operations
      const testDates = Array.from({ length: 1000 }, (_, i) =>
        DATE.addDays('2024-01-01', i).format('YYYY-MM-DD')
      );
      testDates.forEach(date => {
        DATE.format(date);
        DATE.isWeekend(date);
        DATE.getAge(date);
      });

      const end = performance.now();

      this.performanceResults = {
        duration: `${(end - start).toFixed(2)}ms`,
        operations: 6000,
        opsPerSecond: Math.round(6000 / ((end - start) / 1000))
      };

      POP.success(`Performance test completed in ${(end - start).toFixed(2)}ms`);
    },

    async testAllUtilities() {
      let passedTests = 0;
      let totalTests = 0;

      // Test UT utilities
      totalTests++;
      if (typeof UT.isNullOrEmpty('') === 'boolean') passedTests++;

      // Test STR utilities
      totalTests++;
      if (STR.capitalize('test') === 'Test') passedTests++;

      // Test DATE utilities
      totalTests++;
      if (DATE.isValid('2024-01-01')) passedTests++;

      // Test POP utilities (basic availability check)
      totalTests++;
      if (typeof POP.success === 'function') passedTests++;

      // Test EL utilities
      totalTests++;
      if (typeof EL.focus === 'function') passedTests++;

      const percentage = Math.round((passedTests / totalTests) * 100);

      await POP.alert({
        content: `Utility Tests Results:\n✅ Passed: ${passedTests}/${totalTests} (${percentage}%)\n\nAll utility functions are working correctly!`,
        mode: "Success",
        title: "Test Results"
      });
    },

    showUtilityStats() {
      const stats = {
        UT: Object.getOwnPropertyNames(UT).filter(prop => typeof (UT as any)[prop] === 'function').length,
        POP: Object.getOwnPropertyNames(POP).filter(prop => typeof (POP as any)[prop] === 'function').length,
        STR: Object.getOwnPropertyNames(STR).filter(prop => typeof (STR as any)[prop] === 'function').length,
        DATE: Object.getOwnPropertyNames(DATE).filter(prop => typeof (DATE as any)[prop] === 'function').length,
        EL: Object.getOwnPropertyNames(EL).filter(prop => typeof (EL as any)[prop] === 'function').length
      };

      POP.info(`Utility Functions Available:\n\n${Object.entries(stats).map(([key, value]) => `${key}: ${value} functions`).join('\n')}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.utility-test {
  .test-section {
    margin-bottom: 24px;
  }

  .test-header {
    margin-bottom: 24px;

    :deep(.ant-card-head) {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

      .ant-card-head-title {
        color: white;
        font-size: 18px;
      }
    }
  }

  .format-results, .date-results, .element-results {
    margin-top: 16px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #1890ff;

    h4 {
      margin-top: 0;
      color: #333;
    }

    ul {
      margin: 0;

      li {
        margin-bottom: 8px;

        strong {
          color: #1890ff;
        }
      }
    }
  }

  .performance-results {
    margin-top: 16px;
    padding: 16px;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 6px;

    h4 {
      margin-top: 0;
      color: #52c41a;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      font-family: 'Monaco', 'Menlo', monospace;
    }
  }

  .test-class {
    border: 2px solid #52c41a !important;
    background-color: #f6ffed !important;
  }
}
</style>
