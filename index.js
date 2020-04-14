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

  // Check the data we got
  return new Response(JSON.stringify(data));
}
