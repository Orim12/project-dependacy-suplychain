<script lang="ts">
    export let disable = false;
</script>

<style lang="scss">
    @import './container.scss';
</style>

<div class="container" class:disabled={disable}>
    <div class="cover">
        <slot></slot>
    </div>
</div>