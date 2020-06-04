<template>
    <section id="contact" class="contact">
        <div class="container">
            <div class="row">
                <div class="col-12 contact__header">
                    <section-header-component header="Porozmawiajmy..." />
                </div>
                <div class="col-6 contact__left">
                    <form-component
                            contact-header="Poproś o kontakt"
                            class="stretch" />
                </div>
                <div class="col-5 contact__right">
                    <g-image class="contact__image" src="../assets/mail_box.svg" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import SectionHeaderComponent from './SectionHeaderComponent';
    import FormComponent from './FormComponent';

    export default {
        components: {
            SectionHeaderComponent,
            FormComponent
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
        .contact__left {
            display: flex;
            .stretch {
                flex-grow: 1;
            }
        }
        .contact__right {
            margin-left: auto;
        }
    }

    .contact__header {
        margin-bottom: 55px;
    }

</style>
