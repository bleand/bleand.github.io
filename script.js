// Marks the document as scripted. style.css only hides .reveal elements
// under .js, so the page stays readable if this file never runs.
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('visible'));
} else {
    // Scroll-triggered entrance, staggered within each batch that enters together
    const observer = new IntersectionObserver((entries) => {
        entries.filter(entry => entry.isIntersecting).forEach((entry, i) => {
            const el = entry.target;
            el.style.transitionDelay = `${i * 50}ms`;
            el.classList.add('visible');
            observer.unobserve(el);

            // Drop the stagger delay afterwards so it doesn't slow hover transitions
            const clearDelay = (event) => {
                if (event.target !== el || event.propertyName !== 'opacity') return;
                el.style.transitionDelay = '';
                el.removeEventListener('transitionend', clearDelay);
            };
            el.addEventListener('transitionend', clearDelay);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
}

// Hero fades out as you scroll away
if (!reduceMotion) {
    const intro = document.getElementById('intro');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const progress = Math.min(window.scrollY / window.innerHeight, 1);
            intro.style.opacity = 1 - progress * 0.6;
            ticking = false;
        });
    }, { passive: true });
}
