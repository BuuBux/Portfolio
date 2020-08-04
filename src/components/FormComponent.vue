<template>
    <form @submit.prevent="sendMail()" class="contact__form">
        <h5 class="contact__title"> {{ contactHeader }} </h5>
        <input-component
                @blur="$v.contactForm.name.$touch()"
                :class="{ 'field--invalid' : $v.contactForm.name.$error }"
                v-model="contactForm.name"
                title="Imie i nazwisko"
                type="text" />
        <input-component
                @blur="$v.contactForm.email.$touch()"
                :class="{ 'field--invalid' : $v.contactForm.email.$error }"
                v-model="contactForm.email"
                title="E-mail"
                type="email" />
        <input-component
                @blur="$v.contactForm.topic.$touch()"
                :class="{'field--invalid' : $v.contactForm.topic.$error }"
                v-model="contactForm.topic"
                title="Temat"
                type="text" />
        <input-component
                v-model="contactForm.phone"
                title="Telefon"
                type="text" />
        <button class="read-more contact__button" type="submit">
            <span class="read-more__decorator read-more__sides" />
                <i v-if="clicked" v-html="icons.spin" />
                <template v-else> Wyślij zapytanie </template>
            <span class="read-more__decorator read-more__vertices" />
        </button>
    </form>
</template>

<script>
    import InputComponent from './InputComponent';
    import axios from 'axios';
    import { required, minLength, email } from 'vuelidate/lib/validators';
    import icons from '../services/icons';

    export default {
        data() {
            return {
                icons,
                contactForm: {
                    name: '',
                    email: '',
                    topic: '',
                    phone: '',
                },
                clicked: false,
            }
        },
        props: {
          contactHeader: {
              type: String,
              required: true,
          },
        },
        validations: {
            contactForm: {
              name: { required, minLength: minLength(3) },
              email: { required, email },
              topic: { required, minLength: minLength(5) },
              phone: { },
          }
        },
        components: {
            InputComponent
        },
        methods: {
            clearFocus() {
                const fields = document.querySelectorAll('.field');
                setTimeout(() => {
                    fields.forEach((field) => {
                        console.log(field);
                        if (field.classList.contains('focused')) {
                            field.classList.remove('focused');
                        }
                        if (field.classList.contains('field--invalid')) {
                            field.classList.remove('field--invalid');
                        }
                    })
                }, 150)

            },
            flashContactForm() {
                this.clearFocus()
                this.clicked = false;
                return { name: '', email: '', topic: '', phone: '' }
            },
            sendMail() {
                this.$v.$touch();
                const { name, email, topic, phone } = this.contactForm;
                if (!this.$v.$invalid) {
                  this.clicked = true;
                  axios.post('api/mail', { name, email, topic, phone })
                        .then(() => {
                            this.$notify({
                                group: 'info',
                                type: 'success',
                                title: `Dziękuje za kontakt ${this.contactForm.name} ✔`,
                                text: `Na twój adres mail powinno przyjść potwierdzenie`
                            })
                            this.contactForm = this.flashContactForm();
                        })
                        .catch((error) => {
                            this.$notify({
                                group: 'info',
                                type: 'error',
                                title: 'Coś poszło nie tak 🤔',
                                text: 'Napisz na mail contact@buubux.pl lub spróbuj ponownie'
                            });
                            this.contactForm = this.flashContactForm();
                            this.clicked = false;
                            throw Error(error);
                        });
                }
            },
        }
    }
</script>

<style lang="scss">

    .contact__title {
        text-align: center;
        font: 300 36px/1.5 'Poppins', sans-serif;
        margin-bottom: 50px;
        transition: font-size 0.1s ease, margin 0.1s ease;
        @media (max-width: 575px) {
            font: 300 18px/1.5 'Poppins', sans-serif;
            margin-bottom: 25px;
        }
    }

    .contact__form {
        width: 100%;
        padding: 50px;
        background: #fff;
        box-shadow: 4px 4px 20px 0 rgba(1, 1, 1, 0.2);
        transition: padding 0.1s ease;
        @media (max-width: 575px) {
            padding: 35px;
        }
    }
    .contact__button {
        background: transparent;
        border: 0;
        margin: 55px auto 0;
        outline: none;
        transition: margin 0.1s ease;
        svg {
            max-width: 18px;
            width: 100%;
        }
        @media (max-width: 575px) {
            margin: 20px auto 0;
        }
        &:hover {
            cursor: pointer;
        }
    }
</style>
