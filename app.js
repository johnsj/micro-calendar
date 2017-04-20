const XLSX = require('xlsx');

var workbook = XLSX.readFile('Mappe1.xlsx');

var first_sheet_name = workbook.SheetNames[0]
var first_sheet = workbook.Sheets[first_sheet_name];
var first_cell = first_sheet['A1'];

console.log(first_cell.v);
