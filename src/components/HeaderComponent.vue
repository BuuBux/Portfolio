<template>
    <div class="navigation__wrapper container fixed">
        <div class="row">
                <div class="brand">
                    <g-link to="/">
                        <h1>
                            <g-image
                                class="brand__image"
                                src="~/assets/logo.jpg"
                                :alt="$static.metadata.siteName"
                                tile="Kamil Kras - Jr. Frontend Developer" />
                        </h1>
                    </g-link>
                </div>

                <div
                    @click="isMenuOpen = !isMenuOpen"
                    class="d-flex flex-column align-items-center justify-content-center d-md-none burger__wrapper">
                    <span
                        :key="elem"
                        v-for="elem in menuClasses"
                        class="burger__menu"
                        :class="`menu__${elem}`" />
                </div>

                <nav class="nav d-md-block">
                    <g-link class="nav__link" to="/"> Strona główna </g-link>
                    <a class="nav__link" href="#about"> O mnie </a>
                    <a class="nav__link" href="#projects"> Projekty </a>
                    <a class="nav__link" href="#contact"> Kontakt </a>
                </nav>
        </div>
    </div>
</template>

<static-query>
    query {
        metadata {
            siteName
        }
    }
</static-query>

<script>
    import gsap from 'gsap';
    import { debounce } from 'lodash';
    let masterTl = gsap.timeline();
    masterTl.reversed(true);

    export default {
        data() {
            return {
                isMenuOpen: false,
                menuClasses: ['top', 'middle', 'bottom'],
            }
        },
        methods: {
            play() {
                masterTl.add(this.burgerAnimation());
                masterTl.add(this.menuAnimation());
                masterTl.play();
            },
            reverse() {
                masterTl.add(this.burgerAnimation());
                masterTl.add(this.menuAnimation());
                masterTl.reverse();
            },
            burgerAnimation() {
                let tl = gsap.timeline();
                    tl
                        .to('.menu__top', { x: 0, z: 0.01 })
                        .to('.menu__middle', { x: 0, z: 0.01 }, '<')
                        .to('.menu__bottom', { x: 0, z: 0.01 }, '<')
                        .to('.menu__top', { y: 2, z: 0.01 })
                        .to('.menu__bottom', { y: -2, z: 0.01 }, '<')
                        .to('.menu__middle', { opacity: 0}, '<')
                        .to('.menu__top', { rotate: 45 })
                        .to('.menu__bottom', {rotate: -45 }, '<')
                    tl.totalDuration(0.45)
                return tl;
            },
            menuAnimation() {
                let tl = gsap.timeline();
                    tl.to('.nav', { display: 'flex', duration: 0.1 })
                    tl.to('.burger__wrapper', { top: 35, left: 0, right: 0, margin: '0 auto', position: 'fixed', duration: 0.01 },'<')
                    tl.to('.navigation__wrapper', { position: 'fixed', duration: 0.1 }, '<')
                    tl.to('.nav', { z: 0.01, y: 0, duration: 0.15 })
                return tl;
            },
            closeMenuIfWindowExpanded() {
                if (document.documentElement.getBoundingClientRect().width > 767 && this.isMenuOpen) {
                    this.isMenuOpen = false;
                }
            }
        },
        mounted() {
            const links = document.querySelectorAll('.nav__link');
            links.forEach((link) => link.addEventListener('click', () => {
                if (this.isMenuOpen) { this.isMenuOpen = false; }
            }));
            document.addEventListener('resize', debounce(this.closeMenuIfWindowExpanded, 150));
        },
        watch: {
            isMenuOpen: function () {
                masterTl.reversed()
                    ? this.play()
                    : this.reverse();
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '../styles/variables';

    .burger__wrapper {
        position: relative;
        width: 45px;
        height: 40px;
        z-index: 1002;
        &:hover {
            cursor: pointer;
        }
        .burger__menu {
            width: 35px;
            height: 2px;
            background: #fff;
            display: block;
            border-radius: 8px;
            &.menu__middle { transform: translate3D(5px, 0, 0); }
            &.menu__top { transform: translate3D(-5px, -10px, 0); }
            &.menu__bottom { transform: translate3D(-5px, 10px, 0); }
        }
    }

    .navigation__wrapper {
        &.fixed {
            position: absolute;
            left: 0;
            right: 0;
            top: 15px;
            z-index: 3;
        }
        >.row {
            align-items: center;
            justify-content: space-between;
            @media (max-width: 575px) {
                justify-content: space-around;
            }
        }
    }
    .brand {
        line-height: 0;
    }
    .brand__image {
        max-height: 75px;
        width: auto;
        border-radius: 16px;
    }

    .nav {
        display: none;
        @media (max-width: 768px) {
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            transform: translate3d(0, -100%, 0);
            background: #333;
            justify-content: center;
            align-content: center;
            flex-direction: column;
            z-index: 1000;
            text-align: center;
        }
    }

    .nav__link {
        font: 700 22px/1.5 'Poppins', sans-serif;
        text-decoration: none;
        color: #fff;
        position: relative;
        transition: color 0.35s ease-in-out;
        display: inline-block;
        @media (max-width: 1199px) {
            font: 700 18px/1.5 'Poppins', sans-serif;
        }
        @media (max-width: 991px) {
            font: 700 16px/1.5 'Poppins', sans-serif;
        }
        &:after {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            transform: translate3D(-50%, 0, 0);
            background: transparent;
            height: 2px;
            bottom: -5px;
            transform-origin: 50%;
            width: 0;
            transition: width 0.25s ease-in-out, background-color 0.25s ease-in-out;
        }
        &:not(:first-child) {
            margin: 0 0 0 25px;
            @media (max-width: 768px) {
                margin: 25px 0 0 0;
            }
        }
        &:hover {
            color: $secondary-color;
            &:after {
                width: 100%;
                background: $secondary-color;
            }
        }
    }
</style>
