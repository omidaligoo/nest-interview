module.exports = {
    'type': 'postgres',
    'url':'postgres://postgres:12345678910@localhost:5432/interview',
    'entities': ['dist/**/*.entity.js'],
    'synchronize': true
}