<template>
    <Scrolly :passive-scroll="true">
        <ScrollyViewport>
            <slot></slot>
        </ScrollyViewport>
        <ScrollyBar axis="y"/>
    </Scrolly>
</template>

<script>
import { Scrolly, ScrollyViewport, ScrollyBar } from 'vue-scrolly';
export default {
    name: 'ScrollBar',
    components: {
        Scrolly,
        ScrollyViewport,
        ScrollyBar,
    },
    computed: {},
    methods: {},
};
</script>

<style lang="less" scoped>

</style>

