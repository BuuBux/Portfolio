<template>
    <h3 class="section__title">
        {{ header }}
    </h3>
</template>

<script>
    export default {
        props: {
            header: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .section__title {
        font: 700 46px/1.5 'Poppins', sans-serif;
        position: relative;
        display: inline-block;
        z-index: 1;
        @media (max-width: 1599px) {
            font: 700 38px/1.5 'Poppins', sans-serif;
        }
        @media (max-width: 1199px) {
            font: 700 32px/1.5 'Poppins', sans-serif;
        }
        @media (max-width: 991px) {
            font: 700 26px/1.5 'Poppins', sans-serif;
        }
        &:hover {
            &:after {
                height: 100%;
            }
        }
        &:after {
            transition: height 0.35s ease-in-out;
            content: '';
            position: absolute;
            left: 0;
            bottom: -15px;
            width: 80%;
            height: 10px;
            background: $main-color;
            z-index: -1;
        }
    }
</style>
