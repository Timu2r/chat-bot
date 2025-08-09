function toggleService(element) {
				const checkbox = element.querySelector('.checkbox')
				checkbox.classList.toggle('checked')
				updateServiceCount()
			}

			function updateServiceCount() {
				const checkedServices =
					document.querySelectorAll('.checkbox.checked').length
				const serviceCountElement = document.querySelector('.services-count span');
				if (serviceCountElement) {
					serviceCountElement.textContent = checkedServices;
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
    const chatInput = document.getElementById('chatInput');
    const searchButton = document.querySelector('.btn-search');
    const inputContainer = document.querySelector('.input-container'); 
    const dropMenu = document.querySelector('.input-container .drop-menu');

    if (chatInput && inputContainer) {
        chatInput.addEventListener('focus', () => {
            console.log('chatInput focused');
            inputContainer.classList.add('active'); 
            console.log('inputContainer active class added');
        });

        chatInput.addEventListener('blur', () => {
            console.log('chatInput blurred');

            setTimeout(() => {
                inputContainer.classList.remove('active');
                console.log('inputContainer active class removed');
            }, 100);
        });
    }

    if (searchButton && inputContainer) {
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            inputContainer.classList.toggle('active'); 
        });
    }
});
