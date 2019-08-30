<template>
    <div class="v-minesweeper">
        <iframe class="content" src="http://muan.co/emoji-minesweeper/" frameborder="0"></iframe>
        <div class="from-link">https://github.com/muan/emoji-minesweeper/</div>
    </div>
</template>

<script>
export default {
    name: 'Minesweeper',
};
</script>

<style lang="less">
.v-minesweeper {
    .content {
        height: calc(100vh - 100px);
        width: 100%;
    }
    .from-link {
        height: 100px;
        width: 100%;
        .flex-row-center();
    }
}
</style>

