// Шаблон карточки игры
class GameCard {
    constructor(data) {
        this.title = data.title || 'Название игры';
        this.cover = data.cover || 'https://via.placeholder.com/460x215?text=Обложка+игры';
        this.genres = data.genres || ['Жанр 1', 'Жанр 2', 'Жанр 3'];
        this.rating = data.rating || 0; // от 1 до 5
        this.completed = data.completed !== undefined ? data.completed : false;
        this.steamUrl = data.steamUrl || null;
    }

    // Создание HTML разметки карточки
    createCardHTML() {
        const genresHTML = this.genres.map(genre => 
            `<span class="genre-tag">${genre}</span>`
        ).join('');

        const starsHTML = this.createStarsHTML();

        const statusClass = this.completed ? 'status-badge--completed' : 'status-badge--not-completed';
        const statusText = this.completed ? 'Пройдено' : 'Не пройдено';

        const steamBadgeHTML = this.steamUrl 
            ? `<a href="${this.steamUrl}" target="_blank" rel="noopener noreferrer" class="steam-badge">Steam</a>`
            : '';

        return `
            <div class="game-card">
                <h2 class="game-card__title">${this.title}</h2>
                <div class="game-head">
                    <img src="${this.cover}" alt="${this.title}" class="game-card__cover" onerror="this.src='https://via.placeholder.com/460x215?text=Обложка+не+найдена'">
                </div>
                <div class="game-card__genres">
                    ${genresHTML}
                </div>
                <div class="game-card__rating">
                    <span class="rating-label">Оценка:</span>
                    <div class="rating-stars">
                        ${starsHTML}
                    </div>
                </div>
                <div class="game-card__status">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    ${steamBadgeHTML}
                </div>
            </div>
        `;
    }

    // Создание HTML для звезд рейтинга
    createStarsHTML() {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= this.rating;
            const starClass = isFilled ? 'star' : 'star star--empty';
            starsHTML += `
                <svg class="${starClass}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            `;
        }
        return starsHTML;
    }

    // Добавление карточки в контейнер
    render(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (container) {
            container.insertAdjacentHTML('beforeend', this.createCardHTML());
        }
    }
}

// Функция для создания и добавления карточки игры
function addGameCard(data) {
    const gameCard = new GameCard(data);
    const gamesGrid = document.getElementById('gamesGrid');
    gameCard.render(gamesGrid);
    return gameCard;
}

// Пример использования - можно удалить или закомментировать
document.addEventListener('DOMContentLoaded', function() {
    // Примеры карточек игр
    const exampleGames = [
        {
            title: 'Another Crab\'s Treasure',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1887840/header.jpg?t=1748555967',
            genres: ['Souls-like', '3D Platformer', 'Funny', 'Action RPG', 'Cartoony'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/1887840/Another_Crabs_Treasure/'
        },
        {
            title: 'Hades 2',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1765831644',
            genres: ['Action', 'Roguelike', 'Roguelite', 'Hack and Slash', 'Mythology'],
            rating: 4,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1145350/Hades_2/'
        },
        {
            title: 'Cairn',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1588550/header.jpg?t=1769725647',
            genres: ['Stylized', 'Indie', 'Adventure', 'Exploration', 'Atmospheric'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1588550/Cairn/'
        },
        {
            title: 'Scarlet Maiden',
            cover: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1968840/header.jpg?t=1763636798',
            genres: ['Sexual Content', 'Hentai', 'Pixel', 'Graphics', 'Nudity'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1968840/Scarlet_Maiden/'
        },
        {
            title: 'Lies of P',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1627720/header.jpg?t=1764565054',
            genres: ['Souls-like', 'Dark Fantasy', 'Action', 'Singleplayer', 'Story Rich'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1627720/Lies_of_P/'
        },
        {
            title: 'The Exit 8',
            cover: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2653790/header.jpg?t=1756464433',
            genres: ['Exploration', 'Immersive Sim', 'Puzzle', 'Underground', '3D'],
            rating: 4,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2653790/The_Exit_8/'
        },
        {
            title: 'The Surge',
            cover: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/378540/header.jpg?t=1727864911',
            genres: ['Souls-like', 'Action RPG', 'Sci-fi', 'Third Person', 'Difficult'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/378540/The_Surge/'
        },
    ];

    // Подсчёт пройденных игр и общего количества
    const totalGames = exampleGames.length;
    const completedGames = exampleGames.filter(game => game.completed).length;

    const gamesCounterElement = document.getElementById('gamesCounter');
    if (gamesCounterElement) {
        gamesCounterElement.textContent = `Пройдено: ${completedGames} / ${totalGames}`;
        gamesCounterElement.title = `Пройдено игр: ${completedGames} из ${totalGames}`;
    }

    // Добавление примеров карточек (можно удалить)
    exampleGames.forEach(game => addGameCard(game));
});

