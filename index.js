addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  // Request the URLs from the API and store as a variable (account for async)
  let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  let data = await response.json();

  // Create a randomizer (~50%)
  // Math.random() returns a value from 0 to 1(exclusive)
  // 50% chance by separating at Math.random() < 0.5
  // Same as setting index to 1 and changing to 0 about 50% of the time
  let randomVariantIndex = 1;
  if (Math.random() < 0.5) {
    randomVariantIndex = 0;
  }

  // Get the random URL
  let variant = data.variants[randomVariantIndex];

  // Request a variant, fetch (CAN RETURN THIS! BUT... LET'S REDIRECT.)
  let variantResponse = await fetch(variant);

  // Redirect to the randomly selected webpage
  var redirect = Response.redirect(variant, 302);

  // Check the data we got
  return redirect;
}
