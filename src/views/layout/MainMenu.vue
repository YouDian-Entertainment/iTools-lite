<template>
    <div class="v-main-menu-container">
        <!-- <div class="search-item">
            <Input v-model="searchValue" suffix="ios-search" placeholder="搜索菜单" />
        </div> -->
        <Logo />
        <ScrollBar class="main-scroll">
            <template v-if="searchValue">
                <Menu v-if="MenuData[0].menuList.length > 0" class="v-main-menu" theme="light">
                    <MenuGroup v-for="(item, index) in MenuData" :title="item.groupName" :key="`group_${index}`">
                        <MenuItem v-for="(menu, i) in item.menuList" :name="menu.router" :key="`menu_item_${i}`" :to="menu.router">
                            <Icon :type="menu.icon" />
                            {{menu.name}}
                        </MenuItem>
                    </MenuGroup>
                </Menu>
                <Empty v-else type="menu" tip="未找到菜单" />
            </template>
            <Menu v-else class="v-main-menu" theme="light" :active-name="activeName">
                <MenuGroup v-for="(item, index) in MenuData" :title="item.groupName" :key="`group_${index}`">
                    <MenuItem v-for="(menu, i) in item.menuList" :name="menu.router" :key="`menu_item_${i}`" :to="menu.router">
                        <Icon :type="menu.icon" />
                        {{menu.name}}
                    </MenuItem>
                </MenuGroup>
            </Menu>
        </ScrollBar>
    </div>
</template>

<script>
import { Menu, MenuGroup, MenuItem, Icon, Input } from 'iview';
import { ScrollBar, Empty } from '@components';
import MenuData, { menuArray } from '@router/menu';
import { dealMenuBySearchValue } from '@common/utils';
import Logo from '@views/Logo';
export default {
    name: 'MainMenu',
    components: {
        Menu,
        MenuItem,
        MenuGroup,
        Icon,
        Input,
        ScrollBar,
        Empty,
        Logo,
    },
    computed: {
        activeName() {
            const { name } = this.$route;
            const val = menuArray.filter(item => item.name === name);
            return val.length > 0 ? val[0].router : '';
        },
    },
    watch: {
        searchValue() {
            this.MenuData = dealMenuBySearchValue(MenuData, this.searchValue);
        },
    },
    data() {
        return {
            MenuData,
            searchValue: '',
        };
    },
};
</script>

<style lang="less">
.v-main-menu-container {
    height: 100vh;
    -webkit-app-region: drag;
    .search-item {
        width: 100%;
        height: 80px;
        .p-h(@gap-md);
        .p-b(@gap-md);
        .p-t(35px);
        &:after {
            content: '';
            display: block;
            width: 1px;
            height: 100%;
            background: #dcdee2;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
        }
    }
    .main-scroll {
        height: calc(100vh - 115px);
    }
    .v-main-menu {
        width: 100% !important;
    }
}
</style>
