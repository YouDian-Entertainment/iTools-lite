<template>
    <div class="v-vue-library v-markdown" v-html="content"></div>
</template>

<script>
import { loadMarkdownFile } from '@common/utils';
export default {
    name: 'VueLibrary', // Vue 常用类库推荐
    data() {
        return {
            content: loadMarkdownFile('vuelibrary'),
        };
    },
};
</script>

<style lang="less" scoped>

</style>
