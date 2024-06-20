const dev = {
    url: {
        API_BASE_URL: "http://localhost:8301/portal/", //be
        API_NEXT_URL: "http://localhost:3000/api/", //be
        Portal_API_BASE_URL: "http://localhost:8302", //임시 be
        KEYCLOAK_BASE_URL: "http://cicdplus.pmsplus.co.kr:8024/auth",
        CICD_BASE_URL: "http://localhost:8302/its",
        QMS_BASE_URL: "http://localhost:8303/qms",
    },
};

const prod = {
    url: {
        API_BASE_URL: "http://localhost:8301/portal/", //be
        API_NEXT_URL: "http://localhost:3000/api/", //be
        Portal_API_BASE_URL: "http://localhost:8302", //임시 be
        KEYCLOAK_BASE_URL: "http://cicdplus.pmsplus.co.kr:8024/auth",
        CICD_BASE_URL: "http://localhost:8302/its",
        QMS_BASE_URL: "http://localhost:8303/qms",
    },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
