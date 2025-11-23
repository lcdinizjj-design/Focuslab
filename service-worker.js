<<<<<<< HEAD
// Nome do cache para controle de versão
const CACHE_NAME = 'gemini-pwa-cache-v1';

// Arquivos estáticos essenciais que o celular deve guardar no cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Nota: Arquivos de build como CSS e JS seriam adicionados automaticamente aqui em um projeto Vite
];

// Instalação: Armazena os arquivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME) 
      .then(cache => {
        console.log('Cache aberto e arquivos pré-armazenados.');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Falha ao armazenar em cache:', err);
      })
  );
});

// Busca (Fetch): Intercepta requisições de rede para servir o cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) // Tenta encontrar a requisição no cache
      .then(response => {
        // Se a resposta estiver no cache, retorna o cache
        if (response) {
          return response;
        }
        // Se não estiver, busca na internet
        return fetch(event.request);
      })
  );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Deleta caches que não estão na lista branca
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
=======
// Nome do cache para controle de versão
const CACHE_NAME = 'gemini-pwa-cache-v1';

// Arquivos estáticos essenciais que o celular deve guardar no cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Nota: Arquivos de build como CSS e JS seriam adicionados automaticamente aqui em um projeto Vite
];

// Instalação: Armazena os arquivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME) 
      .then(cache => {
        console.log('Cache aberto e arquivos pré-armazenados.');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Falha ao armazenar em cache:', err);
      })
  );
});

// Busca (Fetch): Intercepta requisições de rede para servir o cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) // Tenta encontrar a requisição no cache
      .then(response => {
        // Se a resposta estiver no cache, retorna o cache
        if (response) {
          return response;
        }
        // Se não estiver, busca na internet
        return fetch(event.request);
      })
  );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Deleta caches que não estão na lista branca
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
>>>>>>> 26fd5518df3a6e2b48ab4ae32da37f43adade4b7
});