
<template>
  <div>
    <div class="col-3">
      <layout></layout>
    </div>
    <div class="col-9">
<!--      <router-view></router-view>-->
    </div>
  </div>
</template>

<script>
import Layout from "@/views/layout/Layout";
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Layout
  }
};
</script>
