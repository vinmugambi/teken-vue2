<template>
    <label :for="inputId">{{label}} </label>
</template>

<script>
export default {
    props:{
        inputId: {type: String, required:true},
        label: {type:String, required: true}
    }
}
</script>

<style lang="postcss" scoped>
label {
    @apply block text-gray-800 text-sm font-bold mb-1 tracking-tight text-base font-semibold;
}
</style>