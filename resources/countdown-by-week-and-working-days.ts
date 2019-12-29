//

type df = string | number | Date

// Constructor for Day(date without time).
const newDay = (day: df = 0): number => Math.floor(new Date(day).setUTCHours(0, 0, 0, 0) / 3600 / 24000);

interface IResWeekdaysAndWeekends {
	total: number;
	weekends: number;
	weekdays: number;
	// The total weeks
	// weeks: number;
	byWeeks: boolean[];
}

// Get weekdays and weekends.
export const countWeekdaysAndWeekends = (start: df = new Date(), due: df): IResWeekdaysAndWeekends => {
	const d = newDay(start);
	const total = newDay(due) - d + 1;
	if (total <= 0) {return {total: total - 1, weekends: -1, weekdays: -1, byWeeks: []};}
	// The first is the current day, and the last one is the due day.
	// The local time should be used, to keep the representing date right of the original due.
	const byWeeks = new Array(total).fill(false).map((value, ith) => !([0, 6].includes(new Date((d + ith) * 3600 * 24000).getDay())));
	const weekdays = byWeeks.reduce((n, v) => v ? n + 1 : n, 0);
	return {total, weekdays, weekends: total - weekdays, byWeeks};
};

interface IResWorkAndFreeDays extends IResWeekdaysAndWeekends {
	workdays: number;
	freedays: number;
	byWorks: boolean[];
}

// Get workdays and freedays with custom includes and excludes.
export const countWorkAndFreeDays = (start: df = new Date(), due: df, onWorkDays: df[], offWorkDays: df[]): IResWorkAndFreeDays => {
	const res = countWeekdaysAndWeekends(start, due);
	const d = newDay(start);
	if (res.total <= 0) {return {...res, workdays: -1, freedays: -1, byWorks: []};}
	onWorkDays = onWorkDays.map(d => newDay(d));
	offWorkDays = offWorkDays.map(d => newDay(d));
	const byWorks = res.byWeeks.map((value, ith) => onWorkDays.includes(newDay((d + ith) * 3600 * 24000)) || (offWorkDays.includes(newDay((d + ith) * 3600 * 24000)) ? false : value));
	const workdays = byWorks.reduce((n, v) => v ? n + 1 : n, 0);
	return {...res, workdays, freedays: res.total - workdays, byWorks};
};
