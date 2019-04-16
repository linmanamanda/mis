<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style>
  *{margin: 0;padding: 0;list-style: none;}
</style>

