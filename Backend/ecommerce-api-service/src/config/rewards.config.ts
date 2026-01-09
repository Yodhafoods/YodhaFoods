export const REWARDS_CONFIG = {
    COIN_EXCHANGE_RATE: 10,     // 10 coins = 1 Rupee
    MAX_DISCOUNT_PERCENTAGE: 0.20, // 20%
    DAILY_SPIN_LIMIT: 3,
    REWARD_TIERS: [
        { coins: 5, weight: 40 },
        { coins: 10, weight: 30 },
        { coins: 20, weight: 15 },
        { coins: 50, weight: 10 },
        { coins: 100, weight: 5 },
    ]
};
