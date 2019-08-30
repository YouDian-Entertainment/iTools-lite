<template>
    <div class="v-git v-markdown" v-html="content"></div>
</template>

<script>
import { loadMarkdownFile } from '@common/utils';
export default {
    name: 'Git', // Git 常用命令
    data() {
        return {
            content: loadMarkdownFile('git'),
        };
    },
};
</script>

<style lang="less" scoped>
.v-git {}
</style>
