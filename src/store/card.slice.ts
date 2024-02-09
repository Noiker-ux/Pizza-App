import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ICartItem {
	id: number;
	count: number;
}

export interface ICartState {
	items: ICartItem[];
}

const initialState: ICartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cardSlice',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id == action.payload);
			if (!existed){
				state.items.push({ id: action.payload, count: 1});
				return;
			}
			state.items.map(i => {
				if (i.id==action.payload){
					i.count += 1;
				}
				return i;
			});
		}
	}
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;