import React, { useState, useCallback } from 'react';

// Main application component
export default function App() {
  const [affiliateLink, setAffiliateLink] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [previousPrice, setPreviousPrice] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  // Function to handle the generation of the description
  const generateDescription = useCallback(() => {
    // Basic validation to ensure required fields are not empty
    if (!affiliateLink || !currentPrice || !previousPrice) {
      setGeneratedText('Please fill in the affiliate link, current price, and previous price.');
      return;
    }

    const current = parseFloat(currentPrice);
    const previous = parseFloat(previousPrice);

    // More validation for numerical values
    if (isNaN(current) || isNaN(previous) || previous <= current) {
      setGeneratedText('Please enter valid prices. Previous price must be greater than current price.');
      return;
    }

    // Calculate the discount percentage
    const discountPercentage = Math.round(((previous - current) / previous) * 100);

    let description;

    // Use conditional logic to determine the description based on the discount percentage
    if (discountPercentage > 50) {
      description = `
🎯 Mega Steal! Over 50% Off! 🎯
This is one offer you don't want to miss—grab your favorite product at half price or less!
🔗 Get yours: ${affiliateLink}
💰 Current Price: ₹${current.toFixed(2)}
💸 Previous Price: ₹${previous.toFixed(2)}
🔥 Massive saving of ${discountPercentage}%! 🔥
Limited time—go grab the deal now!
Thanks for following TR Deals ❤️
`;
    } else if (discountPercentage > 30) {
      description = `
🛍️ Don’t Miss This Deal! 🛍️
Grab this awesome product now at a big discount!
🔗 Buy here: ${affiliateLink}
💰 Current Price: ₹${current.toFixed(2)}
💸 Previous Price: ₹${previous.toFixed(2)}
🔥 You save ${discountPercentage}%! 🔥
Stay tuned for more amazing deals every day!
Thanks for being part of TR Deals!
`;
    } else if (discountPercentage > 10) {
      description = `
🎉 Hot Deal Alert! 🎉

Snag this fantastic product at an unbeatable price!

🔗 Grab it here: ${affiliateLink}
💰 Current Price: ₹${current.toFixed(2)}
💸 Previous Price: ₹${previous.toFixed(2)}

🔥 Save ${discountPercentage}% today! 🔥

Don’t miss out — check back daily for fresh, amazing deals!

Thanks for being with TR Deals!
`;
    } else {
      description = `
✨ Special Price Just For You! ✨
Treat yourself today—this product comes with a nice little saving!
🔗 Shop here: ${affiliateLink}
💰 Current Price: ₹${current.toFixed(2)}
💸 Previous Price: ₹${previous.toFixed(2)}
You save ${discountPercentage}%—every bit counts!
Stay tuned with TR Deals for more offers every day!
`;
    }

    setGeneratedText(description.trim());
  }, [affiliateLink, currentPrice, previousPrice]);

  // Function to copy the generated text to the clipboard
  const copyToClipboard = useCallback(() => {
    // Fallback method using document.execCommand('copy') which is more reliable in this environment
    const textArea = document.createElement('textarea');
    textArea.value = generatedText;
    // Make the textarea invisible
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      // Show a temporary message instead of an alert
      const messageBox = document.getElementById('message-box');
      if (messageBox) {
        messageBox.textContent = 'Copied to clipboard!';
        messageBox.classList.remove('hidden');
        setTimeout(() => {
          messageBox.classList.add('hidden');
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
    } finally {
      document.body.removeChild(textArea);
    }
  }, [generatedText]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-green-400">Affiliate Link Generator</h1>
        <p className="text-center text-gray-400 mb-8">
          Enter your deal details and generate a formatted message for your channels.
        </p>

        {/* Input Form */}
        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="affiliateLink" className="block text-sm font-medium text-gray-400 mb-1">
              Affiliate Link
            </label>
            <input
              id="affiliateLink"
              type="url"
              value={affiliateLink}
              onChange={(e) => setAffiliateLink(e.target.value)}
              placeholder="https://affiliate.link/product"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-400 mb-1">
                Current Price (₹)
              </label>
              <input
                id="currentPrice"
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
                placeholder="e.g., 499.00"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <label htmlFor="previousPrice" className="block text-sm font-medium text-gray-400 mb-1">
                Previous Price (₹)
              </label>
              <input
                id="previousPrice"
                type="number"
                value={previousPrice}
                onChange={(e) => setPreviousPrice(e.target.value)}
                placeholder="e.g., 999.00"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={generateDescription}
            className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Generate Description
          </button>
        </div>

        {/* Output Display */}
        {generatedText && (
          <div className="mt-8 bg-gray-900 p-6 rounded-lg border border-gray-700 relative">
            <h2 className="text-xl font-semibold mb-3 text-green-400">Your Generated Message:</h2>
            <div className="bg-gray-700 p-4 rounded-lg text-gray-200 leading-relaxed whitespace-pre-wrap">
              {generatedText}
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-4 w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Copy to Clipboard
            </button>
             {/* Custom message box for copy confirmation */}
            <div id="message-box" className="hidden absolute top-4 right-4 bg-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-lg transition-opacity duration-300">
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

