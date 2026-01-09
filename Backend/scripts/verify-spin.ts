
import { RewardService } from '../src/services/reward.service';

const PRIZES = [
    { label: "5 Coins", value: 5, weight: 40 },
    { label: "10 Coins", value: 10, weight: 30 },
    { label: "20 Coins", value: 20, weight: 15 },
    { label: "50 Coins", value: 50, weight: 10 },
    { label: "100 Coins", value: 100, weight: 5 },
];

async function verifyDistribution() {
    console.log("Verifying Reward Distribution (1000 spins)...");
    const counts: Record<number, number> = {};
    const totalSpins = 1000;

    for (let i = 0; i < totalSpins; i++) {
        // @ts-ignore - utilizing the now public static method
        const coins = RewardService.calculateReward();
        counts[coins] = (counts[coins] || 0) + 1;
    }

    console.log("Distribution Results:");
    let totalWeight = 0;
    PRIZES.forEach(p => totalWeight += p.weight);

    PRIZES.forEach(p => {
        const expectedPercent = (p.weight / totalWeight) * 100;
        const actualCount = counts[p.value] || 0;
        const actualPercent = (actualCount / totalSpins) * 100;
        console.log(`${p.label} (${p.value}): Expected ~${expectedPercent}%, Actual ${actualPercent.toFixed(1)}% (${actualCount})`);
    });
}

verifyDistribution();
