// キャッシュファイルの指定
var CACHE_NAME = 'pwa-hrtk92-badminton';
var urlsToCache = [
    'hrtk92.github.io/badminton-tool/ScoreBoard.html',
    'hrtk92.github.io/badminton-tool/',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
