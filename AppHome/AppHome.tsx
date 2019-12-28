//

import React from 'react';
import {LayoutAppHeader} from '../../components/LayoutAppHeader';
import {AppMenus} from '../AppMenus/AppMenus';
import {GoalHome} from '../GoalHome/GoalHome';
import {IGoal} from '../resources/typed-goals';
import {R} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

export const AppHome = React.memo<IProps>(() => {
	const cls = useStyles();
	const [menuItem, setMenuItem] = React.useState(undefined as IGoal | undefined);

	const renderPageBody = () => (
		<div className={cls.page} style={{padding: 18}}>
			<h1>Hello, this is the primary dashboards of Neto Desktop.</h1>
		</div>
	);

	const renderGoalPage = () => menuItem ? (
		<div className={cls.page}>
			<GoalHome goal={menuItem}/>
		</div>
	) : undefined;

	return (
		<LayoutAppHeader
			title={title} body={menuItem ? renderGoalPage() : renderPageBody()}
			nav={<AppMenus selectedMenuItem={menuItem} onSelected={setMenuItem}/>}
		/>
	);
});
