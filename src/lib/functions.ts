export function handleRedirectToContact(): void {
  const contactSection = document.getElementById('Contato');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}
