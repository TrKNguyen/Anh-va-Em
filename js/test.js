var now = new Date(); 
var next = new Date('2023-02-22 00:00:00')
console.log(now.getTime())
console.log(next,next.getTime(),typeof next.getTime())
console.log(now.getHours(),now.getMinutes(),next.getHours(),next.getMinutes(),next.getSeconds())
console.log(typeof next.getDate())
var timegap = now.getTime() - next.getTime()
var h= Math.round(timegap / (60*60 * 24*1000) )
console.log( timegap,typeof timegap,h, typeof h)