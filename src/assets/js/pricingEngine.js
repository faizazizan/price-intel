/**
 * Smart Pricing Suggestion Engine
 * Generates Conservative, Balanced, and Aggressive pricing options
 */

export class PricingEngine {
    constructor(costBuilder) {
        this.costBuilder = costBuilder;
    }

    /**
     * Generate pricing suggestions based on target margins
     */
    generateSuggestions() {
        const trueCost = this.costBuilder.getTrueCost();

        // Target margins for each strategy
        const strategies = {
            conservative: { targetMargin: 20, label: 'Conservative', risk: 'Low' },
            balanced: { targetMargin: 35, label: 'Balanced', risk: 'Medium' },
            aggressive: { targetMargin: 50, label: 'Aggressive', risk: 'High' }
        };

        const suggestions = [];

        for (const [key, strategy] of Object.entries(strategies)) {
            const suggestedPrice = this.calculatePriceFromMargin(trueCost, strategy.targetMargin);

            // Create a temp cost builder with the suggested price
            const tempBuilder = new (this.costBuilder.constructor)({
                ...this.costBuilder,
                sellingPrice: suggestedPrice
            });

            const contribution = tempBuilder.getContribution();
            const margin = tempBuilder.getContributionPercent();

            suggestions.push({
                strategy: key,
                label: strategy.label,
                price: suggestedPrice,
                targetMargin: strategy.targetMargin,
                actualMargin: margin,
                contribution: contribution,
                risk: strategy.risk,
                description: this.getStrategyDescription(key)
            });
        }

        return suggestions;
    }

    /**
     * Calculate selling price from target margin percentage
     */
    calculatePriceFromMargin(trueCost, targetMarginPercent) {
        // Price = Cost / (1 - Target Margin %)
        return trueCost / (1 - targetMarginPercent / 100);
    }

    /**
     * Get description for each strategy
     */
    getStrategyDescription(strategy) {
        const descriptions = {
            conservative: 'Lower risk, faster sales velocity. Good for competitive markets or price-sensitive customers.',
            balanced: 'Optimal balance between profitability and competitiveness. Suitable for most scenarios.',
            aggressive: 'Maximum profit per unit. Best for unique products or premium positioning.'
        };

        return descriptions[strategy] || '';
    }

    /**
     * Analyze current price against suggestions
     */
    analyzeCurrentPrice(currentPrice) {
        const suggestions = this.generateSuggestions();
        const trueCost = this.costBuilder.getTrueCost();

        if (currentPrice < trueCost) {
            return {
                status: 'danger',
                message: 'WARNING: Your price is below true cost. You are losing money on each sale.',
                recommendation: `Minimum viable price: ${this.formatCurrency(suggestions[0].price)}`
            };
        }

        if (currentPrice < suggestions[0].price) {
            return {
                status: 'warning',
                message: 'Your margin is very thin. Consider increasing price.',
                recommendation: `Consider pricing at least: ${this.formatCurrency(suggestions[0].price)}`
            };
        }

        if (currentPrice >= suggestions[0].price && currentPrice < suggestions[1].price) {
            return {
                status: 'success',
                message: 'Conservative pricing. Safe but could optimize further.',
                recommendation: `For better margins, consider: ${this.formatCurrency(suggestions[1].price)}`
            };
        }

        if (currentPrice >= suggestions[1].price && currentPrice < suggestions[2].price) {
            return {
                status: 'success',
                message: 'Well-balanced pricing. Good profit with competitive edge.',
                recommendation: 'Your pricing is optimal for most scenarios.'
            };
        }

        return {
            status: 'info',
            message: 'Aggressive pricing. High margins but may impact sales volume.',
            recommendation: 'Monitor conversion rates and be ready to adjust if needed.'
        };
    }

    /**
     * Format currency
     */
    formatCurrency(amount) {
        return `RM ${amount.toFixed(2)}`;
    }
}

// Import CostBuilder for the engine
import { CostBuilder } from './costBuilder.js';
