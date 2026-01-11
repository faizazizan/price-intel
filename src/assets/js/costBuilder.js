/**
 * Unified Cost Builder - Core calculation module
 * Used by all calculators to compute true costs
 */

export class CostBuilder {
    constructor(config = {}) {
        this.productCost = parseFloat(config.productCost) || 0;
        this.platformFeePercent = parseFloat(config.platformFeePercent) || 0;
        this.logistics = parseFloat(config.logistics) || 0;
        this.adsCostPerUnit = parseFloat(config.adsCostPerUnit) || 0;
        this.paymentGatewayPercent = parseFloat(config.paymentGatewayPercent) || 0;
        this.monthlyFixedCost = parseFloat(config.monthlyFixedCost) || 0;
        this.wastagePercent = parseFloat(config.wastagePercent) || 0;
        this.sellingPrice = parseFloat(config.sellingPrice) || 0;
    }

    /**
     * Calculate platform fee based on selling price
     */
    getPlatformFee() {
        return (this.sellingPrice * this.platformFeePercent) / 100;
    }

    /**
     * Calculate payment gateway fee based on selling price
     */
    getPaymentFee() {
        return (this.sellingPrice * this.paymentGatewayPercent) / 100;
    }

    /**
     * Calculate wastage cost
     */
    getWastageCost() {
        return (this.productCost * this.wastagePercent) / 100;
    }

    /**
     * Calculate variable cost (all costs that scale with units)
     */
    getVariableCost() {
        return (
            this.productCost +
            this.logistics +
            this.adsCostPerUnit +
            this.getPlatformFee() +
            this.getPaymentFee() +
            this.getWastageCost()
        );
    }

    /**
     * Calculate true cost per unit (including all fees)
     */
    getTrueCost() {
        return this.getVariableCost();
    }

    /**
     * Calculate contribution per unit
     */
    getContribution() {
        return this.sellingPrice - this.getVariableCost();
    }

    /**
     * Calculate contribution margin percentage
     */
    getContributionPercent() {
        if (this.sellingPrice === 0) return 0;
        return (this.getContribution() / this.sellingPrice) * 100;
    }

    /**
     * Get breakdown of all costs
     */
    getCostBreakdown() {
        return {
            productCost: this.productCost,
            logistics: this.logistics,
            adsCostPerUnit: this.adsCostPerUnit,
            platformFee: this.getPlatformFee(),
            paymentFee: this.getPaymentFee(),
            wastageCost: this.getWastageCost(),
            variableCost: this.getVariableCost(),
            trueCost: this.getTrueCost(),
            contribution: this.getContribution(),
            contributionPercent: this.getContributionPercent(),
            monthlyFixedCost: this.monthlyFixedCost
        };
    }

    /**
     * Validate inputs
     */
    validate() {
        const errors = [];

        if (this.productCost < 0) errors.push('Product cost cannot be negative');
        if (this.platformFeePercent < 0 || this.platformFeePercent > 100) {
            errors.push('Platform fee must be between 0-100%');
        }
        if (this.paymentGatewayPercent < 0 || this.paymentGatewayPercent > 100) {
            errors.push('Payment gateway fee must be between 0-100%');
        }
        if (this.wastagePercent < 0 || this.wastagePercent > 100) {
            errors.push('Wastage must be between 0-100%');
        }
        if (this.sellingPrice < 0) errors.push('Selling price cannot be negative');

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
