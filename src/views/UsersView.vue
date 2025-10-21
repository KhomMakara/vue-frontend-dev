<template>
    <!-- Search Form -->
    <b-card>
        <b-form :model="form" ref="formRef" layout="vertical">
            <b-row :gutter="16">
                <b-col :span="6">
                    <b-form-item label="Employee No" name="employeeNo">
                        <template #field>
                            <b-input 
                                v-model:value="form.employeeNo" 
                                placeholder="Enter Employee No"
                                name="employeeNo"
                                ref="employeeNoInput"
                            />
                        </template>
                    </b-form-item>
                </b-col>
                <b-col :span="6">
                    <b-form-item label="Employee Name" name="employeeName">
                        <template #field>
                            <b-input 
                                v-model:value="form.employeeName"
                                placeholder="Enter Employee Name"
                                name="employeeName"
                                ref="employeeNameInput"
                            />
                        </template>
                    </b-form-item>
                </b-col>
                <b-col :span="6">
                    <b-form-item label="Email" name="email">
                        <template #field>
                            <b-input 
                                v-model:value="form.email"
                                placeholder="Enter Email"
                                name="email"
                                ref="emailInput"
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
                                name="status"
                                ref="statusInput"
                            >
                                <b-select-option value="">All Status</b-select-option>
                                <b-select-option value="ACTIVE">Active</b-select-option>
                                <b-select-option value="INACTIVE">Inactive</b-select-option>
                                <b-select-option value="SUSPENDED">Suspended</b-select-option>
                            </b-select>
                        </template>
                    </b-form-item>
                </b-col>
            </b-row>
            <b-row :gutter="16">
                <b-col :span="24">
                    <b-flex gap="12" justify="end">
                        <b-button @click="onClickSearch" mode="search" :loading="loading">Search</b-button>
                        <b-button @click="onReset" mode="clear">Clear</b-button>
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
                    @click="onClickExport"
                    mode="excel"
                    :disabled="!dataTable.length"
                >
                    Export Excel
                </b-button>
                <b-button
                    @click="showAddModal"
                    mode="register"
                >
                    Add User
                </b-button>
            </b-space>
        </template>
        <b-table
            :columns="columns"
            :data-source="dataTable"
            :pagination="paginationConfig"
            :loading="loading"
            :scroll="{ x: 1500 }"
            @change="handleTableChange"
        />
    </b-card>

    <!-- Add/Edit User Modal -->
    <a-modal
        v-model:open="modalVisible"
        :title="isEditMode ? 'Edit User' : 'Add New User'"
        @ok="handleModalOk"
        @cancel="handleModalCancel"
        :confirm-loading="modalLoading"
    >
        <b-form
            ref="modalFormRef"
            :model="modalForm"
            layout="vertical"
            :rules="modalFormRules"
        >
            <b-form-item label="Employee No" name="employeeNo">
                <template #field>
                    <b-input 
                        v-model:value="modalForm.employeeNo" 
                        name="modalEmployeeNo"
                        ref="modalEmployeeNoInput"
                    />
                </template>
            </b-form-item>
            <b-form-item label="Employee Name" name="employeeName">
                <template #field>
                    <b-input 
                        v-model:value="modalForm.employeeName"
                        name="modalEmployeeName"
                        ref="modalEmployeeNameInput"
                    />
                </template>
            </b-form-item>
            <b-form-item label="Email Address" name="email">
                <template #field>
                    <b-input 
                        v-model:value="modalForm.email" 
                        type="email"
                        name="modalEmail"
                        ref="modalEmailInput"
                    />
                </template>
            </b-form-item>
            <b-form-item label="Branch Code" name="branchCode">
                <template #field>
                    <b-input 
                        v-model:value="modalForm.branchCode" 
                        name="modalBranchCode"
                        ref="modalBranchCodeInput"
                    />
                </template>
            </b-form-item>
            <b-form-item label="Branch Name" name="branchName">
                <template #field>
                    <b-input 
                        v-model:value="modalForm.branchName" 
                        name="modalBranchName"
                        ref="modalBranchNameInput"
                    />
                </template>
            </b-form-item>
            <b-form-item label="Status" name="status">
                <template #field>
                    <b-select
                        v-model:value="modalForm.status"
                        :options="[
                            { label: 'Active', value: 'ACTIVE' },
                            { label: 'Inactive', value: 'INACTIVE' },
                            { label: 'Suspended', value: 'SUSPENDED' }
                        ]"
                        name="modalStatus"
                        ref="modalStatusInput"
                    />
                </template>
            </b-form-item>
        </b-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import type { TableColumnsType } from 'ant-design-vue';
import { UT } from "@/utils";

interface User {
    key: string;
    employeeNo: string;
    employeeName: string;
    email: string;
    branchCode: string;
    branchName: string;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    lastLogin: string;
}

export default defineComponent({
    name: "UsersView",
    data() {
        return {
            form: {
                employeeNo: '',
                employeeName: '',
                email: '',
                status: ''
            },
            dataTable: [] as User[],
            loading: false,
            modalVisible: false,
            modalLoading: false,
            isEditMode: false,
            modalForm: {
                employeeNo: '',
                employeeName: '',
                email: '',
                branchCode: '',
                branchName: '',
                status: 'ACTIVE' as const
            },
            modalFormRules: {
                employeeNo: [{ required: true, message: 'Please enter employee number' }],
                employeeName: [{ required: true, message: 'Please enter employee name' }],
                email: [
                    { required: true, message: 'Please enter email address' },
                    { type: 'email', message: 'Please enter valid email address' }
                ],
                branchCode: [{ required: true, message: 'Please enter branch code' }],
                branchName: [{ required: true, message: 'Please enter branch name' }],
                status: [{ required: true, message: 'Please select status' }]
            },
            table: {
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10
            },
            mockData: [
                {
                    key: '1',
                    employeeNo: 'EMP001',
                    employeeName: 'John Doe',
                    email: 'john.doe@company.com',
                    branchCode: 'BR001',
                    branchName: 'Main Branch',
                    status: 'ACTIVE',
                    lastLogin: '2024-01-15T14:30:00Z'
                },
                {
                    key: '2',
                    employeeNo: 'EMP002',
                    employeeName: 'Jane Smith',
                    email: 'jane.smith@company.com',
                    branchCode: 'BR002',
                    branchName: 'Central Branch',
                    status: 'ACTIVE',
                    lastLogin: '2024-01-15T13:45:00Z'
                },
                {
                    key: '3',
                    employeeNo: 'EMP003',
                    employeeName: 'Bob Johnson',
                    email: 'bob.johnson@company.com',
                    branchCode: 'BR001',
                    branchName: 'Main Branch',
                    status: 'INACTIVE',
                    lastLogin: '2024-01-10T09:15:00Z'
                },
                {
                    key: '4',
                    employeeNo: 'EMP004',
                    employeeName: 'Alice Brown',
                    email: 'alice.brown@company.com',
                    branchCode: 'BR003',
                    branchName: 'North Branch',
                    status: 'ACTIVE',
                    lastLogin: '2024-01-15T16:20:00Z'
                },
                {
                    key: '5',
                    employeeNo: 'EMP005',
                    employeeName: 'Charlie Wilson',
                    email: 'charlie.wilson@company.com',
                    branchCode: 'BR002',
                    branchName: 'Central Branch',
                    status: 'SUSPENDED',
                    lastLogin: '2024-01-12T11:30:00Z'
                }
            ] as User[]
        };
    },
    mounted() {
        this.loadUserList();
        // Call UT.arraySetEnable to set M for form inputs
        UT.arraySetEnable(this, { 
            fields: [
                'employeeNoInput', 
                'employeeNameInput', 
                'emailInput', 
                'statusInput'
            ], 
            enable: true, 
            inputType: 'M'
        });
        // For modal inputs as well, if needed on mount
    },
    computed: {
        columns(): TableColumnsType<User> {
            return [
                { title: 'No.', key: 'no', width: 60, align: 'center' },
                { title: 'Employee No', dataIndex: 'employeeNo', key: 'employeeNo', width: 120, sorter: true },
                { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', width: 150 },
                { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
                { title: 'Branch Code', dataIndex: 'branchCode', key: 'branchCode', width: 100 },
                { title: 'Branch Name', dataIndex: 'branchName', key: 'branchName', width: 150 },
                { title: 'Status', dataIndex: 'status', key: 'status', width: 100, align: 'center' },
                { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin', width: 150 }
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
        }
    },
    methods: {

		setDefault(){
			UT.arraySetEnable(this, { 
                fields: [
                    'employeeNoInput', 
                    'employeeNameInput', 
                    'emailInput', 
                    'statusInput'
                ], 
                enable: false, 
                inputType: 'M' 
            })
		},

        onClickExport(){
            const validate = UT.validate(this, 'formRef');
            alert(validate)
        },
        loadUserList() {
            this.loading = true;
            setTimeout(() => {
                let filteredData = [...this.mockData];
                if (this.form.employeeNo) {
                    filteredData = filteredData.filter(item =>
                        item.employeeNo.toLowerCase().includes(this.form.employeeNo.toLowerCase())
                    );
                }
                if (this.form.employeeName) {
                    filteredData = filteredData.filter(item =>
                        item.employeeName.toLowerCase().includes(this.form.employeeName.toLowerCase())
                    );
                }
                if (this.form.email) {
                    filteredData = filteredData.filter(item =>
                        item.email.toLowerCase().includes(this.form.email.toLowerCase())
                    );
                }
                if (this.form.status) {
                    filteredData = filteredData.filter(item =>
                        item.status === this.form.status
                    );
                }
                this.table.totalItems = filteredData.length;
                const startIndex = (this.table.pageNumber - 1) * this.table.pageSize;
                const endIndex = startIndex + this.table.pageSize;
                this.dataTable = filteredData.slice(startIndex, endIndex);
                this.loading = false;
            }, 500);
        },
        onClickSearch() {
            this.clearBeforeInquiry();
            this.loadUserList();
        },
        onReset() {
            this.form = {
                employeeNo: '',
                employeeName: '',
                email: '',
                status: ''
            };
            this.clearBeforeInquiry();
            this.loadUserList();
            // Enable Search form inputs with Mode M after reset
            UT.arraySetEnable(this, { 
                fields: [
                    'employeeNoInput', 
                    'employeeNameInput', 
                    'emailInput', 
                    'statusInput'
                ], 
                enable: true, 
                inputType: 'M' 
            });
        },
        clearBeforeInquiry() {
            this.table = {
                totalItems: 0,
                pageNumber: 1,
                pageSize: this.table.pageSize
            };
        },
        handleTableChange(pag: { current: number; pageSize: number }) {
            this.table.pageNumber = pag.current;
            this.table.pageSize = pag.pageSize;
            this.loadUserList();
        },
        onClickExportExcel() {
            //
        },
        showAddModal() {
            this.isEditMode = false;
            this.resetModalForm();
            this.modalVisible = true;
            // Enable Modal inputs as Mode M when modal is shown
            UT.arraySetEnable(this, { 
                fields: [
                    'modalEmployeeNoInput',
                    'modalEmployeeNameInput',
                    'modalEmailInput',
                    'modalBranchCodeInput',
                    'modalBranchNameInput',
                    'modalStatusInput'
                ],
                enable: true,
                inputType: 'M'
            });
        },
        resetModalForm() {
            this.modalForm = {
                employeeNo: '',
                employeeName: '',
                email: '',
                branchCode: '',
                branchName: '',
                status: 'ACTIVE'
            };
        },
        handleModalOk() {
            (this.$refs.modalFormRef as { validate: () => Promise<void> }).validate()
                .then(() => {
                    this.modalLoading = true;
                    setTimeout(() => {
                        this.modalVisible = false;
                        this.modalLoading = false;
                        this.resetModalForm();
                        this.loadUserList();
                    }, 1000);
                })
                .catch(() => {});
        },
        handleModalCancel() {
            this.resetModalForm();
            this.modalVisible = false;
        }
    }
});
</script>

<style lang="scss" scoped>
.users-view {
    .ant-card {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
}
</style>
