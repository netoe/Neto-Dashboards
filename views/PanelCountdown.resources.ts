//

type IR = typeof R
const R = {
	title: 'Countdown',
	description: '',
	readableUnitDay: 'day(s)',
	readableUnitHour: 'hour(s)',
	totalDays: 'Total Days',
	weekends: 'Weekends',
	weekdays: 'Weekdays',
	totalHours: 'Total Hours',
	freeHours: 'Free Hours',
	workingHours: 'Working Hours',
};

const R_ZH: IR = {
	title: '倒计时',
	description: '',
	readableUnitDay: '天',
	readableUnitHour: '时',
	totalDays: '总天数',
	weekends: '周末天',
	weekdays: '工作日',
	totalHours: '总时数',
	freeHours: '空闲时',
	workingHours: '工作时',
};


export const RB = {df: R, en: R, zh: R_ZH};