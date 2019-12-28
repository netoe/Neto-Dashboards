//

import {newCountdown, newCountDownPrimaryAndSecondaryBundle, newDashboardGoal} from './constructors';
import {ICountDownPrimaryAndSecondaryBundle} from './typed-countdowns';

const FREE_HOURS_PER_FREE_DAY = 11;
const FREE_HOURS_PER_WORKING_DAY = 5;
const WORKING_HOURS_PER_WORKING_DAY = 8;

// Counted on 2019-12-28(excluded).
// The week-ending days before 2020-01-21 are 7.
// The week days before 2020-01-21(included) are 17.
const days = newCountDownPrimaryAndSecondaryBundle(7, 17, 'd');
const cdDays = newCountdown<ICountDownPrimaryAndSecondaryBundle>(
	'Countdown By Days', ['Total Days', 'Weekends', 'Weekdays'], days,
	'',
);
const cdHours = newCountdown<ICountDownPrimaryAndSecondaryBundle>(
	'Countdown By Hours', ['Total Hours', 'Free Hours', 'Working Hours'],
	newCountDownPrimaryAndSecondaryBundle(
		days.primary * FREE_HOURS_PER_FREE_DAY + days.secondary * FREE_HOURS_PER_WORKING_DAY,
		days.secondary * WORKING_HOURS_PER_WORKING_DAY,
		'h',
		(value: number) => value > 50 ? (Math.floor(value / 8) + 'd' + (value % 8 === 0 ? '' : ' ' + (value % 8) + 'h')) : value + 'h',
	),
	// {total: 23, primary: 28, secondary: days.secondary * 8},
	'',
);

const countdowns = [
	cdDays,
	cdHours,
];

const goalMillstone2019to2020 = newDashboardGoal('millstone', 'Millstone(2020-01-21)', countdowns, '');

export const mocked = {
	goalMillstone2019to2020,
	goals: [
		goalMillstone2019to2020,
	],
};
