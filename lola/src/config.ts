export const CONTACT = {
  phoneDisplay: '+992 750 545 471',
  phoneHref: 'tel:+992750545471',
  whatsappNumber: '992750545471',
  footerPhoneDisplay: '+992 113 55 07 07',
  footerPhoneHref: 'tel:+992113550707',
  address: 'г. Душанбе',
  hours: 'Ежедневно 9:00 – 21:00',
}

export function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} с.`
}

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}
