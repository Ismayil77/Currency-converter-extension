const currencyFrom = document.getElementById('currencyFrom');
const currencyTo = document.getElementById('currencyTo');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

const apiKey = 'Your API KEY'; //  API Key
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}`;


// Fetch currencies and populate dropdowns
async function fetchCurrencies() {
  try {
    const response = await fetch(`${baseUrl}/latest/USD`);
    if (!response.ok) throw new Error('Failed to fetch currencies');
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
      currencyFrom.innerHTML += `<option value="${currency}">${currency}</option>`;
      currencyTo.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
    resultDiv.textContent = 'Error loading currencies. Please try again.';
  }
}

// Convert currency
async function convertCurrency() {
  const from = currencyFrom.value;
  const to = currencyTo.value;
  const amount = amountInput.value;

  if (!amount || isNaN(amount)) {
    resultDiv.textContent = 'Please enter a valid amount.';
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/pair/${from}/${to}/${amount}`);
    if (!response.ok) throw new Error('Failed to convert currency');
    const data = await response.json();
    resultDiv.textContent = `${amount} ${from} = ${data.conversion_result} ${to}`;
  } catch (error) {
    console.error('Error converting currency:', error);
    resultDiv.textContent = 'Error converting currency. Please try again.';
  }
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);


// Initialize
fetchCurrencies();