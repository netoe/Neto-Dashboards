//

import React from 'react';
import {ICountdownEntry, ICountDownPrimaryAndSecondaryBundle} from '../resources/typed-countdowns';
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	ctn: {margin: '8px'},
	heading: {fontWeight: 'bold', color: '#666'},
	card: {background: 'white', borderRadius: '12px', padding: '8px', margin: '8px 0', display: 'flex', textAlign: 'center'},

	item: {margin: '8px 12px'},
	label: {color: '#aaa', margin: '8px'},
	value: {fontSize: 'xx-large', fontWeight: 'bold', margin: '8px'},

	total: {color: '#555'},
	primary: {color: '#3a3'},
	secondary: {color: '#fa4'},
});

interface IProps {
	countdown: ICountdownEntry<ICountDownPrimaryAndSecondaryBundle>;
}

export const CardCountdownEntry = React.memo(({countdown}: IProps) => {
	const cls = useStyles();
	const {name, description, labels, colors, bundle} = countdown;
	const {total, primary, secondary, unit = '', render} = bundle;

	const renderValue = (value: number) => render ? render(value) : value;

	return (
		<div className={cls.ctn}>
			<div className={cls.heading} title={description}>{name}</div>
			<div className={cls.card}>
				<div className={cls.item}>
					<div className={cls.label}>{labels[0]}</div>
					<div className={cls.value + ' ' + cls.total} title={total + unit}>{renderValue(total)}</div>
				</div>
				<div className={cls.item}>
					<div className={cls.label}>{labels[1]}</div>
					<div className={cls.value + ' ' + cls.primary} title={primary + unit}>{renderValue(primary)}</div>
				</div>
				<div className={cls.item}>
					<div className={cls.label}>{labels[2]}</div>
					<div className={cls.value + ' ' + cls.secondary} title={secondary + unit}>{renderValue(secondary)}</div>
				</div>
			</div>
		</div>
	);
});