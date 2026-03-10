// Wait for the HTML document to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Select the form and the results container from the DOM
    const form = document.getElementById("risk-form");
    const resultsCard = document.getElementById("results");

    // Select the spans where we will output our final numbers
    const resRiskAmount = document.getElementById("res-risk-amount");
    const resDistance = document.getElementById("res-distance");
    const resPositionSize = document.getElementById("res-position-size");

    // Listen for the form submission
    form.addEventListener("submit", function(event) {
        // Prevent the default browser behavior of refreshing the page
        event.preventDefault();

        // 1. Gather User Inputs (Convert string inputs to floating-point numbers)
        const balance = parseFloat(document.getElementById("balance").value);
        const riskPercent = parseFloat(document.getElementById("risk").value);
        const entry = parseFloat(document.getElementById("entry").value);
        const stop = parseFloat(document.getElementById("stop").value);
        const pointValue = parseFloat(document.getElementById("point-value").value);

        // 2. Execute Functional Logic & Math
        // Calculate the absolute dollar amount willing to be risked
        const riskAmount = balance * (riskPercent / 100);

        // Calculate the absolute distance between entry and stop loss
        const distance = Math.abs(entry - stop);

        // Calculate the exact dollar risk per 1 unit/lot of the asset
        const riskPerUnit = distance * pointValue;

        // Determine the maximum allowable position size
        const positionSize = riskAmount / riskPerUnit;

        // 3. Output Results to the DOM
        // Update the text content of our result spans, formatting to 2 decimal places
        resRiskAmount.textContent = `$${riskAmount.toFixed(2)}`;
        resDistance.textContent = distance.toFixed(2);
        
        // Output the final position size. If it's a tiny fraction, it will show accurately.
        resPositionSize.textContent = `${positionSize.toFixed(2)} Units`;

        // Remove the 'hidden' class to display the results card
        resultsCard.classList.remove("hidden");
    });
});
