<template>
    <article
        class="projects-section__article"
        :class="[`project__${index+1}`, { 'col-md-6 col-lg-4' : selected !== ''}]">
        <div :style="`background-image: url(${project.projectImage.url})`"
             class="projects-section__background">
            <div class="projects-section__details">
                <h4 class="project-name">
                    {{project.projectTitle}}<span class="project-name__decorator">_</span>
                </h4>
                <div class="projects-section__links">
                    <a :href="project.projectUrl">
                        <i class="fas fa-globe-americas"></i>
                    </a>
                    <a v-if="project.githubLinkToProject" :href="project.githubLinkToProject">
                        <i class="fab fa-github-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        props: {
            selected: {
                type: String,
                required: true
            },
            project: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .projects-section__article {
        display: flex;
        transform: scale(0);
        opacity: 0;
        .projects-section__background {
            position: relative;
            box-shadow: 4px 4px 20px 0 rgba(1,1,1,.2);
            min-height: 260px;
            background-position: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            flex-grow: 1;
            transition: min-height 0.2s ease-in-out;
            @media (max-width: 1599px) {
                min-height: 220px;
            }
            @media (max-width: 1199px) {
                min-height: 180px;
            }
            @media (max-width: 991px) {
                min-height: 140px;
            }
            @media (max-width: 767px) {
                min-height: 320px;
            }
            @media (max-width: 575px) {
                min-height: 50vw;
            }
        }
        &:hover {
            .projects-section__details {
                transform: scale(1);
            }
        }
    }

    .project-name {
        opacity: 1;
        font: 700 48px/1 'Rajdhani', sans-serif;
        z-index: 1;
        color: #fff;
        text-transform: uppercase;
        @media (max-width: 1199px) {
            font: 700 38px/1 'Rajdhani', sans-serif;
        }
        @media (max-width: 991px) {
            font: 700 28px/1 'Rajdhani', sans-serif;
        }
        @media (max-width: 767px) {
        }
        @media (max-width: 410px) {
            font: 700 24px/1 'Rajdhani', sans-serif;
        }
        .project-name__decorator {
            color: $secondary-color;
            animation: 0.6s ease-in-out infinite alternate blinking;
        }
    }

    .projects-section__links {
        margin: 15px;
        @media (max-width: 991px) {
            margin: 5px 0 0 0;
        }
        a {
            transition: color 0.35s ease-in-out;
            &:hover {
                color: $secondary-color;
            }
            color: #fff;
            &:not(:first-child) {
                margin-left: 20px;
            }
            font-size: 36px;
            @media (max-width: 1599px) {
                font-size: 28px;
            }
            @media (max-width: 991px) {
                font-size: 24px;
            }
            @media (max-width: 767px) {
                font-size: 22px;
            }
            @media (max-width: 410px) {
                font-size: 18px;
            }
        }
    }

    .projects-section__details {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        background: rgba(37, 37, 37, 0.97);
        left: 0;
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: transform 0.45s ease-in-out;
        transform: scale(0);
        @media (max-width: 767px) {
            transform: scale(1);
            height: auto;
            top: auto;
            bottom: 0;
            padding: 15px 0;
        }
        @media (max-width: 410px) {
            padding: 8px 0;
        }
    }

</style>
