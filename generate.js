#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValue(arr) {
	return arr[getRandomInt(0, arr.length)];
}

function getRandomBoolean() {
	return getRandomInt(0, 2) == 0;
}

function splitFileToLines(filename) {
	return fs.readFileSync(path.resolve(__dirname, filename), 'UTF-8').toString().split("\n");
}

var num = 10;
var includeMale = true;
var includeFemale = true;

process.argv.forEach(function(val) {
	if (isNormalInteger(val)) {
		num = val;
	} else if ('male' == val) {
		includeFemale = false;
	} else if ('female' == val) {
		includeMale = false;
	}
});

var male = [];
var female = [];

if (includeMale) {
	male = splitFileToLines('male.txt');
}
if (includeFemale) {
	female = splitFileToLines('female.txt');
}
var surname = splitFileToLines('surname.txt');

for (var i = 0; i < num; i++) {
	var name;
	if (includeMale == false) {
		name = getRandomValue(female);
	} else if (includeFemale == false) {
		name = getRandomValue(male);
	} else {
		if (getRandomBoolean()) {
			name = getRandomValue(female);
		} else {
			name = getRandomValue(male);
		}
	}
	console.log(name + ' ' + getRandomValue(surname));
}
