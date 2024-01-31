// Desc: Load environment variables from .env file
import dotenv from "dotenv";

// Load Env file
dotenv.config();

// Port
export const PORT_SERVER = process.env.PORT_SERVER || 4000;

// Environment
export const NODE_ENV: string = process.env.NODE_ENV || "local";

// Apply all request
export const SERVER_ORIGIN: string = process.env.SERVER_ORIGIN || "*";

// CORS
export const CORS_OPTIONS: object = {
  origin: SERVER_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language",
};

// Logger
export const MORGAN_FORMAT: string =
  ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

// Swagger
export const USERNAME_API_DOCS: string = process.env.USERNAME_API_DOCS || "admin";
export const PASSWORD_API_DOCS: string = process.env.PASSWORD_API_DOCS || "admin";
export const API_DOCS_HOST: string = process.env.API_DOCS_HOST || "localhost:4000";
export const BRIGHT_URL: string = process.env.BRIGHT_URL || "http://localhost:4000";

// Endpoint
export const ROUTE_ENDPOINT = {
  BASE_URL_V1: "/bright-backend/api",
  PING: "/ping",
};

// Mongodb
export const MONGO_URI = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";
export const DB_NAME = process.env.DB_NAME || "bright";

// Credentials
export const AUTH_EMAIL = process.env.AUTH_EMAIL || "bright.pmtools@gmail.com";
export const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "c k l r e z a d z n m f o q v p";
export const GOOGLE_CLIENT_ID = "852626779740-jgr1dq6mh299pi4m24ag7t47dptct7kr.apps.googleusercontent.com";
export const GOOGLE_CLIENT_SECRET = "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";

// Firebase
export const GOOGLE_APPLICATION_CREDENTIALS = {
    "type": "service_account",
    "project_id": "bright-3e89b",
    "private_key_id": "fbd789c8f5ae2ce5219c04df5291cf43c427447d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKgQMt8F9s2X8S\nC72jef7P2R2TcDjq88N9wnM0HWTJEtFgJhW9DIwW9Sa2VUB3tbTtTR6LCn5iPPjZ\nOgJK4YufobkOGMnYMbiHQQ3GQzk7EEvZA4AgqL+6mv/D4nu084MtgR9u+byFxk0x\nh1MZ7AlXSP+NaRpkgPch0UlYfh6c3zhf7+UFfXSlfJxo0SMn0ScEnAE8vXia6/Jd\n9c2ZHcflWlboz63ZCt7gb2Im7o1mfea0UZSOvJhztsdllhtBJK4gGWNMYZ6AV9sJ\n5cSZbXxPMjzp412oAB/5nQGoBkG9jQ1cpx/qx7RR6hrE9KvbLZg4FgOfaIOdgOVX\n8IStarJlAgMBAAECggEAX6ZjhZHpyOTMwA3ao7pucOeJMEiMIfJE7wRnXQDbR5yD\nWCp1Dyg7jWZ7RBlti33A+Wt5V0x8GNPa6OQdDBiP1jVRzwZHZL5Lfltsca7z++F9\nKgKcxRBgC3jGAVTbgMOavOYmHkmI0hkyAgh86JwUZ22cA8PWyw0dbhRIVCuyMv7n\nDJ3LLT4nXfElyXioIHHgpEmlrPhV8/ccAIwjQhBnbjWhfd1BF51vH4VJYq/KW9Bh\nOLqFu4q8MITzUPZq42qw0s9aDS+lzOHueNAMuhiZso3GYyErXm1qsJev0rc+/xw2\nAJEIQIHrsJL6S4jwbk6Ucw5k0xfi/t5lN7jP+5N2qwKBgQD12L7J0NBlDzK/u0SB\nCHIAsSJhl+9w1bFrun1jc9ZAH2eqDyNP881NjDqQ5IbYkvWj6YrciQbGzbT2Yr5Y\n0dxhxzPzjoTDFWZ/Ulpd20jSZD657f8Xw8t+6Ub6t3PPup+dCGkqxJQgEE5jHw04\nBO01USM9sArYwcdconTumxVWGwKBgQDS3gToyJ5JJi9u/Rgc++fxJzU3Cl82vsxY\niVgwNGyplG1UPwkvTLJ6UXYhSJ1HU80XXrHGiiY+H4QfgHUCapropRgO03ITZ6uN\njcCSk4rFLJkjZpxQ+fpbtCsrOqD2IyMeNd/hXPJweOl+OcTExuG5/eDGT7inCzL/\nfCJ3uuqhfwKBgQCVFxycx0WaA92C6M5icfyw7rsq9DkA9Jbj/fSMm3MS7/it6QBB\nPFkE7kWWGQCt1nGhNcBAfdjeN2HHCZrlwl8j7OpUidl5dUDzdb3XrWQ8Mw7XMr3A\na7y8+jtRUG+rSkIBuVgN16j8yObAtdQOZO51pv74Kgpp6Ro900eWa/ZEgQKBgHZl\nPEJrqhwOOaHKr4hOlDtdtU5TH4TAekHX09E1DjHk6cHcps6M9MUjCf3EJLLQxZ2y\niISeOry0u11opcoWiyXG1Iw2gp2MntEa3x4tg0QUN2OeEHSS9tQYhAiAobGxpt0m\niK6jnmgyK3+49dc6h7EDb/pI9rer3RV/4GZzZ5wHAoGBANSGnpvKZkEN8oopJdq8\nIcqhOO7hEMQtIIVSevW9v/lkkWpttUBVChCDCe/5E07rcctglE/rfIFC+8cfDi0A\nw4gg2A1RW73w6i3kmou5Mjq3tb35yzyvEaPsx9c+7qMuuh9+IFDmH0B+hmhSjLA2\nLsZbGwy3z7eob0nIr5TBDw3Q\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-jnpth@bright-3e89b.iam.gserviceaccount.com",
    "client_id": "108341408289156853709",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jnpth%40bright-3e89b.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAYQ3DSfJ04fkvS7inqU32iKB104i_MBFE",
  authDomain: "bright-3e89b.firebaseapp.com",
  projectId: "bright-3e89b",
  storageBucket: "bright-3e89b.appspot.com",
  messagingSenderId: "100057300574",
  appId: "1:100057300574:web:69b7053d376c9a725c3ecf",
  measurementId: "G-VKLC5EHNBS"
};
export const VAPIDKEY = "BNBE25IQ-JdSZOCB7RR-Sj3Kom65jCG-_ac4rMjxtMSpEAXs6Uu0UqCkuYS8CCao3F2-LbAfgcXYjGdJGT1_YpM"
export const PROJECT_ID = "bright-3e89b";
export const HOST = 'fcm.googleapis.com';
export const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
export const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
export const SCOPES = [MESSAGING_SCOPE];

// RabbitMQ Queue Names
export const PUSH_NOTIFICATION_QUEUE = 'push_notification_queue';
