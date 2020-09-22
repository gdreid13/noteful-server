module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 
  'postgres://uapmtwkugbfcur:1ecef2471d533fdfc05c3c19eeca3e29e022efd0e8f541c1b78c6baaf47e14d4@ec2-23-23-242-234.compute-1.amazonaws.com:5432/d7v8r88fq1ofr3'
}