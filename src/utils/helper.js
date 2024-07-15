export const getInitials = (name) => {
  if (!name) return '';
  const words = name.split(' ');
  let initials = '';
  for (const word of words) {
    initials += word[0].toUpperCase();
  }
  return initials;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
 