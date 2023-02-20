let modal = null
console.log('modal')


const open = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', true)
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-open-modal').addEventListener('click', stopPropagation)

}

const closeModal = function(e) {
    e.preventDefault()
    modal.style.display = none
    modal.setAttribute('aria-hidden', 'true')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-open-modal').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

document.querySelectorAll('.openModal').forEach(a => {
    a.addEventListener('click', open)
})