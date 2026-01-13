// Data Loader - Carga y renderiza contenido desde archivos JSON

class DataLoader {
    constructor() {
        this.episodes = [];
        this.testimonials = [];
        this.platforms = [];
        this.socialLinks = [];
    }

    // Cargar todos los datos
    async loadAll() {
        try {
            const [episodesData, testimonialsData, platformsData, socialData] = await Promise.all([
                fetch('./data/episodes.json').then(res => res.json()),
                fetch('./data/testimonials.json').then(res => res.json()),
                fetch('./data/platforms.json').then(res => res.json()),
                fetch('./data/social.json').then(res => res.json())
            ]);

            this.episodes = episodesData.episodes;
            this.testimonials = testimonialsData.testimonials;
            this.platforms = platformsData.platforms;
            this.rssFeed = platformsData.rssFeed;
            this.socialLinks = socialData.socialLinks;

            // Renderizar contenido
            this.renderCarousel();
            this.renderEpisodes();
            this.renderTestimonials();
            this.renderPlatforms();
            this.renderRSSFeed();
            this.renderSocialLinks();
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    }

    // Renderizar carousel de episodios
    renderCarousel() {
        const carouselWrapper = document.querySelector('.carousel .swiper-wrapper');
        if (!carouselWrapper) return;

        carouselWrapper.innerHTML = this.episodes.slice().reverse().map((episode, index) => `
            <div class="swiper-slide h-auto flex flex-col max-w-[446px] group">
                <a href="${episode.link}?capitulo=${episode.id}">
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

        episodesContainer.innerHTML = this.episodes.slice().reverse().map(episode => `
            <div class="sm:flex items-center p-5 border-b border-slate-700" x-show="['0', '${episode.categoryId}'].includes(category)">
                <div class="flex items-start mb-4 sm:mb-0">
                    <img class="shrink-0 rounded-sm ml-5 sm:ml-0 sm:mr-5 order-1 sm:order-none" src="${episode.image}" width="88" height="88" alt="${episode.title}" />
                    <div>
                        <h3 class="font-hkgrotesk font-extrabold text-lg mb-1">
                            <a class="text-slate-100 hover:text-blue-500 transition duration-150 ease-in-out" href="${episode.link}?capitulo=${episode.id}">${episode.title}</a>
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
                    <a href="${episode.link}?capitulo=${episode.id}" aria-label="Escuchar">
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

    // Renderizar enlaces sociales
    renderSocialLinks() {
        const socialContainers = document.querySelectorAll('.social-links');
        if (socialContainers.length === 0) return;

        // Filtrar enlaces con URL vacía
        const validLinks = this.socialLinks.filter(link => link.url && link.url.trim() !== '');

        const socialHTML = validLinks.map(link => `
            <li>
                <a class="flex justify-center items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out" href="${link.url}" aria-label="${link.ariaLabel}" target="_blank" rel="noopener noreferrer">
                    <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="${link.svgPath}" />
                    </svg>
                </a>
            </li>
        `).join('');

        socialContainers.forEach(container => {
            container.innerHTML = socialHTML;
        });
    }

    // Cargar y renderizar un episodio específico para podcast.html
    async loadEpisode(episodeId) {
        try {
            const [episodesData, socialData] = await Promise.all([
                fetch('./data/episodes.json').then(res => res.json()),
                fetch('./data/social.json').then(res => res.json())
            ]);
            
            this.episodes = episodesData.episodes;
            this.socialLinks = socialData.socialLinks;
            
            const episode = this.episodes.find(ep => ep.id === episodeId);
            if (episode) {
                this.renderEpisode(episode);
                this.renderCarousel();
                this.renderSocialLinks();
            } else {
                console.error(`Episodio con id ${episodeId} no encontrado. Redirigiendo a index.html`);
                // Ocultar loader antes de redirigir
                this.hideLoader();
                setTimeout(() => {
                    window.location.href = './index.html';
                }, 100);
            }
        } catch (error) {
            console.error('Error cargando episodio:', error);
            // Ocultar loader antes de redirigir
            this.hideLoader();
            setTimeout(() => {
                window.location.href = './index.html';
            }, 100);
        }
    }

    // Renderizar página de episodio individual
    renderEpisode(episode) {
        // Actualizar título de la página
        if (document.title && episode.title) {
            document.title = `${episode.title} - Disertaciones Tecnológicas`;
        }
        
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
            heroImage.setAttribute('src', episode.carouselImage);
            heroImage.setAttribute('alt', episode.title);
        }


        // Actualizar iframe de Spotify
        const spotifyEmbed = document.querySelector('.spotify-embed');
        if (spotifyEmbed && episode.spotify_embed_url) {
            // Convertir URL de episodio a URL de embed
            let embedUrl = episode.spotify_embed_url;
            // Si la URL no es de embed, convertirla
            if (embedUrl.includes('/episode/') && !embedUrl.includes('/embed/episode/')) {
                // Extraer el ID del episodio (antes del primer ? o /)
                const episodeIdMatch = embedUrl.match(/\/episode\/([^/?]+)/);
                if (episodeIdMatch) {
                    const episodeId = episodeIdMatch[1];
                    embedUrl = `https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`;
                }
            }
            spotifyEmbed.setAttribute('src', embedUrl);
        }
        
        // Actualizar Open Graph y Twitter Cards
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        if (ogTitle) ogTitle.setAttribute('content', `${episode.title} - Disertaciones Tecnológicas`);
        if (ogDescription) ogDescription.setAttribute('content', episode.description);
        if (ogImage && episode.carouselImage) {
            const imageUrl = episode.carouselImage.startsWith('http') ? episode.carouselImage : `https://www.disertacionestecnologicas.com${episode.carouselImage.replace('./', '/')}`;
            ogImage.setAttribute('content', imageUrl);
        }
        if (twitterTitle) twitterTitle.setAttribute('content', `${episode.title} - Disertaciones Tecnológicas`);
        if (twitterDescription) twitterDescription.setAttribute('content', episode.description);
        if (twitterImage && episode.carouselImage) {
            const imageUrl = episode.carouselImage.startsWith('http') ? episode.carouselImage : `https://www.disertacionestecnologicas.com${episode.carouselImage.replace('./', '/')}`;
            twitterImage.setAttribute('content', imageUrl);
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
                // Actualizar solo el contenido interno del <ul>, manteniendo la estructura
                guestContainer.innerHTML = `
                    <li class="flex items-center">
                        <div>
                            <div class="font-hkgrotesk font-extrabold text-sm text-slate-100">${episode.guestInfo.name}</div>
                            <div class="font-hkgrotesk font-medium text-slate-400 text-xs">${episode.guestInfo.role}</div>
                        </div>
                    </li>
                `;
            }
        }

        // Ocultar loader y mostrar contenido cuando todo esté cargado
        this.hideLoader();
    }

    // Ocultar loader y mostrar contenido
    hideLoader() {
        const loader = document.getElementById('page-loader');
        const content = document.getElementById('page-content');
        
        if (loader) {
            loader.style.display = 'none';
        }
        if (content) {
            content.style.display = 'flex';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const loader = new DataLoader();
    
    // Detectar si estamos en podcast.html
    const isPodcastPage = window.location.pathname.includes('podcast.html');
    
    if (isPodcastPage) {
        // Obtener el ID del episodio desde la URL (query param ?capitulo=4) o usar 4 por defecto
        const urlParams = new URLSearchParams(window.location.search);
        const episodeId = parseInt(urlParams.get('capitulo')) || 4;
        loader.loadEpisode(episodeId);
    } else {
        loader.loadAll();
    }
});
