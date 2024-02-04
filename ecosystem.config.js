export const apps = [
    {
        name: "bright_backend",
        script: "./src/app.ts",
        watch: true,
        ignore_watch: ["node_modules", "logs", "public"],
        watch_options: {
            followSymlinks: false
        },
        env: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production"
        }
    }
];
