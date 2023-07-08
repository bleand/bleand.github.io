/*
["DOMContentLoaded", "resize"].forEach(function(e){
    window.addEventListener(e, () => {
        const introText = document.querySelector('.intro-text');
        
        const introSection = document.querySelector('#intro');
        introSection.style.background = 'radial-gradient(circle, #FF4550, transparent)';
        const background = getComputedStyle(introSection).background;
        const introTextBBox = introText.getBoundingClientRect();
        const x = introTextBBox.x + introTextBBox.width *0.1;
        const y = introTextBBox.y + introTextBBox.height / 2;
        introSection.style.background = `radial-gradient(at ${x}px ${y}px, #bd4012, black)`;
        })
    }
);
*/