<template>
    <section id="contact" class="contact">
        <div class="container">
            <div class="row">
                <div class="col-12 contact__header">
                    <section-header-component header="Porozmawiajmy..." />
                </div>
                <div class="col-12 col-lg-6 contact__left">
                    <form-component
                        contact-header="Poproś o kontakt"
                        class="stretch" />
                </div>
                <div class="col-5 d-none d-lg-flex align-items-center contact__right">
                    <g-image title="Kontakt mailowy" alt="Skontaktuj się ze mną" class="contact__image" src="../assets/mail_box.svg" quality="80" />
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
        transition: padding 0.1s ease;
        background: rgb(255,255,255);
        background: linear-gradient(90deg,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,1) 25%,
                rgba(250,250,250,1) 25%,
                rgba(250,250,250,1) 100%
        );
        @media (max-width: 767px) {
            padding: 75px 0 125px;
        }
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
