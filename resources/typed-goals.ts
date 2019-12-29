//

// A general goal like project,
// containing countdowns, projects, tasks, schedules, plans, histories, and etc.
import {ICountdownEntry, ICountDownPrimaryAndSecondaryBundle} from './typed-countdowns';

export interface IGoal {
	_id: string;
	name: string;
	description?: string;
	dateFrom?: string; // in the format of 2019-12-30
	dateDue?: string;
	// The general countdown by days and hours of the goal.
	countdown?: ICountDownPrimaryAndSecondaryBundle;
	countdowns?: ICountdownEntry<any>[];
}
