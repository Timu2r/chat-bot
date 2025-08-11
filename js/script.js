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
