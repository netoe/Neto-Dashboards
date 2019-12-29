//

import React from 'react';
import {ICountdownEntry, ICountDownPrimaryAndSecondaryBundle} from './typed-countdowns';
import {IGoal} from './typed-goals';

export const newDashboardGoal = (_id: string, name: string, countdown?: ICountDownPrimaryAndSecondaryBundle, countdowns?: ICountdownEntry<any>[], description?: string): IGoal =>
	({_id, name, countdown, countdowns, description});
export const newCountdown = <T>(name: string, labels: string[], bundle: T, description?: string): ICountdownEntry<T> =>
	({name, labels, bundle, description});
export const newCountDownPrimaryAndSecondaryBundle = (primary: number, secondary: number, unit?: string, render?: (value: number) => React.ReactNode): ICountDownPrimaryAndSecondaryBundle => ({
	total: primary + secondary, primary, secondary,
	unit, render,
});
