<template>
  <!-- NAME: BatchList.vue, BATCH MANAGEMENT -->
  <div class="batch-list">
    <!-- Search Form -->
    <b-card>
      <b-form ref="formRef" :model="form" layout="vertical">
        <b-row :gutter="16">
          <b-col :span="6">
            <b-form-item label="Job ID" name="jobID">
              <template #field>
                <b-input
                  v-model:value="form.jobID"
                  placeholder="Enter Job ID"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="6">
            <b-form-item label="Job Name" name="jobName">
              <template #field>
                <b-input
                  v-model:value="form.jobName"
                  placeholder="Enter Job Name"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="6">
            <b-form-item label="Execute Date" name="executeDate">
              <template #field>
                <b-date-picker
                  v-model:value="form.executeDate"
                  placeholder="Select Date"
                />
              </template>
            </b-form-item>
          </b-col>
          <b-col :span="6">
            <b-form-item label="Status" name="status">
              <template #field>
                <b-select
                  v-model:value="form.status"
                  placeholder="Select Status"
                  :allow-clear="true"
                >
                  <b-select-option value="">All Status</b-select-option>
                  <b-select-option value="PENDING">Pending</b-select-option>
                  <b-select-option value="RUNNING">Running</b-select-option>
                  <b-select-option value="COMPLETED">Completed</b-select-option>
                  <b-select-option value="FAILED">Failed</b-select-option>
                </b-select>
              </template>
            </b-form-item>
          </b-col>
        </b-row>
        <b-row :gutter="16">
          <b-col :span="24">
            <b-flex gap="12" justify="end">
              <b-button @click="onClickSearch" mode="search" :loading="loading">
                Search
              </b-button>
              <b-button @click="onReset" mode="clear">
                Clear
              </b-button>
            </b-flex>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <div style="margin: 16px 0"></div>

        <!-- Results Table -->
    <b-card>
      <template #extra>
        <b-space>
          <b-button
            @click="onClickExportExcel"
            mode="excel"
            :disabled="!dataTable.length"
          >
            Export Excel
          </b-button>
          <b-button
            @click="onClickExecute"
            mode="save"
            :disabled="selectedRows.length === 0"
          >
            <template #icon><PlayCircleOutlined /></template>
            Execute Selected
          </b-button>
        </b-space>
      </template>

      <b-table
        :columns="columns"
        :data-source="dataTable"
        :pagination="paginationConfig"
        :loading="loading"
        :row-selection="rowSelection"
        :scroll="{ x: 800 }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'no'">
            {{ tableIndexing(index) }}
          </template>
          <template v-else-if="column.key === 'executeStatus'">
            <a-tag
              :color="getStatusColor(record.executeStatus)"
            >
              {{ record.executeStatus }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <b-space>
              <a-button
                type="link"
                size="small"
                @click="viewDetails(record)"
              >
                <template #icon><EyeOutlined /></template>
                View
              </a-button>
              <a-button
                type="link"
                size="small"
                @click="executeSingle(record)"
                :disabled="record.executeStatus === 'RUNNING'"
              >
                <template #icon><PlayCircleOutlined /></template>
                Execute
              </a-button>
            </b-space>
          </template>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  PlayCircleOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';

interface BatchJob {
  key: string;
  jobID: string;
  jobName: string;
  executeDate: string;
  executeTime: string;
  executeOrder: number;
  executeStatus: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  description: string;
  lastRunBy: string;
}

export default defineComponent({
  name: "BatchList",
  components: {
    PlayCircleOutlined,
    EyeOutlined
  },
  data() {
    return {
      form: {
        jobID: '',
        jobName: '',
        executeDate: null as string | null,
        status: ''
      },
      dataTable: [] as BatchJob[],
      loading: false,
      selectedRows: [] as BatchJob[],
      table: {
        totalItems: 0,
        pageNumber: 1,
        pageSize: 10
      },
      // Static mock data
      mockData: [
        {
          key: '1',
          jobID: 'BATCH_001',
          jobName: 'Daily Transaction Processing',
          executeDate: '2024-01-15',
          executeTime: '02:00:00',
          executeOrder: 1,
          executeStatus: 'COMPLETED',
          description: 'Process daily transactions and generate reports',
          lastRunBy: 'system'
        },
        {
          key: '2',
          jobID: 'BATCH_002',
          jobName: 'User Data Synchronization',
          executeDate: '2024-01-15',
          executeTime: '03:00:00',
          executeOrder: 2,
          executeStatus: 'RUNNING',
          description: 'Sync user data across systems',
          lastRunBy: 'admin'
        },
        {
          key: '3',
          jobID: 'BATCH_003',
          jobName: 'Backup Database',
          executeDate: '2024-01-15',
          executeTime: '01:00:00',
          executeOrder: 0,
          executeStatus: 'PENDING',
          description: 'Create backup of main database',
          lastRunBy: 'system'
        },
        {
          key: '4',
          jobID: 'BATCH_004',
          jobName: 'Generate Monthly Reports',
          executeDate: '2024-01-14',
          executeTime: '23:30:00',
          executeOrder: 3,
          executeStatus: 'FAILED',
          description: 'Generate monthly summary reports',
          lastRunBy: 'admin'
        },
        {
          key: '5',
          jobID: 'BATCH_005',
          jobName: 'Clean Temporary Files',
          executeDate: '2024-01-15',
          executeTime: '04:00:00',
          executeOrder: 4,
          executeStatus: 'COMPLETED',
          description: 'Clean up temporary files and logs',
          lastRunBy: 'system'
        }
      ] as BatchJob[]
    };
  },
  mounted() {
    this.loadBatchList();
  },
  computed: {
    columns(): TableColumnsType<BatchJob> {
      return [
        {
          title: 'No.',
          key: 'no',
          width: 60,
          align: 'center'
        },
        {
          title: 'Job ID',
          dataIndex: 'jobID',
          key: 'jobID',
          width: 120,
          sorter: true
        },
        {
          title: 'Job Name',
          dataIndex: 'jobName',
          key: 'jobName',
          width: 200
        },
        {
          title: 'Execute Date',
          dataIndex: 'executeDate',
          key: 'executeDate',
          width: 120,
          sorter: true
        },
        {
          title: 'Execute Time',
          dataIndex: 'executeTime',
          key: 'executeTime',
          width: 120
        },
        {
          title: 'Order',
          dataIndex: 'executeOrder',
          key: 'executeOrder',
          width: 80,
          align: 'center',
          sorter: true
        },
        {
          title: 'Status',
          dataIndex: 'executeStatus',
          key: 'executeStatus',
          width: 120,
          align: 'center'
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          width: 250,
          ellipsis: true
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 150,
          align: 'center',
          fixed: 'right'
        }
      ];
    },
    paginationConfig() {
      return {
        total: this.table.totalItems,
        current: this.table.pageNumber,
        pageSize: this.table.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number, range: number[]) =>
          `${range[0]}-${range[1]} of ${total} items`
      };
    },
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRows.map(row => row.key),
        onChange: (selectedRowKeys: string[], selectedRows: BatchJob[]) => {
          this.selectedRows = selectedRows;
        }
      };
    }
  },
  methods: {
    loadBatchList() {
      this.loading = true;

      // Simulate API call with mock data
      setTimeout(() => {
        let filteredData = [...this.mockData];

        // Apply filters
        if (this.form.jobID) {
          filteredData = filteredData.filter(item =>
            item.jobID.toLowerCase().includes(this.form.jobID.toLowerCase())
          );
        }
        if (this.form.jobName) {
          filteredData = filteredData.filter(item =>
            item.jobName.toLowerCase().includes(this.form.jobName.toLowerCase())
          );
        }
        if (this.form.status) {
          filteredData = filteredData.filter(item =>
            item.executeStatus === this.form.status
          );
        }

        this.table.totalItems = filteredData.length;

        // Apply pagination
        const startIndex = (this.table.pageNumber - 1) * this.table.pageSize;
        const endIndex = startIndex + this.table.pageSize;
        this.dataTable = filteredData.slice(startIndex, endIndex);

        this.loading = false;
      }, 500);
    },
    onClickSearch() {
      this.clearBeforeInquiry();
      this.loadBatchList();
    },
    onReset() {
      this.form = {
        jobID: '',
        jobName: '',
        executeDate: null,
        status: ''
      };
      this.clearBeforeInquiry();
      this.loadBatchList();
    },
    clearBeforeInquiry() {
      this.table = {
        totalItems: 0,
        pageNumber: 1,
        pageSize: this.table.pageSize
      };
      this.selectedRows = [];
    },
    handleTableChange(pag: { current: number; pageSize: number }) {
      this.table.pageNumber = pag.current;
      this.table.pageSize = pag.pageSize;
      this.loadBatchList();
    },
    tableIndexing(index: number): number {
      const { pageSize, pageNumber } = this.table;
      return pageSize * (pageNumber - 1) + (index + 1);
    },
    getStatusColor(status: string): string {
      const colorMap: Record<string, string> = {
        'COMPLETED': 'green',
        'RUNNING': 'blue',
        'PENDING': 'orange',
        'FAILED': 'red'
      };
      return colorMap[status] || 'default';
    },
    onClickExportExcel() {
      // Simulate Excel export
      console.log('Exporting to Excel...', this.dataTable);
      this.$message.success('Excel file exported successfully!');
    },
    onClickExecute() {
      console.log('Executing selected jobs...', this.selectedRows);
      this.$message.success(`${this.selectedRows.length} jobs queued for execution!`);
      this.selectedRows = [];
    },
    viewDetails(record: BatchJob) {
      console.log('Viewing details for:', record);
      this.$message.info(`Viewing details for ${record.jobName}`);
    },
    executeSingle(record: BatchJob) {
      console.log('Executing single job:', record);
      this.$message.success(`${record.jobName} queued for execution!`);
    }
  }
});
</script>

<style lang="scss" scoped>
.batch-list {
  .ant-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
