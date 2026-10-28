// Шаблон карточки игры
class GameCard {
    constructor(data) {
        this.title = data.title || 'Название игры';
        this.cover = data.cover || 'https://via.placeholder.com/460x215?text=Обложка+игры';
        this.genres = data.genres || ['Жанр 1', 'Жанр 2', 'Жанр 3'];
        this.rating = data.rating || 0; // от 1 до 5
        this.completed = data.completed !== undefined ? data.completed : false;
        this.steamUrl = data.steamUrl || null;
        this.favorite = Boolean(data.favorite);
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

        const cardClass = this.favorite ? 'game-card game-card--favorite' : 'game-card';
        const favoriteBadgeHTML = this.favorite
            ? `<span class="game-card__featured-badge" aria-label="Топ года"><span class="game-card__featured-badge-text">Топ года</span></span>`
            : '';

        return `
            <div class="${cardClass}">
                <h2 class="game-card__title">${this.title}</h2>
                <div class="game-card__cover-wrap">
                    ${favoriteBadgeHTML}
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
            cover: 'imgs/another_crab.jpg',
            genres: ['Souls-like', '3D Platformer', 'Funny', 'Action RPG', 'Cartoony'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/1887840/Another_Crabs_Treasure/'
        },
        {
            title: 'Hades 2',
            cover: 'imgs/hades_2.jpg',
            genres: ['Action', 'Roguelike', 'Roguelite', 'Hack and Slash', 'Mythology'],
            rating: 4,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1145350/Hades_2/'
        },
        {
            title: 'Cairn',
            cover: 'imgs/cairn.jpg',
            genres: ['Stylized', 'Indie', 'Adventure', 'Exploration', 'Atmospheric'],
            rating: 5,
            completed: true,
            favorite: true,
            steamUrl: 'https://store.steampowered.com/app/1588550/Cairn/'
        },
        {
            title: 'Scarlet Maiden',
            cover: 'imgs/scarlet_maiden.jpg',
            genres: ['Sexual Content', 'Hentai', 'Pixel', 'Graphics', 'Nudity'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1968840/Scarlet_Maiden/'
        },
        {
            title: 'Lies of P',
            cover: 'imgs/lies_p.jpg',
            genres: ['Souls-like', 'Dark Fantasy', 'Action', 'Singleplayer', 'Story Rich'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1627720/Lies_of_P/'
        },
        {
            title: 'The Exit 8',
            cover: 'imgs/exit_8.jpg',
            genres: ['Exploration', 'Immersive Sim', 'Puzzle', 'Underground', '3D'],
            rating: 4,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2653790/The_Exit_8/'
        },
        {
            title: 'The Surge',
            cover: 'imgs/surge.jpg',
            genres: ['Souls-like', 'Action RPG', 'Sci-fi', 'Third Person', 'Difficult'],
            rating: 1,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/378540/The_Surge/'
        },
        {
            title: 'MIO: Memories in Orbit',
            cover: 'imgs/mio.jpg',
            genres: ['Souls-like', 'Action RPG', 'Sci-fi', 'Third Person', 'Difficult'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1672810/MIO_Memories_in_Orbit/'
        },
        {
            title: 'Never Grave: The Witch and The Curse',
            cover: 'imgs/never_grave.jpg',
            genres: ['Metroidvania', 'Action Roguelike', 'Roguevania', 'Platformer'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/2395770/Never_Grave_The_Witch_and_The_Curse/'
        },
        {
            title: 'Moonlighter',
            cover: 'imgs/moonlighter.jpg',
            genres: ['Hack and Slash', 'Pixel Graphics', 'Dungeon Crawler', 'RPG'],
            rating: 3,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/606150/Moonlighter/'
        },
        {
            title: 'Resident Evil Requiem',
            cover: 'imgs/re_requiem.jpg',
            genres: ['Survival Horror', 'Zombies', 'Horror', 'Third-Person Shooter'],
            rating: 5,
            completed: true,
            favorite: true,
            steamUrl: 'https://store.steampowered.com/app/3764200/Resident_Evil_Requiem/'
        },
        {
            title: `Thank Goodness You're Here!`,
            cover: 'imgs/thank_goodness.jpg',
            genres: ['Adventure', 'Comedy', 'Funny', 'Hand-drawn', 'Exploration'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2366980/Thank_Goodness_Youre_Here/'
        },
        {
            title: 'Banishers: Ghosts of New Eden',
            cover: 'imgs/banishers.jpg',
            genres: ['Narration', 'Third Person', 'Lore-Rich', 'Emotional'],
            rating: 4,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/1493640/Banishers_Ghosts_of_New_Eden/'
        },
        {
            title: 'Echoes of the End: Enhanced Edition',
            cover: 'imgs/echoes_end.jpg',
            genres: ['Action-Adventure', 'Magic', 'Singleplayer', 'Third Person'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2821610/Echoes_of_the_End_Enhanced_Edition/'
        },
        {
            title: 'Roadcraft',
            cover: 'imgs/roadcraft.jpg',
            genres: [
                'Simulation',
                'Building',
                'Driving',
                'Physics',
                'Online Co-Op'
            ],
            rating: 4,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/2104890/RoadCraft/'
        },
        {
            title: 'Ghost of Yotei',
            cover: 'imgs/yotei.jpg',
            genres: [
                'Open World',
                'Action',
                'Story Rich',
                'Singleplayer',
                'Adventure'
            ],
            rating: 5,
            completed: true,
            favorite: true,
            // steamUrl: 'https://store.steampowered.com/app/2104890/RoadCraft/'
        },
        {
            title: 'Gun',
            cover: 'imgs/gun.jpg',
            genres: [
                'Western',
                'Action',
                'Open World',
                'Third-Person Shooter',
                'Gore'
            ],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2610/GUN/'
        },
        {
            title: 'Samson',
            cover: 'imgs/samson.jpg',
            genres: [
                'Action-Adventure',
                'Racing',
                'Driving',
            ],
            rating: 1,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/3634520/Samson/'
        },
        {
            title: 'Lucky Tower',
            cover: 'imgs/lucky_tower.jpg',
            genres: [
                'Action Roguelike',
                'Dungeon Crawler',
                'Procedural Generation'
            ],
            rating: 5,
            completed: true,
            favorite: true,
            steamUrl: 'https://store.steampowered.com/app/1700270/Lucky_Tower_Ultimate/'
        },
        {
            title: 'Superliminal',
            cover: 'imgs/superliminal.jpg',
            genres: [
                'Puzzle',
                'First-Person',
                'Surreal',
                'Psychological',
                'Physics'
            ],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1049410/Superliminal/'
        },
        {
            title: 'Alice: Madness Returns',
            cover: 'imgs/alice.jpg',
            genres: [
                'Dark Fantasy',
                '3D Platformer',
                'Female Protagonist',
                'Horror'
            ],
            rating: 4,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/19680/Alice_Madness_Returns/'
        },
        {
            title: 'JUMP KING QUEST',
            cover: 'imgs/jump_king_quest.jpg',
            genres: ['Exploration', 'Precision', 'Platformer', 'Souls-like', '2D Platformer'],
            rating: 3,
            completed: false,
            favorite: false,
            steamUrl: 'https://store.steampowered.com/app/2317640/JUMP_KING_QUEST/'
        },
        {
            title: 'Neverness to Everness',
            cover: 'imgs/neverness.jpg',
            genres: [
                'Action RPG',
                'Gacha',
                'Slasher',  
                'Singleplayer',
                'Open World',
            ],
            rating: 3,
            completed: false,
            // steamUrl: 'https://store.steampowered.com/app/19680/Alice_Madness_Returns/'
        },
        {
            title: 'Captain Quazar',
            cover: 'imgs/captain_quazar.jpg',
            genres: [
                'Third-person shooter',
                'Action-Adventure',
                'Parody',
            ],
            rating: 2,
            completed: false,
            // steamUrl: 'https://store.steampowered.com/app/19680/Alice_Madness_Returns/'
        },
        {
            title: 'Gex',
            cover: 'imgs/gex.jpg',
            genres: [
                '3D Platformer',
                '1990\'s',
                'Parody',
                'Comedy',
                'Funny',
                '2D',
            ],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/3183970/GEX_Trilogy/'
        },
        {
            title: 'Nine Souls',
            cover: 'imgs/nine_sols.jpg',
            genres: [
                'Metroidvania',
                'Souls-like',
                'Difficult',
                '2D',
                'Action',
                'Indie',
            ],
            rating: 5,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/1809540/Nine_Sols/'
        },
        {
            title: 'Enotria: The Last Song',
            cover: 'imgs/enotria.jpg',
            genres: [
                'Souls-like',
                'RPG',
                'Difficult',
                'Singleplayer',
                'Atmospheric',
            ],
            rating: 3,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/2102450/Enotria_The_Last_Song/'
        },
        {
            title: '007 First Light',
            cover: 'imgs/first_light.jpg',
            genres: [
                'Singleplayer',
                'Action',
                'Stealth',
                'Action-Adventure',
                'Adventure',
            ],
            rating: 5,
            completed: true,
            favorite: true,
            steamUrl: 'https://store.steampowered.com/app/3768760/007_First_Light/'
        },
        {
            title: 'The Surge 2',
            cover: 'imgs/surge_2.jpg',
            genres: [
                'Souls-like',
                'RPG',
                'Action',
                'Open World',
                'Sci-fi',
                'Violent',
            ],
            rating: 2,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/644830/The_Surge_2/'
        },
        {
            title: 'Pratfall',
            cover: 'imgs/pratfall.jpg',
            genres: [
                'Multiplayer', 'Online', 'Co-Op', 'Comedy', 'Physics'
            ],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/4244510/Pratfall/'
        },
        {
            title: 'Dave the Diver',
            cover: 'imgs/dave_diver.jpg',
            genres: [
                'Pixel Graphics',
                'Management',
                'Casual',
                'Adventure',
                'Fishing',
            ],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1868140/DAVE_THE_DIVER/'
        },
        {
            title: 'Mandragora: Whispers of the Witch Tree',
            cover: 'imgs/mandragora.jpg',
            genres: [
                'Violent',
                'Souls-like',
                'Action RPG',
                'Metroidvania',
                '2.5D',
            ],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1721060/Mandragora_Whispers_of_the_Witch_Tree/?l=russian'
        },
        {
            title: 'Resident Evil 3',
            cover: 'imgs/resident_evil_3.jpg',
            genres: [
                'Action',
                'Zombies',
                'Female Protagonist',
                'Horror',
                'Multiplayer',
            ],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/952060/Resident_Evil_3/'
        },
        {
            title: 'La-Mulana',
            cover: 'imgs/lamulana.jpg',
            genres: [
                'Souls-like',
                'RPG',
                'Action',
                'Open World',
                'Sci-fi',
                'Violent',
            ],
            rating: 4,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/230700/LaMulana/'
        },
        {
            title: 'Blades of Fire',
            cover: 'imgs/blades_of_fire.jpg',
            genres: ['Action', 'Adventure', 'Dark Fantasy', 'Singleplayer', 'Souls-like'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/2091020/Blades_of_Fire/'
        },
        {
            title: 'Wartales',
            cover: 'imgs/wartales.jpg',
            genres: ['Tactical RPG', 'Open World', 'Turn-Based Tactics', 'RPG', 'Strategy'],
            rating: 5,
            completed: false,
            favorite: true,
            steamUrl: 'https://store.steampowered.com/app/1527950/Wartales/'
        },
        {
            title: 'DARK SOULS™ III',
            cover: 'imgs/dark_souls.jpg',
            genres: ['Souls-like', 'Dark Fantasy', 'Difficult', 'Action RPG', 'Atmospheric'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/374320/DARK_SOULS_III/'
        },
        {
            title: 'Mortal Shell II',
            cover: 'imgs/mortal_shell.jpg',
            genres: ['Souls-like', 'Dark Fantasy', 'Action RPG', 'Singleplayer', 'Open World'],
            rating: 4,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2584270/Mortal_Shell_II/'
        },
        {
            title: 'MILF\'s Plaza',
            cover: 'imgs/milf_plaza.jpg',
            genres: ['Adventure', 'Casual', 'RPG', 'Sexual Content', 'Nudity'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2706300/MILFs_Plaza/'
        },
        {
            title: 'Barotrauma',
            cover: 'imgs/barotrauma.jpg',
            genres: ['Online Co-Op', 'Survival Horror', '2D', 'Space', 'Submarine'],
            rating: 4,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/602960/Barotrauma/'
        },
        {
            title: 'theHunter: Call of the Wild™',
            cover: 'imgs/hunter.jpg',
            genres: ['Hunting', 'Open World', 'Simulation', 'Multiplayer', 'Atmospheric'],
            rating: 4,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/518790/theHunter_Call_of_the_Wild/'
        },
        {
            title: 'The Life and Suffering of Sir Brante',
            cover: 'imgs/sir_brante.jpg',
            genres: ['Choices Matter', 'Story Rich', 'RPG', 'Interactive Fiction', 'Choose Your Own Adventure'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/1272160/The_Life_and_Suffering_of_Sir_Brante/'
        },
        {
            title: 'Crimson Desert',
            cover: 'imgs/crimson_desert.jpg',
            genres: ['Open World', 'Action RPG', 'Adventure', 'Singleplayer', 'Action'],
            rating: 4,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/3321460/Crimson_Desert_Enhanced/'
        },
        {
            title: 'How to Fish',
            cover: 'imgs/htf.jpg',
            genres: ['Multiplayer', 'Online Co-Op', 'Co-op', 'Indie', 'Action'],
            rating: 1,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/4001890/How_to_Fish/'
        },
        {
            title: 'NINJA GAIDEN: Ragebound',
            cover: 'imgs/ragebound.jpg',
            genres: ['Action', 'Ninja', 'Platformer', '2D Platformer', 'Indie'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/2542120/NINJA_GAIDEN_Ragebound/'
        },
        {
            title: 'Well Dweller',
            cover: 'imgs/well_dweller.jpg',
            genres: ['Metroidvania', 'Dark Fantasy', 'Action-Adventure', 'Horror', 'Action'],
            rating: 5,
            completed: true,
            favorite: true,
            steamUrl: 'https://store.steampowered.com/app/3699590/Well_Dweller/'
        },
        {
            title: 'Hell is Us',
            cover: 'imgs/hell_is_us.jpg',
            genres: ['Action-Adventure', 'Exploration', 'Third Person', 'Action RPG', 'Souls-like'],
            rating: 3,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/1620730/Hell_is_Us/'
        },
        {
            title: 'Tom Clancy\'s Ghost Recon® Wildlands',
            cover: 'imgs/tcgr_wildlands.jpg',
            genres: ['Open World', 'Shooter', 'Action', 'Co-op', 'Tactical'],
            rating: 1,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/460930/Tom_Clancys_Ghost_Recon_Wildlands/'
        },
        {
            title: 'Street Fighter™ 6',
            cover: 'imgs/street_fighter.jpg',
            genres: ['Fighting', '2D Fighter', 'Action', 'Competitive', '3D Fighter'],
            rating: 5,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/1364780/Street_Fighter_6/'
        },
        {
            title: 'Inari!',
            cover: 'imgs/inari.jpg',
            genres: ['Sexual Content', 'Hentai', 'Nudity', 'Dating Sim', 'Story Rich'],
            rating: 3,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/2639100'
        },
        {
            title: 'Dead Cells',
            cover: 'imgs/dead_cells.jpg',
            genres: ['Adventure', 'Roguelike', 'Metroidvania', 'Action Roguelike', '2D'],
            rating: 5,
            completed: true,
            steamUrl: 'https://store.steampowered.com/app/588650/Dead_Cells/'
        },
        {
            title: 'BOMBANANA!',
            cover: 'imgs/bombanana.jpg',
            genres: ['Casual', 'Indie', 'Multiplayer', 'Co-op', 'Funny'],
            rating: 2,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/4656000/BOMBANANA/'
        },
        {
            title: 'Marvel\'s Wolverine',
            cover: 'imgs/wolverine.jpg',
            genres: ['Action', 'Superhero', 'Third Person', 'Singleplayer', 'Hack and Slash'],
            rating: 3,
            completed: true,
            steamUrl: ''
        },
        {
            title: 'Mewgenics',
            cover: 'imgs/mewgenics.jpg',
            genres: ['Turn-Based Tactics', 'Roguelike Deckbuilder', 'Tactical RPG', 'Cats', 'Roguelite'],
            rating: 4,
            completed: false,
            steamUrl: 'https://store.steampowered.com/app/686060/Mewgenics/'
        }
    ];

    const totalGames = exampleGames.length;
    const completedGames = exampleGames.filter(game => game.completed).length;

    const gamesCounterElement = document.getElementById('gamesCounter');
    if (gamesCounterElement) {
        gamesCounterElement.textContent = `Пройдено: ${completedGames} / ${totalGames}`;
        gamesCounterElement.title = `Пройдено игр: ${completedGames} из ${totalGames}`;
    }

    exampleGames.forEach(game => addGameCard(game));
});

