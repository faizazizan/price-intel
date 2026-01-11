/**
 * Markup & Margin Calculator
 */

export class MarginCalculator {
    constructor(costBuilder) {
        this.costBuilder = costBuilder;
    }

    /**
     * Calculate markup percentage
     * Markup = (Selling Price - Cost) / Cost × 100
     */
    getMarkupPercent() {
        const cost = this.costBuilder.getTrueCost();
        const sellingPrice = this.costBuilder.sellingPrice;

        if (cost === 0) return 0;
        return ((sellingPrice - cost) / cost) * 100;
    }

    /**
     * Calculate gross margin percentage
     * Margin = (Selling Price - Cost) / Selling Price × 100
     */
    getGrossMarginPercent() {
        return this.costBuilder.getContributionPercent();
    }

    /**
     * Calculate selling price from markup percentage
     */
    getPriceFromMarkup(markupPercent) {
        const cost = this.costBuilder.getTrueCost();
        return cost * (1 + markupPercent / 100);
    }

    /**
     * Calculate selling price from margin percentage
     */
    getPriceFromMargin(marginPercent) {
        const cost = this.costBuilder.getTrueCost();
        if (marginPercent >= 100) return Infinity;
        return cost / (1 - marginPercent / 100);
    }

    /**
     * Get comprehensive margin analysis
     */
    getAnalysis() {
        const sellingPrice = this.costBuilder.sellingPrice;
        const trueCost = this.costBuilder.getTrueCost();
        const markup = this.getMarkupPercent();
        const margin = this.getGrossMarginPercent();
        const contribution = this.costBuilder.getContribution();

        return {
            sellingPrice,
            trueCost,
            markup,
            margin,
            contribution,
            isProfitable: contribution > 0,
            profitPerUnit: contribution
        };
    }

    /**
     * Explain the difference between markup and margin
     */
    getExplanation() {
        return {
            markup: {
                title: 'Markup',
                definition: 'Percentage added to cost to determine selling price',
                formula: '(Selling Price - Cost) / Cost × 100',
                example: 'If cost is RM50 and you add 50% markup, price = RM75'
            },
            margin: {
                title: 'Gross Margin',
                definition: 'Percentage of selling price that is profit',
                formula: '(Selling Price - Cost) / Selling Price × 100',
                example: 'If you sell for RM100 with RM60 cost, margin = 40%'
            },
            difference: 'Markup is based on COST. Margin is based on SELLING PRICE. Margin is always lower than markup for the same price point.'
        };
    }
}
