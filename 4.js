// const readline = require('readline')

// const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false })

// let counter = 0
// let firstLine
// const arr = []
// rl.on('line', function (line) {
//   if (counter === 0) { firstLine = Number(line) } else {
//     arr.push(line.split(' ').map(el => Number(el)))
//   }
//   counter++
//   if (counter === firstLine + 1) { rl.close() }
// })
// rl.on('close', (line) => {
//   spiral(arr)
// })

function writeToBuf (intVal, buffTyped, offset = 0) {
  const string = String(intVal)
  if (offset > 0) offset--
  if (buffTyped.length - 2 < offset + string.length) {
    //throw new Error('buffer overflow')
    offset = BufFlush (buffTyped, offset)
  }
  for (let i = 0; i < string.length; i++) {
    buffTyped[offset++] = string.charCodeAt(i)
  }
  buffTyped[offset++] = 10
  buffTyped[offset++] = 0
  return offset
}
function BufFlush (buffTyped, currentOffset) {
 // process.stdout.write(String.fromCodePoint(...buffTyped.slice(0, buffTyped.indexOf(0, currentOffset-1) )))
  // process.stdout.write(buffTyped)
 process.stdout.write(buffTyped.slice(0, buffTyped.indexOf(0, currentOffset-1)))
  buffTyped[0] = 0
  return 0
}
// function writeToBuf (int16Val, buffTyped, offset = 0) {
//   if (buffTyped.length <= offset) {
//     offset = BufFlush (buffTyped, offset)
//     // throw new Error(`buffer overflow max ${buffTyped.length} curr ${offset}`)
//   }
//   buffTyped[offset++] = int16Val
//   return offset
// }
// function BufFlush (buffTyped, currentOffset) {
//   process.stdout.write(buffTyped.slice(0, currentOffset).join('\n') + '\n')
//   return 0
// }
function spiral (arr) {
  const buffer = new ArrayBuffer(60000)
  const bufferInt16 = new Uint8Array(buffer)
  let buffOffset = 0
  let lengthStep = 1
  let subgroupCountStep = 1
  let direction = 'top'
  const arrSize = arr.length
  let x, y
  y = x = Math.trunc(arr.length / 2)
  try {
  while (1) {
    if (lengthStep === 1 && direction === 'top') {
      if (arrSize === 1) {
        buffOffset = writeToBuf(arr[0], bufferInt16, buffOffset)
      } else {
        buffOffset = writeToBuf(arr[y][x], bufferInt16, buffOffset)
      }
    }
    // if (buffOffset >= arr.length) {
    //   buffOffset = BufFlush(bufferInt16, buffOffset)
    // }

    if (lengthStep === arrSize) { lengthStep-- }
    if (y === 0 && x === 0) { break }

    if (direction === 'top') {
      for (let i = 1; i <= lengthStep; i++) {
        buffOffset = writeToBuf(arr[y - i][x], bufferInt16, buffOffset)
      }
      y = y - lengthStep
      direction = 'right'
    } else if (direction === 'right') {
      for (let i = 1; i <= lengthStep; i++) {
        buffOffset = writeToBuf(arr[y][x + i], bufferInt16, buffOffset)
      }
      x = x + lengthStep
      direction = 'bottom'
    } else if (direction === 'bottom') {
      for (let i = 1; i <= lengthStep; i++) {
        buffOffset = writeToBuf(arr[y + i][x], bufferInt16, buffOffset)
      }
      y = y + lengthStep
      direction = 'left'
    } else if (direction === 'left') {
      for (let i = 1; i <= lengthStep; i++) {
        buffOffset = writeToBuf(arr[y][x - i], bufferInt16, buffOffset)
      }
      x = x - lengthStep
      direction = 'top'
    }

    subgroupCountStep++
    if (subgroupCountStep === 3) {
      lengthStep++
      subgroupCountStep = 1
    }
  }
}catch (err){
  console.log(err)
}
  buffOffset = BufFlush(bufferInt16, buffOffset)
}




const maxArrSize = 991
let arr = []
for (let x = 0; x < maxArrSize; x++) {
  arr[x] = []
  for (let y = 0; y < maxArrSize; y++) {
    arr[x][y] =  Number(x + y)
  }
  
}

// const arr = [
//   [1, 2, 3, 4, 5],
//   [6, 7, 8, 9, 10],
//   [11, 12, 13, -871, 15],
//   [16, 17, 18, 19, 20],
//   [21, 22, 23, 24, 25]
// ]

spiral(arr)
console.log(process.memoryUsage().rss/1024/1024 +  ' mb')

// function spiral( arr ) {
//     let length_step=1
//     let subgroup_count_step=1
//     let direction='top'
//     const arr_size = arr.length;
//     let  y =  x  =  Math.trunc(arr.length / 2)
//    // spiral(arr, y, x + length_step, length_step_next, subgroup_count_step_next, 'bottom' )
//     let iii=0
//     let res = '';
//     while(1) {
//         if( length_step === 1 && direction === 'top' ){
//             if(arr_size===1){
//                // process.stdout.write(  arr[0] + '\n');
//                res +=  arr[0] + '\n'
//             } else{
//                // process.stdout.write(  arr[y][x] + '\n');
//                res +=   arr[y][x] + '\n'
//             }
//         }
//         if(res.length>4096){
//             process.stdout.write(res)
//             res=''
//         }

//         if(length_step === arr_size)
//             length_step--

//         if(y===0 && x===0)
//             break

//         if(direction === 'top'){
//             for( let i = 1; i<= length_step; i++){
//                // iii = arr[y-i][x]
//                 res +=   arr[y-i][x]+ '\n'
//                 //process.stdout.write( arr[y-i][x] + '\n')
//             }
//             y = y - length_step
//             direction = 'right'
//         }else if(direction === 'right'){
//             for( let i = 1; i<= length_step; i++){
//                 //iii=arr[y][x+i]
//                 res +=   arr[y][x+i] + '\n'
//                 //process.stdout.write( arr[y][x+i] + '\n')
//             }
//             x = x + length_step
//             direction = 'bottom'
//         }else if(direction === 'bottom'){
//             for( let i = 1; i<= length_step; i++){
//                 //iii=arr[y+i][x]
//                 res +=   arr[y+i][x] + '\n'
//                 //process.stdout.write(  arr[y+i][x] + '\n')
//             }
//             y = y + length_step
//             direction = 'left'
//         }else if(direction === 'left'){
//             for( let i = 1; i<= length_step; i++){
//                 //iii=arr[y][x-i]
//                 res +=    arr[y][x-i] + '\n'
//                 //process.stdout.write(  arr[y][x-i] + '\n')
//             }
//             x = x - length_step
//             direction = 'top'
//         }

//         subgroup_count_step++
//         if(subgroup_count_step === 3){
//             length_step++
//             subgroup_count_step = 1
//         }

//         //console.log( `x = ${x} y = ${y} subgroup_count_step=${subgroup_count_step} length_step=${length_step} direction=${direction}` )
//     }

//     process.stdout.write(res)

// }

// function spiral( arr, y, x, length_step=1, subgroup_count_step=1, direction='top' ) {
//     if( length_step === 1 && direction === 'top' )
//         console.log( arr[y][x])

//     if(length_step === arr.length)
//         length_step--

//     if( y === 0 && x === 0 )
//         return;

//     let length_step_next = length_step
//     let subgroup_count_step_next = subgroup_count_step+1
//     if(subgroup_count_step === 2){
//         length_step_next = length_step+1
//         subgroup_count_step_next = 1
//     }

//     if(direction === 'top'){
//         for( let i = 1; i<= length_step; i++){
//             console.log( arr[y-i][x])
//         }
//         spiral(arr, y-length_step, x, length_step_next, subgroup_count_step_next, 'right' )
//     }else if(direction === 'right'){
//         for( let i = 1; i<= length_step; i++){
//             console.log( arr[y][x+i])
//         }
//         spiral(arr, y, x + length_step, length_step_next, subgroup_count_step_next, 'bottom' )
//     }else if(direction === 'bottom'){
//         for( let i = 1; i<= length_step; i++){
//             console.log( arr[y+i][x])
//         }
//         spiral(arr, y + length_step, x, length_step_next, subgroup_count_step_next, 'left' )
//     }else if(direction === 'left'){
//         for( let i = 1; i<= length_step; i++){
//             console.log( arr[y][x-i])
//         }
//         spiral(arr, y, x - length_step, length_step_next, subgroup_count_step_next, 'top' )
//     }

// }


// function writeToBuf (int16Val, buffTyped, offset = 0) {
//   if (buffTyped.length <= offset) {
//     offset = BufFlush (buffTyped, offset)
//     // throw new Error(`buffer overflow max ${buffTyped.length} curr ${offset}`)
//   }
//   buffTyped[offset++] = int16Val
//   return offset
// }
// function BufFlush (buffTyped, currentOffset) {
//   process.stdout.write(buffTyped.slice(0, currentOffset).join('\n') + '\n')
//   return 0
// }
// function spiral (arr) {
//   const buffer = new ArrayBuffer(8000)
//   const bufferInt16 = new Int16Array(buffer)
//   let buffOffset = 0
//   let lengthStep = 1
//   let subgroupCountStep = 1
//   let direction = 'top'
//   const arrSize = arr.length
//   let x, y
//   y = x = Math.trunc(arr.length / 2)
//   try {
//   while (1) {
//     if (lengthStep === 1 && direction === 'top') {
//       if (arrSize === 1) {
//         buffOffset = writeToBuf(arr[0], bufferInt16, buffOffset)
//       } else {
//         buffOffset = writeToBuf(arr[y][x], bufferInt16, buffOffset)
//       }
//     }
//     // if (buffOffset >= arr.length) {
//     //   buffOffset = BufFlush(bufferInt16, buffOffset)
//     // }

//     if (lengthStep === arrSize) { lengthStep-- }
//     if (y === 0 && x === 0) { break }

//     if (direction === 'top') {
//       for (let i = 1; i <= lengthStep; i++) {
//         buffOffset = writeToBuf(arr[y - i][x], bufferInt16, buffOffset)
//       }
//       y = y - lengthStep
//       direction = 'right'
//     } else if (direction === 'right') {
//       for (let i = 1; i <= lengthStep; i++) {
//         buffOffset = writeToBuf(arr[y][x + i], bufferInt16, buffOffset)
//       }
//       x = x + lengthStep
//       direction = 'bottom'
//     } else if (direction === 'bottom') {
//       for (let i = 1; i <= lengthStep; i++) {
//         buffOffset = writeToBuf(arr[y + i][x], bufferInt16, buffOffset)
//       }
//       y = y + lengthStep
//       direction = 'left'
//     } else if (direction === 'left') {
//       for (let i = 1; i <= lengthStep; i++) {
//         buffOffset = writeToBuf(arr[y][x - i], bufferInt16, buffOffset)
//       }
//       x = x - lengthStep
//       direction = 'top'
//     }

//     subgroupCountStep++
//     if (subgroupCountStep === 3) {
//       lengthStep++
//       subgroupCountStep = 1
//     }
//   }
// }catch (err){
//   console.log(err)
// }
//   buffOffset = BufFlush(bufferInt16, buffOffset)
// }