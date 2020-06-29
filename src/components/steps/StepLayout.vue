<template>
  <div class="max-w-sm mx-auto">
    <div class="bg-white rounded shadow">
      <div class="flex">
        <slot name="header"></slot>
      </div>
      <div class="px-4 pt-4 pb-4 text-sm">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="full"></slot>
      </div>
      <div class="p-4">
        <slot name="content"></slot>
      </div>
      <div class="p-4">
        <slot name="navigation"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
h1 {
  @apply text-2xl;
}
h2 {
  @apply text-xl leading-none pb-2;
}
h4 {
  @apply font-bold;
}
a{
  @apply underline;
}
</style>
