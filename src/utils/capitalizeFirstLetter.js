
export function capitalizeFirstLetter(string) {
    string = string.toLowerCase().replace('_', ' ')
    return string.charAt(0).toUpperCase() + string.slice(1);
}