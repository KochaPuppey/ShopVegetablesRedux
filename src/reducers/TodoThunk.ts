import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCart = createAsyncThunk (
    'listCard/fetchCart',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch (`https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json`);
            if (!response.ok) {
                throw new Error (`Ошибка при запросе на сервер`)
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            return rejectWithValue(error?.message)
        }
    }
)