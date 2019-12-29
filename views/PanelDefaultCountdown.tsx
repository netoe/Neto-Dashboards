//

import React from 'react';
import {useLocalizedResourcesFromContext} from '../../mui-lib/hooks/useLanguage';
import {newCountDownPrimaryAndSecondaryBundle} from '../resources/constructors';
import {ICountDownPrimaryAndSecondaryBundle} from '../resources/typed-countdowns';
import {makeStyles} from '@material-ui/core/styles';
import {RB} from './PanelCountdown.resources';

export const useStyles = makeStyles({
	ctn: {margin: '8px'},
	heading: {fontWeight: 'bold', color: '#666'},

	card: {margin: '16px 0', padding: '8px', background: 'white', borderRadius: '16px', display: 'flex', flexFlow: 'column', textAlign: 'center'},
	//{background: 'white', borderRadius: '12px', padding: '8px', margin: '8px 0', display: 'flex', textAlign: 'center'},
	row: {display: 'flex'},

	item: {margin: '8px 12px', flex: 1},
	label: {color: '#aaa', margin: '8px'},
	value: {fontSize: 'xx-large', fontWeight: 'bold', margin: '8px'},

	total: {color: '#555'},
	primary: {color: '#3a3'},
	secondary: {color: '#fa4'},
});

const FREE_HOURS_PER_FREE_DAY = 11;
const FREE_HOURS_PER_WORKING_DAY = 5;
const WORKING_HOURS_PER_WORKING_DAY = 8;

interface IDaysToHoursOptions {
	freeHoursPerFreeDay?: number;
	freeHoursPerWorkingDay?: number;
	workingHoursPerWorkingDay?: number;
}

interface IProps extends IDaysToHoursOptions {
	days: ICountDownPrimaryAndSecondaryBundle;
}

const and = (...values: (string | number)[]) => values.join(' ');

// The default/simple countdown by days and hours.
export const PanelDefaultCountdown = React.memo((
	{
		days,
		freeHoursPerFreeDay = FREE_HOURS_PER_FREE_DAY, freeHoursPerWorkingDay = FREE_HOURS_PER_WORKING_DAY, workingHoursPerWorkingDay = WORKING_HOURS_PER_WORKING_DAY,
	}: IProps,
) => {
	const cls = useStyles();
	const R = useLocalizedResourcesFromContext(RB);

	// Set the cached unit, overriding the original one.
	days.unit = R.readableUnitDay;

	const hours = newCountDownPrimaryAndSecondaryBundle(
		days.primary * freeHoursPerFreeDay + days.secondary * freeHoursPerWorkingDay,
		days.secondary * workingHoursPerWorkingDay,
		R.readableUnitHour, (value: number) => value > 50 ? (Math.floor(value / 8) + 'd' + (value % 8 === 0 ? '' : ' ' + (value % 8) + 'h')) : value + 'h',
	);


	const renderRow = (
		{total, primary, secondary, unit = '', render}: ICountDownPrimaryAndSecondaryBundle,
		[lTotal, labelPrimary, labelSecondary]: string[],
	) => (
		<div className={cls.row}>
			<div className={cls.item}>
				<div className={cls.label}>{lTotal}</div>
				<div className={and(cls.value, cls.total)} title={and(total, unit)}>{render ? render(total) : total}</div>
			</div>
			<div className={cls.item}>
				<div className={cls.label}>{labelPrimary}</div>
				<div className={and(cls.value, cls.primary)} title={and(primary, unit)}>{render ? render(primary) : primary}</div>
			</div>
			<div className={cls.item}>
				<div className={cls.label}>{labelSecondary}</div>
				<div className={and(cls.value, cls.secondary)} title={and(secondary, unit)}>{render ? render(secondary) : secondary}</div>
			</div>
		</div>
	);

	return (
		<div className={cls.ctn}>
			<div className={cls.heading} title={R.description}>{R.title}</div>
			<div className={cls.card}>
				{renderRow(days, [R.totalDays, R.weekends, R.weekdays])}
				{renderRow(hours, [R.totalHours, R.freeHours, R.workingHours])}
			</div>
		</div>
	);
});