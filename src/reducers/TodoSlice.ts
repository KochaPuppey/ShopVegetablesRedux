import {createSlice} from '@reduxjs/toolkit';
import {fetchCart} from './TodoThunk.ts';
import type {Card} from '../types/Card'

interface CartState {
    listCard: Card [],
    isLoading: boolean,
    error: null | string,
    cart: Card [],
}

const initialState: CartState = {
    listCard: [],
    isLoading: false,
    error: null,
    cart: [],
}

const setError = (state,action) => {
    state.isLoading = false;
    state.error = action.payload;
}

export const TodoSlice = createSlice({
    name: 'listCard',
    initialState,
    reducers: {
        addCard(state,action) {
            const {card, count} = action.payload
            const alreadyAdd = state.cart.find((item) => item.id === card.id);
            if (alreadyAdd) {
                alreadyAdd.selected = (alreadyAdd.selected ?? 0) + count;
            }
            else {state.cart.push( {...card, selected: count})}
        },
        addCardCount (state,action) {
            const {id, value} = action.payload
            const CardCount = state.cart.find(item => item.id === id);
            if (CardCount) {
            CardCount.selected = value;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listCard = action.payload
            })
            .addCase(fetchCart.rejected, setError)
    }
})

export const {addCard,addCardCount} = TodoSlice.actions;

export default TodoSlice.reducer