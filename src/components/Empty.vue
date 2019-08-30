<template>
    <div :class="typeClass">
        <img v-if="type === 'feature'" class="empty-img" src="@assets/svg/empty_feature.svg" alt="暂无功能">
        <img v-else-if="type === 'menu'" class="empty-img" src="@assets/svg/empty_menu.svg" alt="没有菜单">
        <img v-else-if="type === 'list'" class="empty-img" src="@assets/svg/empty_list.svg" alt="没有菜单">
        <span class="empty-tip">{{tip}}</span>
    </div>
</template>

<script>
export default {
    name: 'Empty',
    props: {
        type: {
            type: String, // feature menu list
            default: 'feature',
        },
        tip: {
            type: String,
            default: '功能开发中...',
        },
    },
    computed: {
        typeClass() {
            const { type } = this.$props;
            return `v-empty empty-${type}`;
        },
    },
};
</script>

<style lang="less">
.v-empty {
    .flex-column-center();
    &.empty-feature {
        height: calc(100vh - @gap-lg * 2);
        width: 100%;
        .empty-img {
            max-width: 180px;
        }
        .empty-tip {
            .font-size-lg();
            .m-t(@gap-lg);
            color: @tip-color;
        }
    }
    &.empty-menu {
        height: 200px;
        width: 100%;
        .empty-img {
            max-width: 41%;
        }
        .empty-tip {
            .font-size-sm();
            .m-t(@gap-lg);
            color: @tip-color;
        }
    }
    &.empty-list {
        height: 240px;
        width: 100%;
        .empty-img {
            width: 100px;
        }
        .empty-tip {
            .font-size();
            .m-t(@gap-lg);
            color: @tip-color;
        }
    }
}
</style>
