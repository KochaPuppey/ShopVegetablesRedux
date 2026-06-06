import {createAsyncThunk} from '@reduxjs/toolkit';

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    selected: number;
}

export const fetchCart = createAsyncThunk <Product [], void, {rejectValue:string}> (
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
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
            else {
                return rejectWithValue('Неизвестная ошибка')
            }
        }
    }
)