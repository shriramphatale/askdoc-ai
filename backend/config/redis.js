import Redis from 'ioredis'
import {ENV} from './env.js'

const redis = new Redis(ENV.REDIS_URL || 'redis://localhost:6379')

export {redis}