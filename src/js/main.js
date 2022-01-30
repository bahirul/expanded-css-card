// default selector card
const expandingCard = document.querySelectorAll('.expanding-card');

// selector for active card
const expandingCardActive = document.querySelectorAll('.expanding-card');

window.onload = () => {
    expandingCard.forEach(card => {
        card.addEventListener('click', () => {
            // remove prev active class
            expandingCardActive.forEach(removeActive => {
                removeActive.classList.remove('active');
            })

            // add active class
            card.classList.add('active');
        })
    });
}