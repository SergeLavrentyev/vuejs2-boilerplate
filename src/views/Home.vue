<template>
  <div class="wrapper">
    <h1>I'm at Home</h1>
    <phrase></phrase>
  </div>
</template>

<script>
export default {
  components: {
    Phrase: () => import(/* webpackChunkName: "Phrase"*/ "@/components/Phrase"),
  },
};
</script>
