const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

const countDown = (time_str) => {
    const time_arr = time_str.split('-');
    const date = new Date(time_arr[3], time_arr[2]-1, time_arr[1], time_arr[0]);
    const now = new Date();
    const diff = date - now;

    if (diff < 0) {
        return "time's up";
    }
    
    return parseInt(diff/1000);
}


const times = process.argv.slice(2);

eventEmitter.on("timer", (payload) => { console.log(payload) });

for (let i = 0; i + 1 <= times.length; i++) {
    const timerId = setInterval(() => eventEmitter.emit("timer", ''.concat(i+1, ': ', countDown(times[i]))), 1000);
    setTimeout(() => clearInterval(timerId), (countDown(times[i]) + 2) * 1000);
}