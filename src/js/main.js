const expandingCard = document.querySelectorAll('.expanding-card');
const expandingCardActive = document.querySelectorAll('.expanding-card');

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