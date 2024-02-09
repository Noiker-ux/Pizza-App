import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadState } from './storage';
import axios from 'axios';
import { PREFIX } from '../helpers/API';
import { ILoginResponce } from '../interfaces/IAuth';
import { IProfile } from '../interfaces/IUser';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface IUserSlice {
    jwt: string | null;
	loginErrorMessage?: string;
	profile?: IProfile;
	registerErrorMessage?: string;
}

export interface UserPersistentState {
	jwt: string | null;
}



const initialState: IUserSlice =  {
	jwt: LoadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ??  null
};


export const getProfile = createAsyncThunk<IProfile, void, { state: RootState}>('user/getprofile', 
	async (_, thunkAPI) => {
		const jwt = thunkAPI.getState().user.jwt;
		const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
	}
);

export const register = createAsyncThunk('user/register', 
	async (params: {email: string, password: string, name:string}) => {
		try{
			const { data } = await axios.post<ILoginResponce>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch (e){
			if(e instanceof axios.AxiosError){
				throw new Error(e.response?.data.message);
			}
		}
	}
);


export const login = createAsyncThunk('user/login', 
	async (params: {email: string, password: string}) => {
		try{
			const { data } = await axios.post<ILoginResponce>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch (e){
			if(e instanceof axios.AxiosError){
				throw new Error(e.response?.data.message);
			}
		}
	}
);




export const userSlice = createSlice(
	{
		name:'userSlice',
		initialState: initialState,
		reducers: {
			logoutUserSlice: (state) => {
				state.jwt = '';
			},
			clearLoginError: (state) => {
				state.loginErrorMessage = undefined;
			},
			clearRegisterError: (state) => {
				state.registerErrorMessage = undefined;
			}
		},
		extraReducers: (builder) => {
			builder.addCase(login.fulfilled, (state, action) => {
				if(!action.payload){
					return;
				}
				state.jwt = action.payload.access_token;
			});
			builder.addCase(login.rejected, (state, action) => {
				state.loginErrorMessage = action.error.message;
			});
			builder.addCase(getProfile.fulfilled, (state, action) => {
				state.profile = action.payload;
			});
			builder.addCase(register.fulfilled, (state, action) => {
				if(!action.payload){
					return;
				}
				state.jwt = action.payload.access_token;
			});
			builder.addCase(register.rejected, (state, action) => {
				state.registerErrorMessage = action.error.message;
			});
		}
	}
);


export default userSlice.reducer;
export const userActions = userSlice.actions;