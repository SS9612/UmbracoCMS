/**
 *
 * @param property
 */
export async function loadManifestPlainJs(property) {
    const propType = typeof property;
    if (propType === 'function') {
        // Promise function
        const result = await property();
        if (typeof result === 'object' && result != null) {
            return result;
        }
    }
    else if (propType === 'string') {
        // Import string
        const result = await import(/* @vite-ignore */ property);
        if (typeof result === 'object' && result != null) {
            return result;
        }
    }
    return undefined;
}
