document.addEventListener('DOMContentLoaded', () => {


    // Add subtle parallax effect to bloody blobs based on mouse movement
    // Only apply on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            const blobs = document.querySelectorAll('.blob-bg');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            blobs.forEach((blob, index) => {
                // Different speeds for different blobs to create depth
                const speed = index === 0 ? 30 : -45;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;

                // Use requestAnimationFrame for smoother performance
                requestAnimationFrame(() => {
                    blob.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.1)`;
                });
            });
        });
    }
});
