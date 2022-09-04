

const setApiKey = (key) => localStorage.setItem('api-key',key);

const getApiKey =  () => localStorage.getItem('api-key');

const checkAuth = () => !!localStorage.getItem('api-key');

export {setApiKey,checkAuth, getApiKey}