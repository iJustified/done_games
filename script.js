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

const THEME_STORAGE_KEY = 'theme';

function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) { /* ignore */ }
    syncThemeToggle();
}

function syncThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const dark = getTheme() === 'dark';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
}

function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
    syncThemeToggle();
}

// Пример использования - можно удалить или закомментировать
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();

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
            rating: 1,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/378540/The_Surge/'
        },
        {
            title: 'MIO: Memories in Orbit',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672810/header.jpg?t=1770197936',
            genres: ['Souls-like', 'Action RPG', 'Sci-fi', 'Third Person', 'Difficult'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1672810/MIO_Memories_in_Orbit/'
        },
        {
            title: 'Never Grave: The Witch and The Curse',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2395770/0b7d199473c412f296170158b805aeb50451cbd4/header.jpg?t=1773129554',
            genres: ['Metroidvania', 'Action Roguelike', 'Roguevania', 'Platformer'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/2395770/Never_Grave_The_Witch_and_The_Curse/'
        },
        {
            title: 'Moonlighter',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/606150/b6b0789b397ed98c8c5871dd2f99945a8fea0332/header.jpg?t=1773240026',
            genres: ['Hack and Slash', 'Pixel Graphics', 'Dungeon Crawler', 'RPG'],
            rating: 3,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/606150/Moonlighter/'
        },
        {
            title: 'Resident Evil Requiem',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3764200/ce5437442768e38eb575f205ab9397d0264017b0/header.jpg?t=1772587704',
            genres: ['Survival Horror', 'Zombies', 'Horror', 'Third-Person Shooter'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/3764200/Resident_Evil_Requiem/'
        },
        {
            title: `Thank Goodness You're Here!`,
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2366980/header.jpg?t=1733154706',
            genres: ['Adventure', 'Comedy', 'Funny', 'Hand-drawn', 'Exploration'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2366980/Thank_Goodness_Youre_Here/'
        },
        {
            title: 'Banishers: Ghosts of New Eden',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1493640/header.jpg?t=1763044792',
            genres: ['Narration', 'Third Person', 'Lore-Rich', 'Emotional', 'Exploration'],
            rating: 4,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/1493640/Banishers_Ghosts_of_New_Eden/'
        },
        {
            title: 'Echoes of the End: Enhanced Edition',
            cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2821610/229f5bb97d16bdf1af96ac5436f70aa4215ed69d/header.jpg?t=1771578630',
            genres: ['Action-Adventure', 'Magic', 'Singleplayer', 'Third Person'],
            rating: 3,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/2821610/Echoes_of_the_End_Enhanced_Edition/'
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

