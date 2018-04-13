export default function() {
  const lang = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  return lang.split('-')[0];
}
