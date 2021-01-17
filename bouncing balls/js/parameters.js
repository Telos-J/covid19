export const inwardPro = 0.25; // Particles leaked through mask
export const outwardPro = 0.5; // Particles leaked into environment
export const infectionR = 0.5; // Probability of infection without mask
export const travelProb = 0.0001; // Probabilty to travel

export const numballs = 500; // Total number of balls
export const probInfected = 0.01; // Initial ratio of infectants
export const probMask = 0.0; // Ratio of mask wearers

export const ageProbs = [
    [[0, 49], 0.001],
    [[50, 79], 0.002],
    [[80, 100], 0.02]
];

export const numMaps = 'full'; // Map Layout
