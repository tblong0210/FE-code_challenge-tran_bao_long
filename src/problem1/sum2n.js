/**
 * Using the mathematical formula n*( n + 1 )/2 ​
 * and a bitwise right shift (>>>) to perform the division by 2
 * */
var sum_to_n_a = function (n) {
  if (n <= 0) return 0
  return (n * (n + 1)) >>> 1
}

// Test cases for solution 1
console.log("Solution 1:")
console.log(sum_to_n_a(0)) // 0
console.log(sum_to_n_a(10)) // 55
console.log(sum_to_n_a(-10)) // 0

/**
 * Using recursion to sum all the numbers from 1 to n
 */
var sum_to_n_b = function (n) {
  if (n <= 0) return 0
  return n === 1 ? 1 : n + sum_to_n_b(n - 1)
}

// test cases for solution 2
console.log("Solution 2:")
console.log(sum_to_n_b(0)) // 0
console.log(sum_to_n_b(10)) // 55
console.log(sum_to_n_b(-10)) // 0

/**
 * Using the Array.from method to create an array of n elements
 * and then reduce to sum all the elements
 */
var sum_to_n_c = function (n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  )
}

// test cases for solution 3
console.log("Solution 3:")
console.log(sum_to_n_c(0)) // 0
console.log(sum_to_n_c(10)) // 55
console.log(sum_to_n_c(-10)) // 0
