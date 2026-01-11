/**
 * Breakeven Calculator
 */

export class BreakevenCalculator {
    constructor(costBuilder) {
        this.costBuilder = costBuilder;
    }

    /**
     * Calculate breakeven units
     * Breakeven Units = Fixed Cost / Contribution per Unit
     */
    getBreakevenUnits() {
        const contribution = this.costBuilder.getContribution();
        const fixedCost = this.costBuilder.monthlyFixedCost;

        if (contribution <= 0) {
            return {
                units: Infinity,
                isAchievable: false,
                message: 'Cannot breakeven - contribution per unit is zero or negative'
            };
        }

        const units = Math.ceil(fixedCost / contribution);

        return {
            units,
            isAchievable: true,
            message: `You need to sell ${units} units to cover fixed costs`
        };
    }

    /**
     * Calculate breakeven revenue
     */
    getBreakevenRevenue() {
        const breakevenUnits = this.getBreakevenUnits();

        if (!breakevenUnits.isAchievable) {
            return {
                revenue: 0,
                isAchievable: false,
                message: breakevenUnits.message
            };
        }

        const revenue = breakevenUnits.units * this.costBuilder.sellingPrice;

        return {
            revenue,
            units: breakevenUnits.units,
            isAchievable: true,
            message: `Breakeven revenue: RM ${revenue.toFixed(2)}`
        };
    }

    /**
     * Calculate time to breakeven given average monthly units
     */
    getTimeToBreakeven(averageMonthlyUnits) {
        const breakevenUnits = this.getBreakevenUnits();

        if (!breakevenUnits.isAchievable || averageMonthlyUnits <= 0) {
            return {
                months: Infinity,
                isAchievable: false
            };
        }

        const months = breakevenUnits.units / averageMonthlyUnits;

        return {
            months: months,
            days: Math.ceil(months * 30),
            isAchievable: true,
            message: `At ${averageMonthlyUnits} units/month, you'll breakeven in ${months.toFixed(1)} months`
        };
    }

    /**
     * Get comprehensive breakeven analysis
     */
    getAnalysis() {
        const contribution = this.costBuilder.getContribution();
        const contributionPercent = this.costBuilder.getContributionPercent();
        const fixedCost = this.costBuilder.monthlyFixedCost;
        const breakevenUnits = this.getBreakevenUnits();
        const breakevenRevenue = this.getBreakevenRevenue();

        return {
            contribution,
            contributionPercent,
            fixedCost,
            breakevenUnits: breakevenUnits.units,
            breakevenRevenue: breakevenRevenue.revenue,
            isAchievable: breakevenUnits.isAchievable,
            dailyUnitsNeeded: Math.ceil(breakevenUnits.units / 30),
            weeklyUnitsNeeded: Math.ceil(breakevenUnits.units / 4)
        };
    }

    /**
     * Calculate profit at given volume
     */
    getProfitAtVolume(units) {
        const contribution = this.costBuilder.getContribution();
        const fixedCost = this.costBuilder.monthlyFixedCost;
        const totalContribution = contribution * units;
        const profit = totalContribution - fixedCost;

        return {
            units,
            revenue: units * this.costBuilder.sellingPrice,
            totalContribution,
            fixedCost,
            profit,
            isProfitable: profit > 0
        };
    }
}
