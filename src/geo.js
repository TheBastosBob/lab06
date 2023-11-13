
export const getLocation = (options) => {
    console.log('getLocation');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}
