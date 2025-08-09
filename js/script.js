function toggleService(element) {
				const checkbox = element.querySelector('.checkbox')
				checkbox.classList.toggle('checked')
				updateServiceCount()
			}

			function updateServiceCount() {
				const checkedServices =
					document.querySelectorAll('.checkbox.checked').length
				document.getElementById('serviceCount').textContent = checkedServices

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