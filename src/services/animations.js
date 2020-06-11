import gsap from 'gsap';

const menuAnimations = () => {
    const masterTimeline = gsap.timeline;

    const burgerAnimation = () => {
        let tl = gsap.timeline();
        tl
            .to('.menu__top', {x: 0, duration: 0.5})
            .to('.menu__middle', {x: 0, duration: 0.5}, '<')
            .to('.menu__bottom', {x: 0, duration: 0.5}, '<')
            .to('.menu__top', {y: 2, duration: 0.35})
            .to('.menu__bottom', {y: -2, duration: 0.35}, '<')
            .to('.menu__middle', {opacity: 0, duration: 0.35}, '<')
            .to('.menu__top', {rotate: 45, duration: 0.35})
            .to('.menu__bottom', {rotate: -45, duration: 0.35}, '<')
        return tl;
    }

    masterTimeline.add(burgerAnimation());

    return {
        play: masterTimeline.play(),
        reverse: masterTimeline.reverse()
    }

}

export default menuAnimations;
