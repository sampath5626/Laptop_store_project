const ADMIN_EMAIL = "samram5626@gmail.com";
const ADMIN_PASSWORD = "psrk@2004";

export function isAdminCredentials(email, password) {
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  );
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

export function isAdmin(user = getCurrentUser()) {
  return (
    user?.isAdmin === true &&
    String(user.email || "").toLowerCase() === ADMIN_EMAIL
  );
}