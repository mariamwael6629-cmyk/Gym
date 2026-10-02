// ---------- Helpers ----------
function splitLogoWords(name) {
  const parts = (name || '').split(' ');
  return { first: parts[0] || '', rest: parts.slice(1).join(' ') };
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null && value !== '') el.textContent = value;
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.setAttribute('href', value);
}
