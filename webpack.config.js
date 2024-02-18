const Encore = require('@symfony/webpack-encore');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .configureDefinePlugin((options) => {
        const env = dotenv.config().parsed;

        if (env.error) {
            throw env.error;
        }
        const currentPath = path.join(__dirname);

        const envPath = currentPath + '/.env';

        if (!fs.existsSync(envPath)) {
            throw 'Vous devez créer un fichier \'.env\' et y copier le contenu du fichier \'.env.exemple\'';
        }

        const envLocalPath = envPath + '.local';

        const finalPath = fs.existsSync(envLocalPath) ? envLocalPath : envPath;

        const fileEnv = dotenv.config({ path: finalPath }).parsed;
        
        for (const property in fileEnv) {
            if (property === 'APP_NAME') {
                options['process.env.' + property] = JSON.stringify(fileEnv[property]);
            }
            if (property.substring(0, 8) === 'VUE_APP_') {
                options['process.env.' + property.substring(8)] = JSON.stringify(fileEnv[property]);
            }
        }
    })

    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.ts')
    .addAliases({
        '@': path.resolve(__dirname, './assets')
    })
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    .enableTypeScriptLoader(function (tsConfig) {
        tsConfig.appendTsSuffixTo = [/\.vue$/];
        tsConfig.appendTsxSuffixTo = [/\.vue$/];
    })

    .enableSassLoader(options => {
        options.additionalData = `
        @import "./assets/statics/styles/commons/_mixin.scss";
        @import "./assets/statics/styles/commons/_box-shadows.scss";
    `;
    }, { resolveUrlLoader: false })

    .enableVueLoader()

    .copyFiles([
        { from: './node_modules/@fortawesome/fontawesome-free/css', to: 'css/[name].[ext]' },
        { from: './node_modules/@fortawesome/fontawesome-free/webfonts', to: 'webfonts/[path][name].[ext]' }
    ])
;

module.exports = Encore.getWebpackConfig();
