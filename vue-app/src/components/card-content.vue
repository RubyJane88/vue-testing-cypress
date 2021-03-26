<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardContent',
  props: {
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
  },
});
</script>

<template>
  <div class="card-content">
    <div class="content">
      <div data-testid="card-name" class="name">{{ name }}</div>
      <div data-testid="card-description" class="description">{{ description }}</div>
    </div>
  </div>
</template>
