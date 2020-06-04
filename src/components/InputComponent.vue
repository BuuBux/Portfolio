<template>
    <div class="field">
        <label
            :class="[{ 'focused' : focused }]"
            class="field__abel">
            <span class="field__label"> {{ title }} </span>
            <input
                    @focusin="focused = true"
                    v-bind="$attrs"
                    v-on="$listeners"
                    class="field__input"
                    v-model="inputValue" />
        </label>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        data() {
            return {
                inputValue: '',
                focused: false,
            }
        },
        props: {
            title: {
                type: String,
                required: true
            }
        },
        watch: {
            inputValue: function (updatedValue) {
                this.$emit('input', updatedValue);
            }
        }
    }
</script>

<style lang="scss">
    .field {
        max-width: 320px;
        margin: 0 auto;
        .field__input {
            border-width: 0 0 2px 0;
            border-style: solid;
            border-color: #333;
            outline: 0;
            padding: 8px 15px;
            width: 100%;
        }
    }
</style>
