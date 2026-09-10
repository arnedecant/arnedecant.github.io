<script setup lang="ts">

const { data: projects } = await useAsyncData(() => queryCollection('projects')
  .where('featured', '=', true)
  .order('order', 'ASC')
  .all())

</script>

<template>
  <main class="page">
    <ProjectSummary v-for="project in projects" :key="project.slug" :project="project" />
  </main>
</template>

<style scoped lang="scss">

</style>
