// TODO: unify with what we have in zen-js and ui-infra and merge it
export default function getCookie(name: string) {
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i = i + 1) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
  }
  return null;
}
