function moveCarousel(button, direction) {
    // Encontra o container dos cards relativo à seta clicada
    const wrapper = button.parentElement;
    const grid = wrapper.querySelector('.cards-grid');
    
    // Calcula a largura de um card para rolar
    const cardWidth = grid.querySelector('.card').offsetWidth + 15; // 15px do gap
    
    // Rola para esquerda ou direita
    grid.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}