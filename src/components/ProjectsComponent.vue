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
               ref="slider"
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
    import { debounce, uniqBy } from 'lodash';
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
                isDown: false,
                startX: null,
                scrollLeft: null,
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
                        rotation: 0.01,
                        x: -150,
                        opacity: 0,
                        scale: 0,
                        position: 'absolute',
                        duration: 0.5,
                        onComplete: done
                    })
                }, delay);
            },
            playAnimation() {
                gsap.to('.projects-section__article', {
                    rotation: 0.01,
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
                const relativePosition = {
                    left: activeCategory.left - parent.left,
                    top: activeCategory.top - parent.top,
                };
                this.$refs.categoryDecorator.style.cssText = `transform: translate3D(${relativePosition.left}px, ${relativePosition.top}px, 0); width: ${width}px;`
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
            },
            mouseDown(e, slider) {
                console.log('clicked - down');
                this.isDown = true;
                slider.classList.add('project__slider--active');
                this.startX = e.pageX - slider.offsetLeft;
                this.scrollLeft = slider.scrollLeft;
            },
            mouseLeaveAndUp(slider) {
                console.log('clicked - leave | up');
                this.isDown = false;
                slider.classList.remove('project__slider--active');
            },
            mouseMove(e, slider) {
                console.log('clicked - move');
                if (!this.isDown) return
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = ( x - this.startX ) * 3;
                slider.scrollLeft = this.scrollLeft - walk;
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
            window.addEventListener('resize', debounce(this.animateMenu, 150));
            window.addEventListener('resize', debounce(() => {
                if (document.documentElement.getBoundingClientRect().width < 767) {
                    this.$refs.slider.forEach(
                        (slider) => slider.classList.add('projects__slider')
                    );
                } else {
                    this.$refs.slider.forEach(
                        (slider) => slider.classList.remove('projects__slider')
                    );
                }
            }, 150));
            setTimeout(() => {
                this.animateMenu();
                const slider = this.$refs.slider[0].firstElementChild;
                slider.addEventListener('mousedown', (e) => this.mouseDown(e, slider));
                slider.addEventListener('mouseleave', () => this.mouseLeaveAndUp(slider));
                slider.addEventListener('mouseup', () => this.mouseLeaveAndUp(slider));
                slider.addEventListener('mousemove', (e) => this.mouseMove(e, slider));
            }, 1000)
        }
    }
</script>

<style lang="scss">

    @import '../styles/variables';

    .projects {
        padding: 150px 0 200px;
        position: relative;
        transition: padding 0.1s ease;
        @media (max-width: 767px) {
            padding: 75px 0 125px;
        }
        &:after {
            content: '';
            background: url(../assets/wave.svg) top left / 100% no-repeat;
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
            flex-wrap: wrap;
            .categories__item {
                transition: color 0.35s 0.3s ease-in-out, padding 0.2s ease-in-out;
                list-style: none;
                padding: 8px 35px;
                @media (max-width: 991px) {
                    padding: 8px 20px;
                }
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
        height: 40px;
        z-index: -1;
        background: $main-color;
        transition: width 0.35s ease-in-out, transform 0.35s ease-in-out;
    }

    .project__slider--active {
        background: rgba(255,255,255,0.3);
        cursor: grabbing;
        transform: scale(1);
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
            gap: 0;
            .projects-section__article {
                margin-bottom: 2em;
            }
        }

        @media (max-width: 767px) {
            display: block !important;
            padding: 25px 10px;
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
            user-select: none;
            cursor: pointer;
            transition: all 0.2s;
            transform: scale(0.98);
            will-change: transform;
            position: relative;
            background: rgba(255,255,255,0.1);
            font-size: 0;
            perspective: 500px;
            &.flexing {
                .projects-section__article {
                    flex: 0 0 100%;
                    max-width: 100%;
                }
            }
            .projects-section__article {
                width: 100%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                &:not(:first-child) {
                    margin: 0 0 0 25px;
                }
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
