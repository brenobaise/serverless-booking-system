// lib/backgroundColours.js

let colours = {};

// Simulates async access (can be swapped for storage later)
export async function setBackgroundColours(newColours) {
    colours = newColours;
}

export async function getColour(key) {
    return colours[key];
}

export async function setColour(key, value) {
    colours[key] = value;
}

export async function getAllColours() {
    return colours;
}
