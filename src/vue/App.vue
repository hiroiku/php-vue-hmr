<!-- script -->
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Nav from '@/vue/components/Nav.vue';

@Component<VueComponent>({
    components: {
        Nav,
    },
})
export default class VueComponent extends Vue { }
</script>

<!-- template -->
<template>
    <div>
        <p>Hello, world</p>
        <Nav />
        <router-view></router-view>
    </div>
</template>

<!-- style -->
<style lang="scss">
body {
    color: red;
}

.example {
    display: grid;
    background: linear-gradient(to bottom, white, black);
    transition: all .5s;

    user-select: none;
}
</style>
