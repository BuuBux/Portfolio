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
    background: url('../assets/background.svg') top right / 100vh no-repeat;
    display: flex;
      @media (max-width: 991px) {
         background-size: 80vw;
      }
      @media (max-width: 575px) {
          background-size: 100vh
      }
  }

</style>


