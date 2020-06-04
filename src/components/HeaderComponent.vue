<template>
    <div class="navigation-wrapper container fixed">
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
            <nav class="nav">
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

<style lang="scss" scoped>

    @import '../styles/variables';

    .navigation-wrapper {
        &.fixed {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 15px;
        }
        >.row {
            align-items: center;
            justify-content: space-between;
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
    .nav__link {
        font: 700 24px/1.5 'Poppins', sans-serif;
        text-decoration: none;
        color: #fff;
        position: relative;
        transition: color 0.35s ease-in-out;
        &:not(:first-child) {
            margin-left: 20px;
        }
        &:hover {
            color: $secondary-color;
        }
    }
</style>
