<template>
    <section id="contact" class="contact">
        <div class="container">
            <div class="row">
                <div class="col-12 contact__header">
                    <section-header-component header="Porozmawiajmy..." />
                </div>
                <div class="col-8">
                    <form class="contact__form"> </form>
                </div>
                <div class="col-4">

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import SectionHeaderComponent from './SectionHeaderComponent';
    export default {
        components: {
            SectionHeaderComponent,
        },
    }
</script>

<style lang="scss">
    .contact {
        padding: 150px 0 250px;
        background: rgb(255,255,255);
        background: linear-gradient(90deg,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,1) 25%,
                rgba(250,250,250,1) 25%,
                rgba(250,250,250,1) 100%
        );
    }
    .contact__header {
        margin-bottom: 55px;
    }
</style>
