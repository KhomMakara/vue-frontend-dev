<template>
  <a-layout-sider class="layout-sider" width="250" :collapsed="collapsed">
    <div class="sider-header">
      <div key="full-logo" class="logo" v-if="!collapsed">Portal Dashboard</div>
      <!-- <div key="short-logo" class="logo" v-else>PD</div> -->
    </div>

    <a-menu
      v-model:selectedKeys="currentMenu.selectedMenu"
      :open-keys="currentMenu.menuOpen"
      theme="dark"
      mode="inline"
      @openChange="onOpenChange"
    >
      <template v-for="menu in menus" :key="menu.menuID">
        <a-menu-item
          v-if="menu.subMenu.length === 0"
          :key="`item-${menu.menuID}`"
          @click="handleRouterPush(menu)"
        >
          <span class="menu_icon" :class="menu.menuIconID"></span>
          <span>{{ menu.menuName }}</span>
        </a-menu-item>

        <a-sub-menu
          v-else
          :key="`submenu-${menu.menuID}`"
        >
          <template #title>
            <span class="menu_icon" :class="menu.menuIconID"></span>
            <span>{{ menu.menuName }}</span>
          </template>
          <a-menu-item
            v-for="submenu in menu.subMenu"
            :key="submenu.menuID"
            @click="handleRouterPush(submenu)"
          >
            {{ submenu.menuName }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

interface MenuItem {
  menuID: string;
  menuName: string;
  menuIconID: string;
  subMenu: MenuItem[];
  screenID?: string;
}

export default defineComponent({
  name: "LayoutSidebar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    
    return {
      route,
      router
    };
  },
  data() {
    return {
      collapsed: false,
      searchMenu: undefined,
      currentMenu: {
        menuOpen: [] as string[],
        selectedMenu: [] as string[]
      },
      menus: [
        {
          menuID: "dashboard",
          menuName: "Dashboard",
          menuIconID: "ico-dashboard",
          subMenu: [],
          screenID: "/"
        },
        {
          menuID: "user_management",
          menuName: "User Management",
          menuIconID: "ico-users",
          subMenu: [
            {
              menuID: "user_list",
              menuName: "User List",
              menuIconID: "",
              subMenu: [],
              screenID: "/users"
            },
            {
              menuID: "user_roles",
              menuName: "User Roles",
              menuIconID: "",
              subMenu: [],
              screenID: "/user-roles"
            }
          ]
        },
        {
          menuID: "batch_management",
          menuName: "Batch Management",
          menuIconID: "ico-batches",
          subMenu: [
            {
              menuID: "batch_list",
              menuName: "Batch List",
              menuIconID: "",
              subMenu: [],
              screenID: "/batch-list"
            },
            {
              menuID: "batch_executor",
              menuName: "Batch Executor",
              menuIconID: "",
              subMenu: [],
              screenID: "/batch-executor"
            }
          ]
        },
        {
          menuID: "reports",
          menuName: "Reports",
          menuIconID: "ico-reports",
          subMenu: [
            {
              menuID: "transaction_reports",
              menuName: "Transaction Reports",
              menuIconID: "",
              subMenu: [],
              screenID: "/transaction-reports"
            },
            {
              menuID: "user_activity",
              menuName: "User Activity",
              menuIconID: "",
              subMenu: [],
              screenID: "/user-activity"
            }
          ]
        },
        {
          menuID: "settings",
          menuName: "Settings",
          menuIconID: "ico-settings",
          subMenu: [],
          screenID: "/settings"
        },
        {
          menuID: "components",
          menuName: "B-Components",
          menuIconID: "ico-components",
          subMenu: [],
          screenID: "/components"
        },
        {
          menuID: "utilities",
          menuName: "Utilities Test",
          menuIconID: "ico-settings",
          subMenu: [],
          screenID: "/utilities"
        }
      ] as MenuItem[]
    };
  },
  mounted() {
    this.handleInitialRoute();
  },
  watch: {
    "route.path": function (path: string) {
      this.handleRouteChange(path);
    }
  },
  computed: {
    searchTreeData() {
      interface TreeNode {
        label: string;
        value: string;
        key: string;
      }

      const flattenMenu = (items: MenuItem[], parentLabel = ""): TreeNode[] => {
        let result: TreeNode[] = [];
        items.forEach(item => {
          const label = parentLabel ? `${parentLabel} > ${item.menuName}` : item.menuName;
          if (item.subMenu.length === 0 && item.screenID) {
            result.push({
              label: label,
              value: item.screenID,
              key: item.menuID
            });
          }
          if (item.subMenu.length > 0) {
            result = result.concat(flattenMenu(item.subMenu, label));
          }
        });
        return result;
      };
      return flattenMenu(this.menus);
    }
  },
  methods: {
    handleInitialRoute() {
      const currentPath = this.route.path;
      this.handleRouteChange(currentPath);
    },
    handleRouteChange(path: string) {
      const findMenuByPath = (items: MenuItem[]): { menu: MenuItem | null, parent: MenuItem | null } => {
        for (const item of items) {
          if (item.screenID === path) {
            return { menu: item, parent: null };
          }
          if (item.subMenu.length > 0) {
            for (const subItem of item.subMenu) {
              if (subItem.screenID === path) {
                return { menu: subItem, parent: item };
              }
            }
          }
        }
        return { menu: null, parent: null };
      };

      const { menu, parent } = findMenuByPath(this.menus);
      if (menu) {
        this.currentMenu.selectedMenu = [menu.menuID];
        if (parent) {
          this.currentMenu.menuOpen = [parent.menuID];
        }
      }
    },
    handleRouterPush(menu: MenuItem) {
      if (menu.screenID) {
        this.router.push(menu.screenID);
      }
    },
    onSearchMenu(value: string) {
      if (value) {
        this.router.push(value);
      }
    },
    onOpenChange(openKeys: string[]) {
      this.currentMenu.menuOpen = openKeys;
    }
  }
});
</script>

<style lang="scss" scoped>
.sider-header {
  padding: 16px;
}
.layout-sider {
  position: sticky;
  top: 0;
  // align-self: flex-start;
  max-height: 100vh;
  overflow-y: auto;
  // overflow-x: hidden;
  line-height: 100vh;
}

.logo {
  height: 60px;
  // background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.menu_icon {
  margin-right: 8px;

  &.ico-dashboard::before {
    content: '📊';
  }

  &.ico-users::before {
    content: '👥';
  }

  &.ico-settings::before {
    content: '⚙️';
  }

  &.ico-reports::before {
    content: '📈';
  }

  &.ico-batches::before {
    content: '📦';
  }

  &.ico-components::before {
    content: '🧩';
  }
}
</style>