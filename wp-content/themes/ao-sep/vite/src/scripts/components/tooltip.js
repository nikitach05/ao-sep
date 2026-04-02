export default class Tooltip {
    constructor(targetClass = '.tooltip-target', tooltipClass = '.tooltip', useDataAttribute = false) {
        this.tooltipTargets = document.querySelectorAll(targetClass);
        this.useDataAttribute = useDataAttribute;

        this.init();
    }

    init() {
        this.tooltipTargets.forEach(target => {
            target.addEventListener('click', (event) => this.showTooltip(event, target));
        });

        document.addEventListener('click', (event) => this.hideTooltip(event));
    }

    showTooltip(event, target) {
        const tooltipId = target.getAttribute('data-tooltip');
        const tooltip = document.querySelector(`.tooltip[data-tooltip="${tooltipId}"]`);

        if (this.useDataAttribute && tooltip) {
            const tooltipText = target.getAttribute('data-tooltip-text') || '';
            tooltip.textContent = tooltipText;
            console.log(tooltip);
        }

        if (tooltip) {
            // Reset left and right values
            tooltip.style.left = 'auto';
            tooltip.style.right = 'auto';

            // Use requestAnimationFrame for correct positioning
            requestAnimationFrame(() => {
                const rect = target.getBoundingClientRect();
                const tooltipWidth = tooltip.offsetWidth; // Width of the tooltip

                // Check to ensure tooltip does not go off-screen
                if (rect.left + window.scrollX + tooltipWidth > window.innerWidth) {
                    // Position tooltip to the left if it exceeds the right boundary
                    tooltip.style.left = `${rect.left + window.scrollX - tooltipWidth}px`;
                } else {
                    // Otherwise, position it to the right
                    tooltip.style.left = `${rect.left + window.scrollX}px`;
                }

                tooltip.style.top = `${rect.bottom + window.scrollY}px`;
                tooltip.classList.add('opened'); // Show the tooltip
            });
        }
    }

    hideTooltip(event) {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            if (!event.target.classList.contains('tooltip-target') && !tooltip.contains(event.target)) {
                tooltip.classList.remove('opened');
                tooltip.style.left = 'auto';
                tooltip.style.right = 0;
            }
        });
    }
}