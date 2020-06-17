<template>
    <div class="social-links">
        <ul class="social-links__list">
            <li
                :key="index"
                v-for="(social, index) in $static.graphCMS.socialMedias"
                class="social-links__item">
                <a
                    class="social-links__link"
                    :href="social.socialUrl"
                    :title="social.name"
                    :alt="`Social media link - ${social.name}`">
                    <i :class="`icon-${(social.name).toLowerCase()}`" v-html="icons[(social.name).toLowerCase()]" />
                </a>
            </li>
        </ul>
    </div>
</template>

<static-query>
    query {
        graphCMS {
            socialMedias {
                fontAwesomeClass
                id
                name
                newTab
                socialUrl
            }
        }
    }
</static-query>

<script>
    import icons from '../services/icons';

    export default {
        data() {
            return {
                icons,
            }
        },
    }
</script>

<style lang="scss">
    @import '../styles/variables';
    .social-links__list {
        display: flex;
        justify-content: flex-start;
    }
    .social-links__item {
        list-style: none;
        margin-right: 30px;
        display: inline-block;
    }
    .social-links__link {
        text-decoration: none;
        &:hover {
            path {
                fill: $secondary-color;
            }
        }
        svg {
            max-width: 30px;
            width: 100%;
            path {
                transition: fill 0.3s ease;
                fill: $main-color;
            }
        }
    }
</style>

