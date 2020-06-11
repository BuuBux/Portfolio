<template>
  <div class="app">
    <Header>
      <div class="container header__stretch">
        <div class="row">
          <div class="col-12">
            <h2 class="header__title">
              Cześć<span class="header__title--decorator">_</span><br />
              Nazywam się Kamil <br />
              Junior Frontend Developer
            </h2>
            <button-component
              class="read-more__header"
              buttonText="Zobacz więcej"
              :external="false"
              href="#about" />
          </div>
          <header-image class="header__image" />
        </div>
        <div class="row header__links">
          <div class="col-6">
            <social-media />
          </div>
          <div class="col-6">
            <button-component
              class="read-more__faq"
              buttonText="FAQ"
              :external="false"
              href="#about" />
          </div>
        </div>
      </div>
    </Header>
    <Main>
      <about-me />
      <projects-component />
      <contact-component />
    </Main>
    <Footer>

    </Footer>
    <notifications group="info" />
  </div>
</template>

<page-query>
  query {
    graphCMS {
      projects {
        id
        projectUrl
        projectImage {
          url
        }
        projectTitle
        projectType
        githubLinkToProject
      }
    }
  }
</page-query>

<script>
import ButtonComponent from '../components/ButtonComponent';
import SocialMedia from '../components/SocialMediaComponent';
import AboutMe from '../components/AboutMeComponent';
import ProjectsComponent from '../components/ProjectsComponent';
import ContactComponent from '../components/ContactComponent';
import HeaderImage from '../components/HeaderImage';

export default {
  components: {
    ButtonComponent,
    SocialMedia,
    AboutMe,
    ProjectsComponent,
    ContactComponent,
    HeaderImage
  },
  metaInfo: {
    title: 'Kamil Kras - Jr. Frontend Developer',
    titleTemplate: null,
    meta: [
      { name: 'author', content: 'BuuBux - Kamil Kras'},
      { charset: 'utf-8' },
      { name: 'description', content: 'Kamil Kras portfolio' }
    ]
  },
  methods: {
    smoothScroll(target) {
      const targetPosition = target.getBoundingClientRect().top;
      window.scrollBy({ top: targetPosition, left: 0, behavior: 'smooth' });
    }
  },
  mounted() {
    const self = this;
    document
            .querySelectorAll('a')
            .forEach((link) =>
                    (link.getAttribute('href').split('')[0] === '#')
                      ? link.addEventListener('click', (e) => {
                          e.preventDefault();
                          const target = document.querySelector(`${link.getAttribute('href')}`);
                          self.smoothScroll(target);
                        })
                      : null
    );
  }
}
</script>

<style lang="scss">
  .vue-notification-group {
    position: fixed;
    margin: 15px 15px 0 0;
    .vue-notification {
      padding: 10px;
      margin: 0 5px 5px;

      font-size: 12px;

      color: #ffffff;
      background: #44A4FC;
      border-left: 5px solid #187FE7;

      &.warn {
        background: #ffb648;
        border-left-color: #f48a06;
      }

      &.error {
        background: #E54D42;
        border-left-color: #B82E24;
      }

      &.success {
        background: #68CD86;
        border-left-color: #42A85F;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .header__image {
    position: absolute;
    left: 50%;
    max-width: 45vw;
  }
  .read-more__header {
    margin-top: 50px;
    @media (max-width: 1199px) {
      margin-top: 25px;
    }
    @media (max-width: 575px) {
      margin: 25px auto 0 auto;
    }
  }
  .header__stretch {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    > .row {
      &:first-child {
        flex-grow: 1;
          justify-content: center;
          margin: 125px 0 50px 0;
          @media (max-height: 600px) {
            margin: 125px 0 25px 0;
          }
          @media (max-width: 991px) {
            .header__image {
              flex: 0 0 100%;
              order: -1;
              max-width: 90%;
              position: static;
              margin-bottom: 25px;
            }
          }
      }
      align-items: center;
    }
  }
  .header__title {
    font: 700 52px/1.5 'Poppins', sans-serif;
    transition: font-size 0.1s ease;
    @media (max-width: 1599px) {
      font: 700 38px/1.5 'Poppins', sans-serif;
    }
    @media (max-width: 1199px) {
      font: 700 28px/1.5 'Poppins', sans-serif;
    }
    @media (max-width: 991px) {
      font: 700 24px/1.5 'Poppins', sans-serif;
    }
    @media (max-width: 767px) {
      font: 700 22px/1.5 'Poppins', sans-serif;
    }
    @media (max-width: 359px) {
      font: 700 18px/1.5 'Poppins', sans-serif;
    }
    .header__title--decorator {
      animation: 0.6s ease-in-out infinite alternate blinking;
    }
  }
  .read-more__faq {
    margin: 0 0 0 auto;
  }
  .header__links {
    margin-bottom: 50px;
    @media (max-width: 767px) {
      margin-bottom: 25px;
    }
  }
</style>
