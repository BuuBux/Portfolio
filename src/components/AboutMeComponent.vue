<template>
    <section id="about" class="about">
        <div class="container">
            <div class="row">
                <div class="col-12">
                <section-header-component
                        :header="$static.graphCMS.aboutMe.header" />
                </div>
            </div>
            <div class="row">
                <div class="order-1 order-lg-0 col-lg-7 col-xl-8">
                    <div
                        class="about__description"
                        v-html="$static.graphCMS.aboutMe.aboutMe.html" />
                    <button-component
                        class="about__button"
                        button-text="Pobierz CV"
                        :external="true"
                        href="./assets/cv.pdf" />
                </div>
                <div class="order-0 order-lg-1 col-lg-5 col-xl-4 skills__wrapper">
                    <skills-image />
                </div>
            </div>
        </div>
    </section>
</template>

<static-query>
    query {
        graphCMS {
            aboutMe(where: {id: "ckay5nxm85se40156j1c3c6tj"}) {
                id
                header
                cvButton
                aboutMe {
                    html
                }
            }
        }
    }
</static-query>

<script>
    import SectionHeaderComponent from './SectionHeaderComponent';
    import ButtonComponent from './ButtonComponent';
    import SkillsImage from './SkillsImage';

    export default {
        components: {
            ButtonComponent,
            SectionHeaderComponent,
            SkillsImage
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .about {
        padding: 125px 0 250px;
        background: $background-light;
        transition: padding 0.1s ease-in-out;
        @media (max-width: 991px) {
            padding: 100px 0 175px
        }
        @media (max-width: 767px) {
            padding: 75px 0 125px;
        }
    }

    .skills__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 991px) {
            margin-top: 35px;
        }
    }

    .about__button {
        @media (max-width: 991px) {
            margin: 0 auto;
        }
    }

    .about__description {
        margin: 55px 0;
        text-align: justify;
        font: 400 18px/1.5 'Poppins', sans-serif;
        @media (max-width: 1199px) {
            font: 400 16px/1.5 'Poppins', sans-serif;
            margin: 55px 0 35px;
        }
        @media (max-width: 575px) {
            font: 400 14px/1.5 'Poppins', sans-serif;
            margin: 35px 0;
        }
        p {
         &:not(:last-child) {
             margin-bottom: 15px;
         }
        }
    }
</style>
