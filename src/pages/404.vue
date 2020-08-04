<template>
    <Header :menu="false">
        <div class="container error__stretch">
            <div class="row">
                <div class="error__about col-12 col-lg-4">
                    <h1 class="error__title"> 404 </h1>
                    <h3 class="error__subtitle"> Zgubiłeś się na stronie </h3>
                    <button-component class="error__redirect" :external="false" button-text="Wróć" to="/" />
                </div>
                <div class="error__image col-12 col-lg-8">
                    <g-image alt="Coś poszło nie tak" title="Próbujemy to naprawić" class="img" src="../assets/undraw_404.svg" quality="80" width="800"/>
                </div>
            </div>
        </div>
    </Header>
</template>

<script>
    import ButtonComponent from '../components/ButtonComponent';
    export default {
        components: {ButtonComponent},
        metaInfo: {
            title: '404'
        },
        meta: [
            { name: 'author', content: 'Kamil Kras'},
            { charset: 'utf-8' },
            { name: 'description', content: 'Sprawdź inne strony które możesz znaleźć inne ciekawe rzeczy' }
        ]
    }
</script>

<style lang="scss" scoped>
    .error__stretch {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .row {
            flex-grow: 1;
            justify-content: center;
            .col-12 {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .error__image {
                align-items: center;
                @media (max-width: 991px) {
                    order: -1;
                }
                @media (max-height: 736px) {
                    justify-content: flex-end;
                }
            }
        }
    }
    .error__about {
        align-items: flex-start;
        @media (max-width: 991px) {
            align-items: center;
        }
    }
    .error__title {
        font: 700 4rem/1.4 'Poppins', sans-serif;
        @media (max-width: 575px) {
            font-size: 3rem;
        }
    }
    .error__subtitle {
        font: 700 2rem/1.4 'Poppins', sans-serif;
        @media (max-width: 575px) {
            font-size: 1.5rem;
        }
    }
    .error__title, .error__subtitle {
        margin: 0 0 15px 0;
    }
    .error__redirect {
        margin: 25px 0 0 0;
    }
</style>
