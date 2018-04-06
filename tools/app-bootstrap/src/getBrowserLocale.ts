export default function() {
  return (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
}
