import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';

export const store = configureStore({
	reducer:{
		user: userSlice
	}
});

store.subscribe(() => {
	saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);
});

// тип общего состояния
export type RootState = ReturnType<typeof store.getState>;
// тип дисппетча
export type AppDispath = typeof store.dispatch;
