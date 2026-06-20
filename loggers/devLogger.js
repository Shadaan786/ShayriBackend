const { createLogger, format, transports, level } = require('winston');
const winston = require('winston/lib/winston/config');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({level, message, label, timestamp})=>{

    return `${timestamp} [${label}] ${level}: ${message};`
});

const devLogger =()=>{

    console.log("Hello")



    return createLogger({
        level: "debug",
    format: combine(
        label({label: "checking"}),
        timestamp({format: "HH:mm:ss"}),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'request.log'})
    ]
})
}

module.exports = {devLogger}