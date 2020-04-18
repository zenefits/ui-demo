export default function(errorString: string) {
  if (__DEVELOPMENT__) {
    throw new Error(errorString);
  } else {
    console.error(errorString);
  }
}
