function toggleService(element) {
	const checkbox = element.querySelector('.checkbox')
	checkbox.classList.toggle('checked')
	updateServiceCount()
}

function updateServiceCount() {
	const checkedServices = document.querySelectorAll('.checkbox.checked').length
	const serviceCountElement = document.querySelector('.services-count span')
	if (serviceCountElement) {
		serviceCountElement.textContent = checkedServices
	}

	const totalPrice = checkedServices * 500
	document.getElementById('totalPrice').textContent = totalPrice + '₽'
}

document.querySelectorAll('button').forEach(button => {
	button.addEventListener('click', function (e) {
		const ripple = document.createElement('span')
		const rect = this.getBoundingClientRect()
		const size = Math.max(rect.width, rect.height)
		const x = e.clientX - rect.left - size / 2
		const y = e.clientY - rect.top - size / 2

		ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `

		this.style.position = 'relative'
		this.style.overflow = 'hidden'
		this.appendChild(ripple)

		setTimeout(() => ripple.remove(), 600)
	})
})

updateServiceCount()

document.addEventListener('DOMContentLoaded', () => {
	const chatInput = document.getElementById('chatInput')
	const searchButton = document.querySelector('.btn-search')
	const inputContainer = document.querySelector('.input-container')
	const dropMenu = document.querySelector('.input-container .drop-menu')

	if (chatInput && inputContainer) {
		chatInput.addEventListener('focus', () => {
			inputContainer.classList.add('active')
		})

		chatInput.addEventListener('blur', () => {
			setTimeout(() => {
				inputContainer.classList.remove('active')
				console.log('inputContainer active class removed')
			}, 100)
		})
	}

	if (searchButton && inputContainer) {
		searchButton.addEventListener('click', event => {
			event.preventDefault()
			inputContainer.classList.toggle('active')
		})
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const centerCircle = document.querySelector('.center-circle')
	const orbitItems = document.querySelectorAll('.orbit-item')
	const orbitDots = document.querySelectorAll('.orbit-dot')

	function updateConnectionLines() {
		const centerRect = centerCircle.getBoundingClientRect()
		const centerX = centerRect.left + centerRect.width / 2
		const centerY = centerRect.top + centerRect.height / 2

		orbitItems.forEach(item => {
			const line = item.querySelector('.connection-line')
			const itemRect = item.getBoundingClientRect()

			const itemX = itemRect.left + itemRect.width / 2
			const itemY = itemRect.top + itemRect.height / 2

			// Вычисляем расстояние между центрами
			const distance = Math.sqrt(
				Math.pow(centerX - itemX, 2) + Math.pow(centerY - itemY, 2)
			)

			// Вычисляем угол
			const angleRad = Math.atan2(centerY - itemY, centerX - itemX)
			const angleDeg = (angleRad * 180) / Math.PI

			// Позиционируем линию от центра элемента к центру круга
			line.style.width = `${distance}px`
			line.style.transform = `rotate(${angleRad}rad)`
			line.style.left = `${itemRect.width / 2}px`
			line.style.top = `${itemRect.height / 2}px`
		})
	}

	// Остановка анимации при наведении на элементы
	orbitItems.forEach(item => {
		item.addEventListener('mouseenter', () => {
			orbitItems.forEach(el => (el.style.animationPlayState = 'paused'))
			orbitDots.forEach(dot => (dot.style.animationPlayState = 'paused'))
		})

		item.addEventListener('mouseleave', () => {
			orbitItems.forEach(el => (el.style.animationPlayState = 'running'))
			orbitDots.forEach(dot => (dot.style.animationPlayState = 'running'))
		})
	})

	// Центр также останавливает анимацию
	centerCircle.addEventListener('mouseenter', () => {
		orbitItems.forEach(el => (el.style.animationPlayState = 'paused'))
		orbitDots.forEach(dot => (dot.style.animationPlayState = 'paused'))
	})

	centerCircle.addEventListener('mouseleave', () => {
		orbitItems.forEach(el => (el.style.animationPlayState = 'running'))
		orbitDots.forEach(dot => (dot.style.animationPlayState = 'running'))
	})

	// Инициализация и постоянное обновление линий
	function animate() {
		updateConnectionLines()
		requestAnimationFrame(animate)
	}

	// Также обновляем при ресайзе
	window.addEventListener('resize', updateConnectionLines)

	// Запуск анимации
	animate()
})

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.site-header__burger-menu');
    const nav = document.querySelector('.site-header__nav');

    if (burgerMenu && nav) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('is-active');
            nav.classList.toggle('is-active');
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
	const burgerMenu = document.querySelector('.site-header__burger-menu')
	const nav = document.querySelector('.site-header__nav')

	if (burgerMenu && nav) {
		burgerMenu.addEventListener('click', () => {
			burgerMenu.classList.toggle('is-active')
			nav.classList.toggle('is-active')
		})
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const centerCircle = document.querySelector('.center-circle')
	const orbitItems = document.querySelectorAll('.orbit-item')
	const orbitDots = document.querySelectorAll('.orbit-dot')

	if (!centerCircle || !orbitItems.length || !orbitDots.length) return

	function updateConnectionLines() {
		const centerRect = centerCircle.getBoundingClientRect()
		const centerX = centerRect.left + centerRect.width / 2
		const centerY = centerRect.top + centerRect.height / 2

		orbitItems.forEach(item => {
			const line = item.querySelector('.connection-line')
			const itemRect = item.getBoundingClientRect()

			const itemX = itemRect.left + itemRect.width / 2
			const itemY = itemRect.top + itemRect.height / 2

			const distance = Math.sqrt(
				Math.pow(centerX - itemX, 2) + Math.pow(centerY - itemY, 2)
			)

			const angleRad = Math.atan2(centerY - itemY, centerX - itemX)

			line.style.width = `${distance}px`
			line.style.transform = `rotate(${angleRad}rad)`
			line.style.left = `${itemRect.width / 2}px`
			line.style.top = `${itemRect.height / 2}px`
		})
	}

	orbitItems.forEach(item => {
		item.addEventListener('mouseenter', () => {
			orbitItems.forEach(el => (el.style.animationPlayState = 'paused'))
			orbitDots.forEach(dot => (dot.style.animationPlayState = 'paused'))
		})

		item.addEventListener('mouseleave', () => {
			orbitItems.forEach(el => (el.style.animationPlayState = 'running'))
			orbitDots.forEach(dot => (dot.style.animationPlayState = 'running'))
		})
	})

	centerCircle.addEventListener('mouseenter', () => {
		orbitItems.forEach(el => (el.style.animationPlayState = 'paused'))
		orbitDots.forEach(dot => (dot.style.animationPlayState = 'paused'))
	})

	centerCircle.addEventListener('mouseleave', () => {
		orbitItems.forEach(el => (el.style.animationPlayState = 'running'))
		orbitDots.forEach(dot => (dot.style.animationPlayState = 'running'))
	})

	function animate() {
		updateConnectionLines()
		requestAnimationFrame(animate)
	}

	window.addEventListener('resize', updateConnectionLines)

	animate()
})

document.addEventListener('DOMContentLoaded', function () {
	const burgerMenu = document.querySelector('.burger-menu')
	const navbarCollapse = document.querySelector('.navbar-collapse')

	burgerMenu.addEventListener('click', function () {
		this.classList.toggle('open')
	})

	// Close mobile menu when clicking on a link
	const navLinks = document.querySelectorAll('.nav-link')
	navLinks.forEach(link => {
		link.addEventListener('click', function () {
			if (window.innerWidth <= 991.98) {
				burgerMenu.classList.remove('open')
				const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse)
				collapseInstance.hide()
			}
		})
	})
})
