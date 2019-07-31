const config = {
  username: process.env.DATABASE_USER || 'standup',
  database: process.env.DATABASE_NAME || 'standup',
  password: process.env.DATABASE_PASSWORD || '2MIZToTZP@We$e!wvI4',
  host: process.env.DATABASE_HOST || 'localhost',
  dialect: 'postgres',
}

export const development = config
export const production = config
export const test = config

export default config
