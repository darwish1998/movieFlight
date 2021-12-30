const input = document.querySelector('input');

const debounce = (func,delayTime = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        },delayTime);
    };
};
