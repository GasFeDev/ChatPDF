import axios from 'axios';

const env = process.env.REACT_APP_NODE_ENV || 'development';

const API_CONFIG = {
    "development": {
        "url_api": process.env.REACT_APP_API_URL_DEVELOPMENT,
    },
    "test": {
        "url_api": process.env.REACT_APP_API_URL_TEST,
    },
    "production": {
        "url_api": process.env.REACT_APP_API_URL_PROD
    }
};

const honorablesService = axios.create({
    baseURL: `${API_CONFIG[env].url_api}`
});

export default honorablesService