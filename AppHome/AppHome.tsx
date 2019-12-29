//

import React from 'react';
import {useLocalizedResourcesFromContext} from 'src/graphic/mui-lib/hooks/useLanguage';
import {LayoutAppHeader} from '../../components/LayoutAppHeader';
import {AppMenus} from '../AppMenus/AppMenus';
import {GoalHome} from '../GoalHome/GoalHome';
import {IGoal} from '../resources/typed-goals';
import {RB} from './resources';
import {useStyles} from './styles';

interface IProps {}

export const AppHome = React.memo<IProps>(() => {
	const cls = useStyles();
	const R = useLocalizedResourcesFromContext(RB);

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
			title={R.title}
			body={menuItem ? renderGoalPage() : renderPageBody()}
			nav={<AppMenus selectedMenuItem={menuItem} onSelected={setMenuItem}/>}
		/>
	);
});
