<template>
    <div class="v-file-item">
        <Icon type="ios-document-outline" />
    </div>
</template>

<script>
export default {
    name: 'FileItem',
    props: {
        fileItem: {
            type: Object,
            default() {
                return {
                    filePath: '',
                    fileType: '',
                };
            },
        },
    },
    computed: {
        fileIcon() {

        },
    },
}
</script>

<style lang="less">
.v-file-item {

}
</style>
