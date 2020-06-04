<template>
    <form @submit.prevent="sendMail()" class="contact__form">
        <h5 class="contact__title"> {{ contactHeader }} </h5>
        <input-component
                @blur="$v.contactForm.name.$touch()"
                :class="{'field--invalid' : $v.contactForm.name.$error }"
                v-model="contactForm.name"
                title="Imie i nazwisko"
                type="text" />
        <input-component
                @blur="$v.contactForm.email.$touch()"
                :class="{'field--invalid' : $v.contactForm.email.$error }"
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
                Wyślij zapytanie
            <span class="read-more__decorator read-more__vertices" />
        </button>
    </form>
</template>

<script>
    import InputComponent from './InputComponent';
    import NProgress from 'nprogress';
    import axios from 'axios';
    import { required, minLength, email } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                contactForm: {
                    name: '',
                    email: '',
                    topic: '',
                    phone: '',
                }
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
              topic: { required, minLength: minLength(10) },
          }
        },
        components: {
            InputComponent
        },
        methods: {
            flashContactForm() {
                return { name: '', email: '', topic: '', phone: '' }
            },
            sendMail() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    NProgress.start();
                    axios.post('', {})
                        .then((response) => {
                            this.contactForm = this.flashContactForm();
                        })
                        .catch((error) => {
                            NProgress.done();
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
    }

    .contact__form {
        width: 100%;
        padding: 50px;
        background: #fff;
        box-shadow: 4px 4px 20px 0 rgba(1, 1, 1, 0.2);
    }
    .contact__button {
        background: transparent;
        border: 0;
        margin: 55px auto 0;
        &:hover {
            cursor: pointer;
        }
    }
</style>
