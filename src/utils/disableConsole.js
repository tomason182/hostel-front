export default function disableConsole() {
  if (import.meta.env.PROD) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
}
