<template>
  <div class="max-w-sm mx-auto">
    <div class="bg-white rounded shadow">
      <div class="flex">
        <slot name="header"></slot>
      </div>
      <div class="px-4 pt-4  text-sm border-b border-purple-100 pb-2">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="full"></slot>
      </div>
      <div class="pt-0 pb-4 px-4">
        <slot name="content"></slot>
      </div>
      <div>
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
p{
  @apply text-gray-700;
};
</style>
