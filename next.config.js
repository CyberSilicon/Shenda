/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    //you need to insert BOTH KEYs in order to connect with Parse Server
    PARSE_APP_ID: "otstUvnHvd6JbqA469Vi5BECK6QYum6LXyiMBxw7",
    PARSE_JS_KEY: "50UpxxHxCo8dWbcZKqn8nHyhGApZLYxDQ03kUb3P",
  },
};

module.exports = nextConfig;
