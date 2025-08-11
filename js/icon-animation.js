document.addEventListener('DOMContentLoaded', () => {
    const phoneContainer = document.querySelector('.phone-container');
    const container = document.querySelector('.app-icons');
    if (!container || !phoneContainer) return;

    let icons = Array.from(container.querySelectorAll('.app-icon'));
    let containerRect = phoneContainer.getBoundingClientRect();

    let iconData = icons.map(icon => {
        const iconRect = icon.getBoundingClientRect();
        return {
            element: icon,
            x: Math.random() * (containerRect.width - iconRect.width),
            y: Math.random() * (containerRect.height - iconRect.height),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            width: iconRect.width,
            height: iconRect.height,
            radius: Math.max(iconRect.width, iconRect.height) / 2
        };
    });

    function update() {
        iconData.forEach((data, index) => {
            data.x += data.vx;
            data.y += data.vy;

            if (data.x < 0) {
                data.x = 0;
                data.vx *= -1;
            }
            if (data.x + data.width > containerRect.width) {
                data.x = containerRect.width - data.width;
                data.vx *= -1;
            }
            if (data.y < 0) {
                data.y = 0;
                data.vy *= -1;
            }
            if (data.y + data.height > containerRect.height) {
                data.y = containerRect.height - data.height;
                data.vy *= -1;
            }

            for (let i = index + 1; i < iconData.length; i++) {
                const otherData = iconData[i];
                const dx = (data.x + data.width / 2) - (otherData.x + otherData.width / 2);
                const dy = (data.y + data.height / 2) - (otherData.y + otherData.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = data.radius + otherData.radius;

                if (distance < minDistance) {
                    const angle = Math.atan2(dy, dx);
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);

                    const vx1 = data.vx * cos + data.vy * sin;
                    const vy1 = data.vy * cos - data.vx * sin;
                    const vx2 = otherData.vx * cos + otherData.vy * sin;
                    const vy2 = otherData.vy * cos - otherData.vx * sin;

                    const finalVx1 = vx2;
                    const finalVy1 = vy1;
                    const finalVx2 = vx1;
                    const finalVy2 = vy2;

                    data.vx = finalVx1 * cos - finalVy1 * sin;
                    data.vy = finalVy1 * cos + finalVx1 * sin;
                    otherData.vx = finalVx2 * cos - finalVy2 * sin;
                    otherData.vy = finalVy2 * cos + finalVx2 * sin;

                    const overlap = minDistance - distance;
                    const separationX = overlap * cos;
                    const separationY = overlap * sin;
                    data.x += separationX / 2;
                    data.y += separationY / 2;
                    otherData.x -= separationX / 2;
                    otherData.y -= separationY / 2;
                }
            }

            data.element.style.transform = `translate(${data.x}px, ${data.y}px)`;
        });

        requestAnimationFrame(update);
    }

    iconData.forEach(data => {
        data.element.style.position = 'absolute';
        data.element.style.left = '0px';
        data.element.style.top = '0px';
        data.element.style.transform = `translate(${data.x}px, ${data.y}px)`;
    });

    setInterval(() => {
        containerRect = phoneContainer.getBoundingClientRect();
    }, 1000);

    update();
});