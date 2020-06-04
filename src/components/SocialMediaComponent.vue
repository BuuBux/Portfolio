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
                    <i class="fab" :class="social.fontAwesomeClass"></i>
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

<style lang="scss">
    @import '../styles/variables';
    .social-links__list {
        display: flex;
        justify-content: flex-start;
    }
    .social-links__item {
        list-style: none;
        margin-right: 30px;
    }
    .social-links__link {
        text-decoration: none;
        &:hover {
            .fab {
                color: $secondary-color;
            }
        }
        .fab {
            transition: color 0.35s ease-in-out;
            color: $main-color;
            font-size: 30px;
        }
    }
</style>

