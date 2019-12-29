//

// A general goal like project,
// containing countdowns, projects, tasks, schedules, plans, histories, and etc.
import {ICountdownEntry, ICountDownPrimaryAndSecondaryBundle} from './typed-countdowns';

export interface IGoal {
	_id: string;
	name: string;
	description?: string;
	// The general countdown by days and hours of the goal.
	countdown?: ICountDownPrimaryAndSecondaryBundle;
	countdowns?: ICountdownEntry<any>[];
}
