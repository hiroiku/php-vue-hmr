<!-- script -->
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component<VueComponent>({
})
export default class VueComponent extends Vue {
}
</script>

<!-- template -->
<template>
    <ul>
        <li>
            <router-link :to="{ name: 'index' }">Index</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'config' }">Config</router-link>
        </li>
    </ul>
</template>

<!-- style -->
<style lang="scss" scoped>

</style>
