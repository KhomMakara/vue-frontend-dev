<template>
  <a-table
    :columns="mutatedColumns"
    :data-source="tableData"
    :pagination="mutatedPagination"
    :show-sorter-tooltip="false"
    :custom-row="onClickRow"
    @change="handleTableChange"
    size="large"
    id="CustomTable"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>

    <template #bodyCell v-if="loading">
      <div class="loading_cell">
        <a-skeleton :paragraph="{ rows: 1, width: '80%' }" :title="false" active />
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
/*---------------------------------------------
 * program id   : CustomTable
 * desc	        : CustomTable
 * dev date     : 26-August-2024
 * made by      : Kong Chansopheaktra
 *--------------------------------------------*/
type pagination = {
    total: number;
    current: number;
    pageSize: number;
};

interface ColumnType {
    title: string;
    key?: string;
    field?: string;
    dataIndex: string;
    sorter?: (a: any, b: any) => number;
    children?: ColumnType[];
}

import { defineComponent, type PropType } from "vue";

export default defineComponent({
    name: "BTable",
    emits: ["onClickRow", "change", "onDoubleClickRow"],
    props: {
        columns: {
            type: Array as PropType<{ title: string; key: string }[]>,
            required: true
        },
        dataSource: {
            type: Array,
            required: true
        },
        pagination: {
            type: [Object, Boolean] as PropType<pagination | boolean>,
            default: false,
            required: false
        },
        sortable: {
            type: Boolean,
            default: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        skeletonLength: {
            type: Number,
            default: 10
        }
    },
    computed: {
        mutatedPagination() {
            if (typeof this.pagination === "boolean") {
                return false;
            } else {
                const totalCount = Number((this.pagination as any)?.total) || 0;
				const currentPageSize = Number((this.pagination as any)?.pageSize) || 10;
				const defaultSizes = [10,20, 30, 40, 50];
                // size options cannot more than total items count
				let filteredSizes = defaultSizes.filter((size) => size <= totalCount);
				if (filteredSizes.length === 0 && totalCount > 0) {
					filteredSizes = [totalCount];
				}
				// Ensure current pageSize is one of the allowed options to avoid UI adding it implicitly
				let normalizedPageSize = currentPageSize;
				if (filteredSizes.length > 0 && !filteredSizes.includes(currentPageSize)) {
					normalizedPageSize = filteredSizes[0];
				}
                return {
                    ...this.pagination,
                    pageSize: normalizedPageSize,
                    showQuickJumper: true,
                    showSizeChanger: filteredSizes.length > 0,
                    pageSizeOptions: filteredSizes.map((s) => String(s)),
                    disabled: this.loading,
                    locale: { items_per_page: "" },
                    showTotal: () => {
						return this.paginationHint;
					},
                };
            }
        },
        paginationHint(): string | null {
            if (typeof this.pagination !== "object" || !this.pagination) return null;
            const { current, pageSize, total } = this.pagination;
            if (!total) return null;
            const start = total === 0 ? 0 : (pageSize * (current - 1)) + 1;
            const end = Math.min(pageSize * current, total);
            return `Showing ${start} to ${end} of ${total} entries`;
        },
        mutatedColumns() {
            return this.columns.map((data: any) => {
                return this.processColumn(data);
            });
        },
        tableData() {
            return this.loading ? this.createSkeletonData() : this.createDataTable();
        }
    },
    methods: {
        processColumn(data: any): ColumnType {
            const column = {
                ...data,
                dataIndex: data.key || data.field
            } as ColumnType;

            // If column has children, process them recursively
            if (data.children && Array.isArray(data.children)) {
                column.children = data.children.map((child: any) => this.processColumn(child));
            } else {
                // Only add sorting to leaf columns (no children) and exclude "no" column
                const columnKey = data.key || data.field;
                if (this.sortable && columnKey && columnKey !== "no") {
                    column.sorter = (a: any, b: any) => this.sortWithinGroups(a, b, columnKey);
                }
            }

            return column;
        },
        createSkeletonData(): Array<any> {
            const emptyRow = Object.fromEntries(
                this.columns.map((col) => {
                    return [col.key, "empty"];
                })
            );
            return Array.from({ length: this.skeletonLength }, () => ({ ...emptyRow }));
        },
        sortTableCol(a: string | number, b: string | number, isDate?: boolean): number {
            if (isDate) {
                return 0;
            } else {
                if (typeof a === "string" || typeof b === "string") {
                    return a?.toString().localeCompare(b?.toString());
                } else {
                    return a - b;
                }
            }
        },
        sortWithinGroups(a: any, b: any, columnKey: string): number {
            // If either row is a group header, maintain original order
            if (a.isGroup === true || b.isGroup === true) {
                return 0;
            }

            // Both are data rows - check if they belong to the same group
            // by looking at their position in the data source
            const dataSource = this.tableData;
            const indexA = dataSource.findIndex(item => item === a);
            const indexB = dataSource.findIndex(item => item === b);

            // Find the group boundaries for both items
            const groupA = this.findGroupForIndex(dataSource, indexA);
            const groupB = this.findGroupForIndex(dataSource, indexB);

            // If they're in different groups, maintain original order
            if (groupA !== groupB) {
                return 0;
            }

            // Both are in the same group, sort them normally
            const valueA = a[columnKey];
            const valueB = b[columnKey];

            return this.sortTableCol(valueA, valueB);
        },
        findGroupForIndex(dataSource: any[], targetIndex: number): string | null {
            let currentGroup = null;

            for (let i = 0; i <= targetIndex; i++) {
                const item = dataSource[i];
                if (item?.isGroup === true) {
                    // Found a group header, update current group
                    currentGroup = item.no || `group-${i}`;
                }
            }

            return currentGroup;
        },
        onClickRow(record: any) {
            return {
                onClick: () => {
                    !this.loading && this.$emit("onClickRow", record);
                },
                onDblclick: () => {
                    !this.loading && this.$emit("onDoubleClickRow", record); // double click
                },
                style: { cursor: "pointer" } // Optional: show pointer cursor
            };
        },
        createDataTable() {
            return this.dataSource.map((item: any, index: number) => {
                if (item.no) {
                    return { ...item, key: index + 1 };
                }
                return {
                    ...item,
                    no: this.tableIndexing(index),
                    key: index + 1
                };
            });
        },
        tableIndexing(index: number): number {
            if (typeof this.pagination === "boolean") {
                return index + 1;
            } else {
                return this.pagination?.pageSize * (this.pagination.current - 1) + (index + 1);
            }
        },
        handleTableChange(pagination: { pageSize: number; current: number }, filters: unknown, sorter: unknown, extra: { action: string }) {
            if (extra.action === "sort") {
                return;
            }
            this.$emit("change", pagination);
        }
    }
});
</script>

<style lang="scss" scoped>
#CustomTable {
  .ant-table-cell {
    font-size: 13px;
  }
}
.loading_cell {
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
