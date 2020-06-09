<template>
    <section ref="projects" id="projects" class="projects">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <section-header-component header="Projekty..." />
                    <div ref="categoryList" class="categories">
                        <ul class="categories__list">
                            <li
                                ref="categoryItem"
                                class="categories__item"
                                :class="{
                                'categories__item--active' : selected.toLowerCase() === category.value.toLowerCase()
                            }"
                                    @click="switchActiveCategory(category.value)"
                                    v-for="(category, index) in categories"
                                    :key="index">
                                {{category.name}}
                            </li>
                        </ul>
                        <span ref="categoryDecorator" class="categories_decorator"></span>
                    </div>
                </div>
            </div>
            <div
               :key="index"
               v-for="(projects, index) in projects"
               class="row">
                <transition-group
                    mode="out-in"
                    @enter="playAnimation"
                    @leave="leave"
                    :css="false"
                    class="projects-section__grid"
                    :class="{ 'flexing' : selected !== ''}"
                    name="grid"
                    tag="div">
                    <projects-article-component
                        :selected="selected"
                        :key="project.id"
                        v-for="(project, index) in projects"
                        :project="project"
                        :index="index" />
                </transition-group>
            </div>
        </div>
    </section>
</template>

<static-query>
    query {
        graphCMS {
            projects {
                id
                githubLinkToProject
                projectTitle
                projectType
                projectUrl
                projectImage {
                    url
                }
            }
        }
    }
</static-query>

<script>
    import ProjectsArticleComponent from '../components/ProjectsArticleComponent';
    import SectionHeaderComponent from './SectionHeaderComponent';
    import gsap from 'gsap';

    export default {
        components: {
            SectionHeaderComponent,
            ProjectsArticleComponent
        },
        data() {
            return {
                selected: '',
                projects: [],
                fired: false,
                categories: [
                    {
                        name: 'Wszystkie',
                        value: '',
                    },
                    {
                        name: 'Sklepy internetowe',
                        value: 'shop',
                    },
                    {
                        name: 'Strony internetowe',
                        value: 'website',
                    },
                    {
                        name: 'Aplikacje',
                        value: 'app'
                    }
                ]
            }
        },
        methods: {
            leave(el, done) {
                const delay = el.dataset.index * 150;
                setTimeout(() => {
                    gsap.to(el, {
                        translateX: -150,
                        opacity: 0,
                        position: 'absolute',
                        duration: 0.5,
                        onComplete: done
                    })
                }, delay);
            },
            playAnimation() {
                gsap.to('.projects-section__article', {
                    duration: 0.75,
                    opacity: 1,
                    scale: 1,
                    ease: 'expo.out',
                    stagger: {
                        each: 0.1,
                        from: 'edges'
                    },
                });
                this.fired = true;
            },
            animateMenu() {
                const parent = this.$refs.categoryList.getBoundingClientRect();
                const activeCategory = this.$refs.categoryItem
                    .filter((domElement) => domElement.classList.contains('categories__item--active'))[0].getBoundingClientRect();
                const width = activeCategory.right - activeCategory.left;
                const relativePosition = activeCategory.left - parent.left;
                this.$refs.categoryDecorator.style.cssText = `transform: translate(${relativePosition}px, 0); width: ${width}px;`
            },
            switchActiveCategory(category) {
              this.selected = category;
              if (category !== '') {
                  this.projects = this.convertProject(this.$static.graphCMS.projects)
                      .map((x) => x
                          .filter((y) => category.toLowerCase() === y.projectType.toLowerCase()))
              } else {
                  this.projects = this.convertProject(this.$static.graphCMS.projects);
                }
            },
            convertProject(projects, distance = 12) {
                const projectLength = (projects.length > distance)
                    ? parseInt(projects.length / distance, 10)
                    : 0;
                if ( projectLength !== 0) {
                    const newProjects = [];
                    for (let i = 0; i < projectLength; i++) {
                        newProjects.push(projects.slice(0, distance));
                    }
                    return newProjects;
                }
                return [ projects ];
            },
            checkUserPosition() {
                const bottomOfImage = this.$refs.projects.getBoundingClientRect().top - document.documentElement.clientHeight / 2;
                if (bottomOfImage <= 0) {
                    if (!this.fired) {
                        this.playAnimation();
                    }
                }
            }

        },
        watch: {
            selected: function () {
                setTimeout(() => this.animateMenu() ,100);
            }
        },
        mounted() {
            this.projects = this.convertProject(this.$static.graphCMS.projects);
            this.checkUserPosition();
            window.addEventListener('scroll', this.checkUserPosition);
            setTimeout(() => {
                this.animateMenu();
            }, 1000)
        }
    }
</script>

<style lang="scss">

    @import '../styles/variables';

    .projects {
        padding: 150px 0 200px;
        position: relative;
        &:after {
            content: '';
            background: url(../assets/wave.svg) bottom left / contain no-repeat;
            width: 100%;
            height: 184px;
            bottom: -1px;
            display: block;
            left: 0;
            position: absolute;
            transform: rotate(-180deg) scaleX(-1);
        }
    }

    .categories {
        margin: 55px auto;
        text-align: center;
        position: relative;
        .categories__list {
            display: inline-flex;
            justify-content: center;
            .categories__item {
                transition: color 0.35s 0.3s ease-in-out;
                list-style: none;
                padding: 8px 35px;
                &:hover {
                    cursor: pointer;
                }
                &.categories__item--active {
                    color: #fff;
                    &:hover {
                        cursor: default;
                    }
                }
            }
        }
    }

    .categories_decorator {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        z-index: -1;
        background: $main-color;
        transition: width 0.35s ease-in-out, transform 0.35s ease-in-out;
    }

    .projects-section__grid {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(6, 1fr);
        gap: 2em 2em;
        grid-template-areas:
                "p1 p1 p1 p1 p2 p2"
                "p1 p1 p1 p1 p3 p3"
                "p4 p4 p5 p5 p6 p6"
                "p7 p7 p9 p9 p9 p9"
                "p8 p8 p9 p9 p9 p9";

        &.flexing {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .projects-section__article {
                margin-bottom: 2em;
            }
        }

        .project__1 { grid-area: p1; }

        .project__2 { grid-area: p2; }

        .project__3 { grid-area: p3; }

        .project__4 { grid-area: p4; }

        .project__5 { grid-area: p5; }

        .project__6 { grid-area: p6; }

        .project__7 { grid-area: p7; }

        .project__8 { grid-area: p8; }

        .project__9 { grid-area: p9; }

        .project__10 { grid-area: p10; }

        .project__11 { grid-area: p11; }

        .project__12 { grid-area: p12; }
    }
</style>
