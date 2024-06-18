
const dev = {
    url: {
        API_BASE_URL: "http://localhost:8301", //be
    },
};

const prod = {
    url: {
        API_BASE_URL: "http://localhost:8301", //be
    },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
