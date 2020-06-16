<template>
    <div
        :class="{ 'focused' : isFocused }"
        class="field">
        <label class="field__label">
            <span class="field__title"> {{ title }} </span>
            <input
                @focusin="isFocused = true"
                v-bind="$attrs"
                v-on="$listeners"
                class="field__input"
                v-model="inputValue"/>
        </label>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        data() {
            return {
                inputValue: '',
                isFocused: false,
            }
        },
        props: {
            title: {
                type: String,
                required: true
            }
        },
        watch: {
            $attrs({ value }) {
              if (value === '')
                  this.inputValue = '';
            },
            inputValue(updatedValue) {
                this.$emit('input', updatedValue);
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .field {
        max-width: 320px;
        margin: 0 auto;
        &.field--invalid {
            .field__label {
                .field__title {
                    color: $secondary-color;
                }
                &:after {
                    background: $secondary-color;
                }
            }
        }
        &.focused {
            &.field--invalid {
                .field__label {
                    .field__title {
                        color: $secondary-color;
                    }
                    &:after {
                        background: $secondary-color;
                    }
                }
            }
            .field__label {
                .field__title {
                    color: $main-color;
                    transform: translate3D(0, -100%, 0) scale(.8);
                    transition: transform 0.25s ease-in-out;
                }
                &:after {
                    background: $main-color;
                    animation: 0.25s ease-in-out 1 alternate borderTransform;
                }
            }
        }
        &:not(:last-child) {
            margin-bottom: 15px;
        }
        .field__label {
            position: relative;
            .field__title {
                position: absolute;
                left: 5px;
                bottom: 0;
                transform-origin: 0;
                transform: translate3D(0, 0, 0) scale(1);
                transition: transform 0.25s ease-in-out, color 0.25s ease-in-out, font-size 0.1s ease;
                @media (max-width: 575px) {
                    font: 400 14px/1.5 'Poppins', sans-serif;
                }
            }
            .field__input {
                border: 0;
                outline: 0;
                padding: 25px 5px 8px 5px;
                width: 100%;
                transition: border-bottom-color 0.25s ease-in-out, padding 0.1s ease;
                @media (max-width: 575px) {
                    padding: 15px 5px 8px 5px;
                }
            }
            &:after{
                content: '';
                width: 100%;
                height: 2px;
                display: block;
                position: absolute;
                background: #333;
                bottom: -6px;
                left: 50%;
                transform: translate3D(-50%, 0, 0);
                transition: background-color 0.25s ease-in-out;
            }
        }
    }
    @keyframes borderTransform {
        0% {
            width: 100%;
        }
        50% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
</style>
