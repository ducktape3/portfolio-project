let floatingTextAnimationFrame;

document.addEventListener('mousemove', function(e) {
    if (floatingTextAnimationFrame) {
        cancelAnimationFrame(floatingTextAnimationFrame);
    }
    floatingTextAnimationFrame = requestAnimationFrame(() => {
        const floatingTexts = document.querySelectorAll('.floating-text');
        floatingTexts.forEach(floatingText => {
            const rect = floatingText.getBoundingClientRect();
            const textX = rect.left + rect.width / 2;
            const textY = rect.top + rect.height / 2;
            const deltaX = e.clientX - textX;
            const deltaY = e.clientY - textY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const range = 400; // Set the range within which the text will follow the cursor

            if (distance < range) {
                const rotateX = deltaY / 20;
                const rotateY = -deltaX / 20;
                floatingText.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                floatingText.style.transform = `translate(-50%, -50%) rotateX(0deg) rotateY(0deg)`;
            }
        });
    });
});