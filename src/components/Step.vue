<template>
  <div class="max-w-sm mx-auto bg-white">
    <div class="flex">
      <slot name="header"></slot>
    </div>
    <div class="p-4">
      <div class="py-4 text-2xl">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
      <div>
        <slot name="navigation"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
h1 {
  @apply font-bold;
}
</style>