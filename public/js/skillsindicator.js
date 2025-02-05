// Create skill indicators
document.querySelectorAll('.skill-box').forEach(skillBox => {
    const skillIndicator = skillBox.querySelector('.skill-indicator');
    const skillScale = parseInt(skillIndicator.getAttribute('data-scale'), 10);

    for (let i = 1; i <= 10; i++) {
        const rect = document.createElement('div');
        rect.classList.add('indicator-box');
        skillIndicator.appendChild(rect);
    }

    skillBox.addEventListener('mouseover', () => {
        skillIndicator.querySelectorAll('.indicator-box').forEach((box, index) => {
            if (index < skillScale) {
                setTimeout(() => {
                    box.classList.add('active');
                }, index * 100); // Delay activation
            }
        });
    });

    skillBox.addEventListener('mouseout', () => {
        skillIndicator.querySelectorAll('.indicator-box').forEach((box, index) => {
            setTimeout(() => {
                box.classList.remove('active');
            }, index * 100); // Delay deactivation
        });
    });
});
