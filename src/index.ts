/**
 * The program randomly generates marks and
 * saves them in a 2d array and in a .csv file.
 * By:      Daria Bernice Calitis
 * Version: 1.0
 * Since:   2022-09-29
 */

import { writeFileSync, readFileSync } from 'fs'

/**
 * generateGaussian
 *
 * @param {number} mean the average
 * @param {number} std standard deviation
 * @returns {number} returns GaussianNumber
 */
function generateGaussian (mean: number, std: number): number {
  // https://discourse.psychopy.org/t/javascript-gaussian-function/17724/2
  const _2PI = Math.PI * 2
  const u1 = Math.random()
  const u2 = Math.random()

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2)
  // const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(_2PI * u2)

  return z0 * std + mean
}

/**
 * tableOrg
 *
 * Organizes the students' marks to their
 * corresponding assignment into a 2D Array
 * and write it in .csv file.
 *
 * @param {Array<string>} students The list of students
 * @param {Array<string>} assignments The list of assignments
 */
function tableOrg (students: String[], assignments: String[]): void {
  // Gets the number of assignments
  const assLen = assignments.length

  // Empty first cell in the first row
  assignments.unshift(' ')

  // Sets the first row
  const table = []
  table.push(assignments)

  // Creates a row for each student with each mark
  // on the corresponding column/assignment.
  for (let studCount = 0; studCount < students.length; studCount++) {
    const studRow = []
    studRow.push(students[studCount])

    for (let assCount = 0; assCount < assLen; assCount++) {
      studRow.push(Math.floor(generateGaussian(75, 10)))
    }

    table.push(studRow)
  }

  // Writes the 2D in a .csv file.
  const tableStr = table.join(',\n')
  writeFileSync('marks.csv', tableStr)
}

// Input - File Reading and converting them into arrays.
const testCase = '3'

const studentListFile = readFileSync(
  `./testCases/students${testCase}.txt`,
  'utf-8'
)
const studentList = studentListFile.split(/\r?\n/)
studentList.pop()

const assListFile = readFileSync(`./testCases/ass${testCase}.txt`, 'utf-8')
const assList = assListFile.split(/\r?\n/)
assList.pop()

// Ouput - Formats them into .csv file and outputs the content of the file.
console.log('Student Grade Report CSV Formatter')

tableOrg(studentList, assList)

const csvFile = readFileSync('./marks.csv', 'utf-8')
console.log()
console.log(csvFile)

console.log('\nDone.')
