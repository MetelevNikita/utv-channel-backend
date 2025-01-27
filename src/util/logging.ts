import winston from 'winston';



export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './src/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './src/logs/combined.log' }),
  ]
})


