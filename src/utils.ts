import { TIsValidHttpUrlParams } from '@pkg/types.ts'

const isValidHttpUrl = ({ url }: TIsValidHttpUrlParams): boolean => {
	try {
		const newUrl = new URL(url)
		return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
	} catch (err) {
		return false
	}
}

const getTimestamp = ({ type = 'log' }: { type: 'log' | 'pdf' }): string => {
	const now = new Date()
	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')
	const hours = String(now.getHours()).padStart(2, '0')
	const minutes = String(now.getMinutes()).padStart(2, '0')
	const seconds = String(now.getSeconds()).padStart(2, '0')
	return type === 'log'
		? `${year}-${month}-${day}`
		: `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`
}

const generateFileName = (prefix: string, ext: 'log' | 'pdf'): string => {
	const timestamp = getTimestamp({ type: ext })
	return `${prefix}_${timestamp}.${ext}`
}

const humanizeDuration = (durationMs: number): string => {
	const secondsTotal = Math.round(durationMs / 1000)
	const seconds = secondsTotal % 60
	const minutesTotal = Math.floor(secondsTotal / 60)
	const minutes = minutesTotal % 60
	const hoursTotal = Math.floor(minutesTotal / 60)
	const hours = hoursTotal % 24
	const days = Math.floor(hoursTotal / 24)

	let humanized = ''
	if (days > 0) humanized += `${days}d `
	if (hours > 0) humanized += `${hours}h `
	if (minutes > 0) humanized += `${minutes}m `
	if (seconds > 0 || (days === 0 && hours === 0 && minutes === 0)) {
		humanized += `${seconds}s`
	}

	return humanized.trim()
}

export { generateFileName, getTimestamp, humanizeDuration, isValidHttpUrl }
