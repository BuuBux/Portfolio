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
          <g-image class="header__image" src="../assets/undraw_computer.svg" />
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

export default {
  components: {
    ButtonComponent,
    SocialMedia,
    AboutMe,
    ProjectsComponent,
    ContactComponent
  },
  metaInfo: {
    title: 'Kamil Kras - Jr. Frontend Developer',
    titleTemplate: null,
    meta: [
      { name: 'author', content: 'BuuBux - Kamil Kras'},
      { charset: 'utf-8' },
      { name: 'description', content: 'Kamil Kras portfolio' }
    ]
  }
}
</script>

<style lang="scss" scoped>
  .header__image {
    position: absolute;
    left: 50%;
    max-width: 75vh;
  }
  .read-more__header {
    margin-top: 50px;
  }
  .header__stretch {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    > .row {
      &:first-child {
        flex-grow: 1;
      }
      align-items: center;
    }
  }
  .header__title {
    font: 700 52px/1.5 'Poppins', sans-serif;
    .header__title--decorator {
      animation: 0.6s ease-in-out infinite alternate blinking;
    }
  }
  .read-more__faq {
    margin: 0 0 0 auto;
  }
  .header__links {
    margin-bottom: 50px;
  }
</style>
