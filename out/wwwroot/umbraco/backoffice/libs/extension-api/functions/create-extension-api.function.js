import { loadManifestApi } from './load-manifest-api.function.js';
/**
 * @param {UmbControllerHost} host - The controller host for this controller to be appended to
 * @param {ManifestApi} manifest - The manifest of the extension
 * @param {Array | UmbApiConstructorArgumentsMethodType} constructorArgs - The constructor arguments to pass to the API class
 * @returns {Promise<UmbApi | undefined>} - The API class instance
 */
export async function createExtensionApi(host, manifest, constructorArgs) {
    if (manifest.api) {
        const apiConstructor = await loadManifestApi(manifest.api);
        if (apiConstructor) {
            const additionalArgs = (typeof constructorArgs === 'function' ? constructorArgs(manifest) : constructorArgs) ?? [];
            return new apiConstructor(host, ...additionalArgs);
        }
        else {
            console.error(`-- Extension of alias "${manifest.alias}" did not succeed instantiate a API class via the extension manifest property 'api', using either a 'api' or 'default' export`, manifest);
        }
    }
    if (manifest.js) {
        const apiConstructor2 = await loadManifestApi(manifest.js);
        if (apiConstructor2) {
            const additionalArgs = (typeof constructorArgs === 'function' ? constructorArgs(manifest) : constructorArgs) ?? [];
            return new apiConstructor2(host, ...additionalArgs);
        }
        else {
            console.error(`-- Extension of alias "${manifest.alias}" did not succeed instantiate a API class via the extension manifest property 'js', using either a 'api' or 'default' export`, manifest);
        }
    }
    console.error(`-- Extension of alias "${manifest.alias}" did not succeed creating an api class instance, missing a JavaScript file via the 'api' or 'js' property.`, manifest);
    return undefined;
}
