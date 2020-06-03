<template>
  <div class="max-w-sm mx-auto">
    <div class="bg-white rounded shadow">
      <div class="flex">
        <slot name="header"></slot>
      </div>
      <div class="p-4">
        <div class="pb-4 text-sm">
          <slot name="title"></slot>
        </div>
        <div>
          <slot name="content"></slot>
        </div>
        <div class="pt-4">
          <slot name="navigation"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
h1 {
  @apply text-3xl;
}
h2 {
  @apply text-2xl;
}
h4 {
  @apply font-bold;
}
</style>
