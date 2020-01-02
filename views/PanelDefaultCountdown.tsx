//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconTrailOff from '@material-ui/icons/HourglassEmpty';
import IconTrailOn from '@material-ui/icons/HourglassFull';
import {useLocalizedResourcesFromContext} from 'src/mui-lib/hooks/useLanguage';
import {newCountDownPrimaryAndSecondaryBundle} from '../resources/constructors';
import {countWorkAndFreeDays} from '../resources/countdown-by-week-and-working-days';
import {ICountDownPrimaryAndSecondaryBundle} from '../resources/typed-countdowns';
import {IGoal} from '../resources/typed-goals';
import {IndicatorProgressBar} from './IndicatorProgressBar';
import {RB} from './PanelCountdown.resources';

export const useStyles = makeStyles({
	ctn: {margin: '8px'},
	header: {display: 'flex', alignItems: 'center'},
	heading: {fontWeight: 'bold', color: '#666', fontSize: 'large'},
	description: {fontStyle: 'italic', color: '#aaa'},

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
	goal: IGoal;
	days: ICountDownPrimaryAndSecondaryBundle;
}

const and = (...values: (string | number)[]) => values.join(' ');

// The default/simple countdown by days and hours.
export const PanelDefaultCountdown = React.memo((
	{
		goal, days,
		freeHoursPerFreeDay = FREE_HOURS_PER_FREE_DAY, freeHoursPerWorkingDay = FREE_HOURS_PER_WORKING_DAY, workingHoursPerWorkingDay = WORKING_HOURS_PER_WORKING_DAY,
	}: IProps,
) => {
	const cls = useStyles();
	const R = useLocalizedResourcesFromContext(RB);

	const [trail, setTrail] = React.useState(false);
	const [trailDays, setTrailDays] = React.useState(undefined as ICountDownPrimaryAndSecondaryBundle | undefined);

	React.useEffect(() => {
		if (!trail) {return;}
		const start = new Date();
		let i = 0;
		const t = setInterval(() => {
			i++;
			const res = countWorkAndFreeDays(+start + i * 3600 * 24000, goal.dateDue || '2020-01-21', ['2020-01-19'], ['2020-01-01']);
			if (res.total <= 0) {
				console.log('end of the end -/>', res);
				setTrail(false);
				return;
			}
			const days = newCountDownPrimaryAndSecondaryBundle(res.freedays, res.workdays, 'd');
			console.log('calculated:', res, days);
			setTrailDays(days);
		}, 999);
		return () => {
			console.log('end of the end -+>');
			clearInterval(t);
		};
	}, [trail]);

	// Set the cached unit, overriding the original one.
	days.unit = R.readableUnitDay;

	const realDays = days;
	const realHours = newCountDownPrimaryAndSecondaryBundle(
		days.primary * freeHoursPerFreeDay + days.secondary * freeHoursPerWorkingDay,
		days.secondary * workingHoursPerWorkingDay,
		R.readableUnitHour, (value: number) => value > 50 ? (Math.floor(value / 8) + 'd' + (value % 8 === 0 ? '' : ' ' + (value % 8) + 'h')) : value + 'h',
	);

	days = trail ? trailDays || realDays : realDays;
	const hours = trail ? newCountDownPrimaryAndSecondaryBundle(
		days.primary * freeHoursPerFreeDay + days.secondary * freeHoursPerWorkingDay,
		days.secondary * workingHoursPerWorkingDay,
		R.readableUnitHour, (value: number) => value > 50 ? (Math.floor(value / 8) + 'd' + (value % 8 === 0 ? '' : ' ' + (value % 8) + 'h')) : value + 'h',
	) : realHours;

	const onToggleTrail = () => setTrail(!trail);

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

	const renderTrailIndicators = () => trail ? (
		<div>
			<IndicatorProgressBar
				total={realDays.total} primary={days.primary} secondary={days.secondary} label2={days.primary + 'd'} label={days.total + 'd'}/>
			<IndicatorProgressBar
				total={realHours.total} primary={hours.primary} secondary={hours.secondary} label2={hours.primary + 'h'} label={hours.total + 'h'}/>
		</div>
	) : undefined;

	// Math.round(days.total / realDays.total * 100)
	// Math.round(hours.total / realHours.total * 100)
	return (
		<div className={cls.ctn}>
			<div className={cls.header}>
				<div className={cls.heading} title={R.description}>{R.title}</div>
				<IconButton color='secondary' size='small' onClick={onToggleTrail}>{trail ? <IconTrailOn/> : <IconTrailOff/>}</IconButton>
				{goal.dateDue && goal.dateFrom ? <div className={cls.description}>Due {goal.dateDue}; From {goal.dateFrom}</div> : undefined}
			</div>
			<div className={cls.card}>
				{renderRow(days, [R.totalDays, R.weekends, R.weekdays])}
				{renderRow(hours, [R.totalHours, R.freeHours, R.workingHours])}
				{renderTrailIndicators()}
			</div>
		</div>
	);
});
