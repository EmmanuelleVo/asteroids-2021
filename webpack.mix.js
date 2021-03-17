let mix = require('laravel-mix');

mix.setPublicPath('dist')
    .js('src/js/app.js', 'dist/js')
    .copy('src/index.html', 'dist/index.html')
    .sass('src/scss/main.scss', 'css');