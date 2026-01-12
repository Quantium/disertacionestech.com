// Data Loader - Carga y renderiza contenido desde archivos JSON

class DataLoader {
    constructor() {
        this.episodes = [];
        this.testimonials = [];
        this.platforms = [];
    }

    // Cargar todos los datos
    async loadAll() {
        try {
            const [episodesData, testimonialsData, platformsData] = await Promise.all([
                fetch('./data/episodes.json').then(res => res.json()),
                fetch('./data/testimonials.json').then(res => res.json()),
                fetch('./data/platforms.json').then(res => res.json())
            ]);

            this.episodes = episodesData.episodes;
            this.testimonials = testimonialsData.testimonials;
            this.platforms = platformsData.platforms;
            this.rssFeed = platformsData.rssFeed;

            // Renderizar contenido
            this.renderCarousel();
            this.renderEpisodes();
            this.renderTestimonials();
            this.renderPlatforms();
            this.renderRSSFeed();
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    }

    // Renderizar carousel de episodios
    renderCarousel() {
        const carouselWrapper = document.querySelector('.carousel .swiper-wrapper');
        if (!carouselWrapper) return;

        carouselWrapper.innerHTML = this.episodes.map((episode, index) => `
            <div class="swiper-slide h-auto flex flex-col max-w-[446px] group">
                <a href="${episode.link}?episode=${episode.id}">
                    <div class="group-odd:rotate-1 group-even:-rotate-1">
                        <div class="absolute inset-0 -z-10">
                            <img class="w-full h-full object-cover rounded-3xl" src="${episode.carouselImage}" width="446" height="200" alt="${episode.title}" />
                        </div>
                        <div class="p-5 pb-14">
                            <div class="font-hkgrotesk font-extrabold text-white text-xl leading-tight mb-1">${episode.title}</div>
                            <div class="font-hkgrotesk text-white font-medium text-sm opacity-80 mb-4">Disertaciones Tecnológicas · ${episode.date} · Episodio ${episode.episodeNumber}</div>
                            <img src="./images/play.svg" width="48" height="48" alt="Play" aria-hidden="true" />
                        </div>
                    </div>
                </a>
            </div>
        `).join('');

        // Reinicializar Swiper después de un pequeño delay para asegurar que el DOM esté actualizado
        setTimeout(() => {
            if (window.Swiper && document.querySelector('.carousel')) {
                // Destruir instancia anterior si existe
                const existingCarousel = document.querySelector('.carousel').swiper;
                if (existingCarousel) {
                    existingCarousel.destroy(true, true);
                }
                
                // Crear nueva instancia
                new Swiper('.carousel', {
                    slidesPerView: 'auto',
                    grabCursor: true,
                    loop: false,
                    centeredSlides: false,
                    initialSlide: 0,
                    spaceBetween: 24,
                    watchSlidesProgress: true,
                    navigation: {
                        nextEl: '.carousel-next',
                        prevEl: '.carousel-prev',
                    },
                });
            }
        }, 100);
    }

    // Renderizar lista de episodios
    renderEpisodes() {
        const episodesContainer = document.getElementById('episodes-list');
        if (!episodesContainer) return;

        episodesContainer.innerHTML = this.episodes.map(episode => `
            <div class="sm:flex items-center p-5 border-b border-slate-700" x-show="['0', '${episode.categoryId}'].includes(category)">
                <div class="flex items-start mb-4 sm:mb-0">
                    <img class="shrink-0 rounded-sm ml-5 sm:ml-0 sm:mr-5 order-1 sm:order-none" src="${episode.image}" width="88" height="88" alt="${episode.title}" />
                    <div>
                        <h3 class="font-hkgrotesk font-extrabold text-lg mb-1">
                            <a class="text-slate-100 hover:text-blue-500 transition duration-150 ease-in-out" href="${episode.link}?episode=${episode.id}">${episode.title}</a>
                        </h3>
                        <div class="font-hkgrotesk font-medium text-sm text-slate-400 mb-1">
                            <a class="text-blue-500 hover:underline" href="#0">${episode.category}</a> <span class="text-slate-600">·</span> ${episode.date} <span class="text-slate-600">·</span> Episodio ${episode.episodeNumber}
                        </div>
                        <div class="text-sm text-slate-400">
                            ${episode.description}
                        </div>
                    </div>
                </div>
                <div class="shrink-0 sm:ml-5">
                    <a href="${episode.link}?episode=${episode.id}" aria-label="Escuchar">
                        <img src="./images/play-02.svg" width="40" height="40" alt="Play" aria-hidden="true" />
                    </a>
                </div>
            </div>
        `).join('');

        // Notificar a Alpine.js sobre nuevos elementos
        if (window.Alpine) {
            window.Alpine.initTree(episodesContainer);
        }
    }

    // Renderizar testimonios
    renderTestimonials() {
        const testimonialsContainer = document.getElementById('testimonials-list');
        if (!testimonialsContainer) return;

        testimonialsContainer.innerHTML = this.testimonials.map((testimonial, index) => `
            <div class="p-5 bg-slate-800 rounded-3xl ${index % 2 === 0 ? 'odd:rotate-1' : 'even:-rotate-1'}">
                <div class="flex items-start mb-4">
                    <img class="shrink-0 rounded-full mr-3" src="${testimonial.image}" width="48" height="48" alt="${testimonial.name}">
                    <div>
                        <div class="font-hkgrotesk font-extrabold text-slate-100">${testimonial.name}</div>
                        <a class="font-hkgrotesk font-medium text-blue-500 hover:underline" href="#0">${testimonial.nickname}</a>
                    </div>
                </div>
                <div class="text-slate-400">
                    "${testimonial.comment}"
                </div>
            </div>
        `).join('');
    }

    // Renderizar plataformas de suscripción
    renderPlatforms() {
        const platformsContainer = document.getElementById('platforms-list');
        if (!platformsContainer) return;

        platformsContainer.innerHTML = this.platforms.map(platform => {
            if (platform.isLink) {
                return `
                    <a href="${platform.url}" target="_blank" rel="noopener noreferrer" class="btn text-white bg-blue-500 hover:bg-blue-600 group shadow-xs m-1.5">${platform.name}</a>
                `;
            } else {
                return `
                    <button class="btn text-white bg-blue-500 hover:bg-blue-600 group shadow-xs m-1.5">${platform.name}</button>
                `;
            }
        }).join('');
    }

    // Renderizar RSS feed
    renderRSSFeed() {
        const rssInput = document.querySelector('[data-rss-feed]');
        if (rssInput && this.rssFeed) {
            rssInput.value = this.rssFeed;
        }
    }

    // Cargar y renderizar un episodio específico para podcast.html
    async loadEpisode(episodeId) {
        try {
            const episodesData = await fetch('./data/episodes.json').then(res => res.json());
            this.episodes = episodesData.episodes;
            
            const episode = this.episodes.find(ep => ep.id === episodeId);
            if (episode) {
                this.renderEpisode(episode);
            } else {
                console.error(`Episodio con id ${episodeId} no encontrado`);
            }
        } catch (error) {
            console.error('Error cargando episodio:', error);
        }
    }

    // Renderizar página de episodio individual
    renderEpisode(episode) {
        // Actualizar meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', `${episode.title} - ${episode.description}`);
        }

        // Actualizar título del hero
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.textContent = episode.title;
        }

        // Actualizar metadata del hero
        const heroMetadata = document.querySelector('.hero-metadata');
        if (heroMetadata) {
            heroMetadata.textContent = `${episode.category} · ${episode.date} · Episodio ${episode.episodeNumber}`;
        }

        // Actualizar imagen del hero
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.setAttribute('src', episode.image);
            heroImage.setAttribute('alt', episode.title);
        }

        // Actualizar audio file
        const audioFile = document.querySelector('#audiofile');
        if (audioFile && episode.audioFile) {
            audioFile.setAttribute('src', episode.audioFile);
        }

        // Actualizar notas
        if (episode.notes) {
            const notesContainer = document.querySelector('.episode-notes');
            if (notesContainer) {
                let notesHTML = '';
                if (episode.subtitle) {
                    notesHTML += `<p class="text-slate-400 mb-4">${episode.subtitle}</p>`;
                }
                if (episode.notes.intro) {
                    notesHTML += `<p class="text-slate-400 mb-4">${episode.notes.intro}</p>`;
                }
                if (episode.notes.body && Array.isArray(episode.notes.body)) {
                    episode.notes.body.forEach(paragraph => {
                        notesHTML += `<p class="text-slate-400 mb-4">${paragraph}</p>`;
                    });
                }
                notesContainer.innerHTML = notesHTML;
            }
        }

        // Actualizar temas
        if (episode.topics && Array.isArray(episode.topics)) {
            const topicsContainer = document.querySelector('.episode-topics');
            if (topicsContainer) {
                topicsContainer.innerHTML = episode.topics.map(topic => `
                    <button class="w-full text-left py-1.5 group" @click="$dispatch('go-to', '${topic.time}')">
                        <span class="text-slate-400 font-medium">›</span> <span class="text-slate-100 font-medium">${topic.time}</span> <span class="text-slate-400 group-hover:text-blue-500 transition duration-150 ease-in-out">${topic.title}</span>
                    </button>
                `).join('');
                
                // Notificar a Alpine.js sobre nuevos elementos
                if (window.Alpine) {
                    window.Alpine.initTree(topicsContainer);
                }
            }
        }

        // Actualizar colaboradores
        if (episode.contributors && Array.isArray(episode.contributors)) {
            const contributorsContainer = document.querySelector('.episode-contributors');
            if (contributorsContainer) {
                contributorsContainer.innerHTML = episode.contributors.map(contributor => `
                    <p>
                        <span class="text-slate-400">—</span> <a class="font-medium text-slate-100 underline hover:no-underline" href="#0">${contributor.name}</a> ${contributor.bio}
                    </p>
                `).join('');
            }
        }

        // Actualizar transcript snippet
        if (episode.transcriptSnippet) {
            const transcriptContainer = document.querySelector('.episode-transcript');
            if (transcriptContainer) {
                transcriptContainer.innerHTML = `<div class="text-slate-400 italic">${episode.transcriptSnippet}</div>`;
            }
        }

        // Actualizar información del invitado en el sidebar
        if (episode.guestInfo) {
            const guestContainer = document.querySelector('.episode-guest');
            if (guestContainer) {
                guestContainer.innerHTML = `
                    <li class="flex items-center">
                        <img class="shrink-0 rounded-full mr-3" src="${episode.guestInfo.image}" width="44" height="44" alt="${episode.guestInfo.name}">
                        <div>
                            <div class="font-hkgrotesk font-extrabold text-sm text-slate-100">${episode.guestInfo.name}</div>
                            <div class="font-hkgrotesk font-medium text-slate-400 text-xs">${episode.guestInfo.role}</div>
                        </div>
                    </li>
                `;
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const loader = new DataLoader();
    
    // Detectar si estamos en podcast.html
    const isPodcastPage = window.location.pathname.includes('podcast.html');
    
    if (isPodcastPage) {
        // Obtener el ID del episodio desde la URL (query param ?episode=4) o usar 4 por defecto
        const urlParams = new URLSearchParams(window.location.search);
        const episodeId = parseInt(urlParams.get('episode')) || 4;
        loader.loadEpisode(episodeId);
    } else {
        loader.loadAll();
    }
});
