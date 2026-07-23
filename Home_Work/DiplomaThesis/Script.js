document.addEventListener('DOMContentLoaded', () => {
	function showNotice(message) {
		const overlay = document.createElement('div')
		overlay.className = 'notice-overlay'
		overlay.innerHTML = `
    <div class="notice-card" role="alertdialog" aria-modal="true">
        <p class="notice-card__text">${message}</p>
        <button class="btn btn--yellow notice-card__btn">ОК</button>

    </div>
    `
		document.body.appendChild(overlay)
		document.body.style.overflow = 'hidden'

		requestAnimationFrame(() => overlay.classList.add('is-visible'))

		function close() {
			overlay.classList.remove('is-visible')
			document.body.style.overflow = ''
			setTimeout(() => overlay.remove(), 200)
		}

		overlay.querySelector('.notice-card__btn').addEventListener('click', close)
		overlay.addEventListener('click', e => {
			if (e.target === overlay) close()
		})
		document.addEventListener('keydown', function onEsc(e) {
			if (e.key === 'Escape') {
				close()
				document.removeEventListener('keydown', onEsc)
			}
		})
	}

	const navToggle = document.getElementById('navToggle')
	const navEl = document.querySelector('.nav')
	if (navToggle && navEl) {
		navToggle.addEventListener('click', () => {
			const isOpen = navEl.classList.toggle('is-open')
			navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
		})
		navEl.querySelectorAll('.nav__list a').forEach(link => {
			link.addEventListener('click', () => {
				navEl.classList.remove('is-open')
				navToggle.setAttribute('aria-expanded', 'false')
			})
		})
	}

	const daysEl = document.getElementById('cd-days')
	const hoursEl = document.getElementById('cd-hours')
	const minEl = document.getElementById('cd-min')
	const secEl = document.getElementById('cd-sec')

	if (daysEl) {
		const target = new Date()
		target.setDate(target.getDate() + 40)
		target.setHours(target.getHours() + 4)
		target.setMinutes(target.getMinutes() + 2)
		target.setSeconds(target.getSeconds() + 38)

		function pad(n) {
			return String(n).padStart(2, '0')
		}

		function tick() {
			const now = new Date()
			let diff = Math.max(0, target - now)

			const d = Math.floor(diff / (1000 * 60 * 60 * 24))
			diff -= d * (1000 * 60 * 60 * 24)
			const h = Math.floor(diff / (1000 * 60 * 60))
			diff -= h * (1000 * 60 * 60)
			const m = Math.floor(diff / (1000 * 60))
			diff -= m * (1000 * 60)
			const s = Math.floor(diff / 1000)

			daysEl.textContent = pad(d)
			hoursEl.textContent = pad(h)
			minEl.textContent = pad(m)
			secEl.textContent = pad(s)
		}

		tick()
		setInterval(tick, 1000)
	}

	const filters = document.querySelectorAll('.filter')
	filters.forEach(btn => {
		btn.addEventListener('click', () => {
			filters.forEach(b => b.classList.remove('is-active'))
			btn.classList.add('is-active')
		})
	})

	document.querySelectorAll('.country-toggle').forEach(btn => {
		btn.addEventListener('click', () => {
			const details = btn.nextElementSibling
			const isDetails = details && details.classList.contains('country-details')

			document
				.querySelectorAll('.country-toggle')
				.forEach(b => b.classList.remove('is-open'))
			document
				.querySelectorAll('.country-details')
				.forEach(d => (d.style.display = 'none'))

			if (isDetails) {
				btn.classList.add('is-open')
				details.style.display = 'block'
			}
		})
	})

	const grid = document.querySelector('.reviews__grid')
	const prev = document.getElementById('reviewsPrev')
	const next = document.getElementById('reviewsNext')
	if (grid && prev && next) {
		const cards = Array.from(grid.children)
		let index = 0
		function render() {
			cards.forEach(
				(c, i) => (c.style.order = (i - index + cards.length) % cards.length),
			)
		}
		prev.addEventListener('click', () => {
			index = (index - 1 + cards.length) % cards.length
			render()
		})
		next.addEventListener('click', () => {
			index = (index + 1) % cards.length
			render()
		})
	}

	const mainImg = document.querySelector('.product__main-img')
	const thumbs = document.querySelectorAll('.product__thumb')
	if (mainImg && thumbs.length) {
		thumbs.forEach(thumb => {
			thumb.addEventListener('click', () => {
				const tmp = mainImg.src
				mainImg.src = thumb.src
				thumb.src = tmp
			})
		})
	}

	const otherGrid = document.querySelector('.other-projects .projects__grid')
	const otherPrev = document.getElementById('otherPrev')
	const otherNext = document.getElementById('otherNext')
	if (otherGrid && otherPrev && otherNext) {
		const cards = Array.from(otherGrid.children)
		let idx = 0
		function renderOther() {
			cards.forEach(
				(c, i) => (c.style.order = (i - idx + cards.length) % cards.length),
			)
		}
		otherPrev.addEventListener('click', () => {
			idx = (idx - 1 + cards.length) % cards.length
			renderOther()
		})
		otherNext.addEventListener('click', () => {
			idx = (idx + 1) % cards.length
			renderOther()
		})
	}

	const calcBtn = document.querySelector('.product__calc-btn')
	if (calcBtn) {
		calcBtn.addEventListener('click', () => {
			showNotice('Форма расчета стоимости откроется здесь.')
		})
	}

	const teamGrid = document.querySelector('.team__grid')
	const teamPrev = document.getElementById('teamPrev')
	const teamNext = document.getElementById('teamNext')
	if (teamGrid && teamPrev && teamNext) {
		const members = Array.from(teamGrid.children)
		let tIdx = 0
		function renderTeam() {
			members.forEach(
				(c, i) =>
					(c.style.order = (i - tIdx + members.length) % members.length),
			)
		}
		teamPrev.addEventListener('click', () => {
			tIdx = (tIdx - 1 + members.length) % members.length
			renderTeam()
		})
		teamNext.addEventListener('click', () => {
			tIdx = (tIdx + 1) % members.length
			renderTeam()
		})
	}

	const appSteps = document.querySelectorAll('.application__step')
	if (appSteps.length) {
		function goToStep(n) {
			appSteps.forEach(step => {
				const isTarget = Number(step.dataset.step) === n
				step.hidden = !isTarget
				step.classList.toggle('is-active', isTarget)
			})
		}

		appSteps.forEach(step => {
			const stepNum = Number(step.dataset.step)

			step.addEventListener('submit', e => {
				e.preventDefault()
				if (stepNum < appSteps.length) {
					goToStep(stepNum + 1)
				} else {
					showNotice(
						'Спасибо! Ваша заявка отправлена, мы свяжемся с вами в ближайшее время.',
					)
					goToStep(1)
					appSteps.forEach(s => s.reset())
				}
			})

			const backBtn = step.querySelector('.application__back')
			if (backBtn) {
				backBtn.addEventListener('click', () => goToStep(stepNum - 1))
			}
		})
	}

	document.querySelectorAll('form:not(.application__step)').forEach(form => {
		form.addEventListener('submit', e => {
			e.preventDefault()
			showNotice('Спасибо! Мы свяжемся с вами в ближайшее время.')
			form.reset()
		})
	})
})
