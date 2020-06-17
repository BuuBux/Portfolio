<template>
    <a v-if="external" v-bind="$attrs" class="read-more" >
        <span class="read-more__decorator read-more__sides" />
            {{ buttonText }}
        <span class="read-more__decorator read-more__vertices" />
    </a>
    <g-link :to="to" v-else class="read-more">
        <span class="read-more__decorator read-more__sides" />
            {{ buttonText }}
        <span class="read-more__decorator read-more__vertices" />
    </g-link>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            to: {
                required: false
            },
            external: {
                type: Boolean,
                required: true
            },
            buttonText: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .read-more {
    display: block;
    max-width: 225px;
    width: 100%;
    text-align: center;
    padding: 18px 0;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    text-decoration: none;
    font: 400 18px/1 'Poppins', sans-serif;
    color: $main-color;
    position: relative;
    transition: color 0.35s ease-in-out, transform 0.15s ease-in-out;
    .read-more__decorator {
        position: absolute;
        bottom: 0;
        &.read-more__sides {
            height: 0;
            left: 0;
            width: 100%;
            border-left: 2px solid transparent;
            border-right: 2px solid transparent;
            transition: height 0.35s ease-in-out, border 0.35s ease-in-out;
        }
        &.read-more__vertices {
            height: 100%;
            width: 0;
            left: 50%;
            transform: translate3D(-50%, 0, 0);
            border-top: 2px solid transparent;
            border-bottom: 2px solid transparent;
            transition: width 0.35s ease-in-out, border 0.35s ease-in-out;
        }
    }
    &:hover {
      color: $secondary-color;
      transform: scale(.9);
      .read-more__sides {
        height: 100%;
        border-left: 2px solid $secondary-color;
        border-right: 2px solid $secondary-color;
      }
      .read-more__vertices {
        width: 99%;
        border-top: 2px solid $secondary-color;
        border-bottom: 2px solid $secondary-color;
      }
    }
  }
</style>
