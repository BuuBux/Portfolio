<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="footer__contact">
                        <div class="footer__image">
                            <g-image src="../assets/men-in-suit.svg" alt="Jak się ze mną skontaktować?" title="Kamil Kras - Dane kontaktowe" quality="80" />
                        </div>
                        <div class="footer__about">
                            <h2 class="footer__title"> Kontakt </h2>
                            <div class="contact__element">
                                <a href="mailto:kamilkras.kontakt@gmail.com" title="Adres mailowy">
                                    <p class="contact__name"> EMAIL </p>
                                    <p class="contact__value"> kamilkras.kontakt@gmail.com </p>
                                </a>
                            </div>
                            <div class="contact__element">
                                <a href="https://github.com/BuuBux" title="Github">
                                    <p class="contact__name"> GITHUB </p>
                                    <p class="contact__value"> BuuBux </p>
                                </a>
                            </div>
                            <div class="contact__element">
                                <a href="https://www.linkedin.com/in/kamil-kras-636baa128/" title="Linkedin">
                                    <p class="contact__name"> LINKEDIN </p>
                                    <p class="contact__value"> Kamil Kras </p>
                                </a>
                            </div>
                            <div class="contact__element">
                                <a href="tel:533289033" title="Mój telefon">
                                    <p class="contact__name"> TELEFON </p>
                                    <p class="contact__value"> 533 - 289 - 033 </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 footer__copyright">
                    <p> © {{new Date().getFullYear()}} Kamil Kras. All right reserved </p>
                </div>
            </div>
        </div>
        <slot />
    </footer>
</template>

<script>
    import SocialMediaComponent from '../components/SocialMediaComponent';
    export default {
        components: {
            SocialMediaComponent
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';
    .footer{
        position: relative;
        transition: padding 0.1s ease;
        @media (max-width: 575px) {
            padding: 150px 0 20px;
        }
        &:before {
            content: '';
            width: 100%;
            display: block;
            background: url(../assets/wave.svg) top left / 100% no-repeat;
            height: 184px;
            top: -1px;
            left: 0;
            position: absolute;
        }
        padding: 250px 0 20px;
        background-image: linear-gradient(to right, $main-color 0%, rgba($main-color, 0.6) 100%);
        .footer__contact {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .footer__about {
            padding-left: 45px;
        }
        .footer__title {
            font: 700 3em/1.5 'Poppins', sans-serif;
            color: #fff;
            margin: 0 0 25px 0;
        }
        .contact__element {
            margin: 0 0 15px 0;
            a {
                display: inline-block;
                width: 100%;
                text-decoration: none;
                &:hover {
                    .contact__value { color: rgba(#fff, 1); }
                }
                .contact__name {
                    font: 700 16px/1.25 'Poppins', sans-serif;
                    color: #fff;
                }
                .contact__value {
                    color: rgba(#fff, 0.7);
                    transition: color 0.2s ease-in-out;
                }
            }
        }
        .footer__copyright {
            text-align: center;
            color: #fff;
            margin-top: 45px;
            font: 400 12px/1.5 'Poppins', sans-serif;
        }
        @media (max-width: 375px) {
            .footer__image {
                display: none;
            }
            .footer__about {
                padding-left: 0;
            }
        }
    }
</style>
