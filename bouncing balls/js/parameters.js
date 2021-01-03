import { fullMaps, doubleMaps, quarterMaps, hexaMaps, octaMaps } from './maps.js'

export const inwardPro = 0.25; // Particles leaked through mask
export const outwardPro = 0.5; // Particles leaked into environment
export const infectionR = 0.5; // Probability of infection without mask
export const travelProb = 0.0002; // Probabilty to travel

export const numballs = 500; // Total number of balls
export const probInfected = 0.01; // Initial ratio of infectants
export const probMask = 0.2; // Ratio of mask wearers

export const ageProbs = [
    [[0, 20], 0.001],
    [[21, 50], 0.002],
    [[51, 70], 0.01],
    [[71, 100], 0.2]
];

export const maps = octaMaps; // Map Layout