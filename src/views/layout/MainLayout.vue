<template>
    <div class="v-main-layout">
        <!-- <Layout>
            <div class="v-main-header">header</div>
            <Content class="v-main-content">
            </Content>
        </Layout> -->
        <Layout>
            <Sider class="left-silder">
                <MainMenu />
            </Sider>
        </Layout>
        <Layout :style="{marginLeft: '200px'}">
            <Content class="right-content">
                <ScrollBar class="main-content-scrollbar">
                    <slot></slot>
                </ScrollBar>
            </Content>
        </Layout>
    </div>
</template>

<script>
import { Sider, Layout, Content, Header } from 'iview';
import { ScrollBar } from '@components';
import MainMenu from './MainMenu';
export default {
    name: 'MainLayout',
    components: {
        Sider,
        MainMenu,
        Header,
        Layout,
        Content,
        ScrollBar,
    },
};
</script>

<style lang="less">
@header-height: 40px;
@content-height: 100vh;
.v-main-layout {
    .v-main-header {
        height: @header-height;
        .border-line(@border-color, 0, 0);
    }
    .v-main-content {
        height: @content-height;
    }
    .left-silder {
        height: @content-height;
        position: fixed;
        left: 0;
        background-color: @white;
        user-select: none;
        .ivu-menu-item-group-title {
            -webkit-app-region: drag;
        }
    }
    .right-content {
        overflow: hidden;
        height: @content-height;
        .main-content-scrollbar {
            height: @content-height;
            .scrolly-viewport {
                .p(@gap-lg);
            }
        }
    }
}
</style>
