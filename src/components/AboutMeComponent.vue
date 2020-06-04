<template>
    <section id="about" class="about">
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <section-header-component
                       :header="$static.graphCMS.aboutMe.header" />
                    <div
                        class="about__description"
                        v-html="$static.graphCMS.aboutMe.aboutMe.html" />
                    <button-component
                        button-text="Pobierz CV"
                        :external="true"
                        href="./assets/cv.pdf" />
                </div>
                <div class="col-4">
                    AAA
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
    export default {
        components: {
            ButtonComponent,
            SectionHeaderComponent
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .about {
        padding: 125px 0 250px;
        background: $background-light;
    }

    .about__description {
        margin: 55px 0;
        text-align: justify;
        font: 400 18px/1.5 'Poppins', sans-serif;
        p {
         &:not(:last-child) {
             margin-bottom: 15px;
         }
        }
    }
</style>
