require('./main.scss');

import Header from '~/layouts/Header.vue';
import Main from '~/layouts/Main.vue';
import Footer from '~/layouts/Footer.vue';

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&family=Rajdhani:wght@300;400;700&display=swap'
  });
  head.htmlAttrs = { lang: 'pl' };
  Vue.component('Header', Header);
  Vue.component('Main', Main);
  Vue.component('Footer', Footer);
}