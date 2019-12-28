'use strict';

import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	ctnPage: {margin: '24px 0'},
	ctnSections: {display: 'flex'},
	ctnLeftSections: {flex: 1, width: 0},
	ctnRightSections: {flex: 1, width: 0},
	ctnSection: {display: 'flex', flexFlow: 'row wrap'},
});
