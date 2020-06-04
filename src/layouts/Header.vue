<template>
    <header class="header">
      <header-component />
      <slot/>
    </header>
</template>

<script>
  import HeaderComponent from '../components/HeaderComponent';

  export default {
    components: {
      HeaderComponent
    }
  }
</script>

<style lang="scss">

  .header {
    min-height: 100vh;
    background: url('../assets/background.png') top right / 100vh no-repeat;
    display: flex;
  }

</style>


