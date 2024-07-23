<script lang="ts" setup>
import { provide } from 'vue'

import { $0 } from './$0'

const instance = new $0()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="$0">

    </div>
</template>

<style lang="scss" scoped>
@import "./$0.scss"
</style>