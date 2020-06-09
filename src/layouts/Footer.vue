<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <g-image
                            class="footer__Logo"
                            src="../assets/logo-inverse.png"
                            alt="Frontend Developer"
                            title="Kamil Kras - Portfolio" />
                    <social-media-component />
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
        &:before {
            content: '';
            width: 100%;
            display: block;
            background: url(../assets/wave.svg) top left / contain no-repeat;
            height: 184px;
            top: -1px;
            left: 0;
            position: absolute;
        }
        padding: 250px 0 20px;
        background-image: linear-gradient(to right, $main-color 0%, rgba($main-color, 0.6) 100%);
        .social-links__list {
            justify-content: center;
            margin: 35px 0;
            .social-links__item {
                margin: 0 15px;
                .social-links__link {
                    .fab {
                        color: #fff;
                        &:hover {
                            color: $secondary-color;
                        }
                    }
                }
            }
        }
        .footer__Logo {
            margin: 0 auto;
            display: block;
        }
        .footer__copyright {
            text-align: center;
            color: #fff;
            font: 400 12px/1.5 'Poppins', sans-serif;
        }
    }
</style>
