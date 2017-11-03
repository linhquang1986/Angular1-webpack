const prefix = "THX_LOCAL_";
function saveLS(key, data) {
  if (!key || !data) return;
  data = JSON.stringify(data);
  key = key.toString();
  key = prefix + key;
  window.localStorage.setItem(key, data);
}

function getLS(key) {
  if (!key) return;
  key = key.toString();
  key = prefix + key;
  let data = window.localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (e) {
    data = data;
  }
  return data;
}

function removeLS(key) {
  if (!key) return;
  key = key.toString();
  key = prefix + key;
  window && window.localStorage && window.localStorage.removeItem(key);
}

export { saveLS, getLS, removeLS };
