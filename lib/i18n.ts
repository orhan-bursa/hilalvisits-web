import { LocaleAll } from '@/types/locale'

export function isDefaultLocale(locale: string) {
	return locale === 'tr'
}

export function getLocaleURI(locale: string) {
	return isDefaultLocale(locale) ? '' : `/${locale}`
}
export function localizeURI(uri: string, locale: string) {
	const prefix = getLocaleURI(locale)
	return prefix + uri
}
