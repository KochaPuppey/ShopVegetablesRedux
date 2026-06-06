import { useEffect, useState } from 'react';
import BaseButton from '../../UI/BaseButton'
import styles from './ListCard.module.css'
import Counter from '../../UI/Counter'
import BaseLoader from '../../UI/BaseLoader'
import Cart from '../Cart/Cart';
import type {Card} from '../../types/Card'
import {useTypedDispatch, useTypedSelector} from '../../hooks/redux';
import {fetchCart} from '../../reducers/TodoThunk';
import {addCard, addCardCount} from '../../reducers/TodoSlice';

type ListCard = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

function ListCard ({isOpen, setOpen}:ListCard ) {
  const [counts, setCounts] = useState <Record <number, number>>({});
  const {listCard, isLoading, error} = useTypedSelector (state => state.todoReducer)
  const dispatch = useTypedDispatch();
  useEffect ( () => {
    dispatch(fetchCart())
  },[])
  function handleClick (card:Card) {
    const count = counts[card.id] ?? 1
    dispatch(addCard({card,count}))
    setOpen (true)
  }
  function handleCartCount(id: number, value: number) {
    dispatch(addCardCount({id, value}))
  }
  return (
      <>
        {error && <span>{error}</span>}
        <div className={styles.container}>
          <Cart
                isOpen = {isOpen}
                setOpen = {setOpen}
                setCount = {handleCartCount}/>
          <h2 className={styles.title}>Каталог</h2>
          <div className = {styles.list}>
            { !isLoading ? (
                listCard.map((card: Card) => {
                      const [title, weight] = card.name.split(' - ')
                      return (
                          <div key={card.id} className={styles.card}>
                            <img src = {card.image} alt={card.name} width='150px' height='150px'/>
                            <div className={styles.name}>
                              <b>{title}</b> <span style = {{fontWeight:100, color:'grey'}}>{weight}</span>
                              <Counter count={counts[card.id] ?? 1} setCount={(value) => setCounts(prev => ({...prev, [card.id]:value} ))}/>
                            </div>
                            <div className={styles.price}>
                              <b>$ {card.price}</b>
                              <BaseButton variant = 'light' onClick={() => handleClick(card)}>Добавить в корзину</BaseButton>
                            </div>
                          </div>
                      )
                    }
                )
            ):(
                <BaseLoader/>
            )}
          </div>
        </div>
      </>
  );
}

export default ListCard