import { useReducer } from 'react'

const insertToHistory = (state) => {
  if (state && Array.isArray(state.history)) {
    // Do not mutate
    const newHistory = [...state.history]
    newHistory.push(state)
    return newHistory
  }
  console.warn(
    'WARNING! The state was attempting capture but something went wrong. Please check if the state is controlled correctly.',
  )
  return state.history || []
}

const initialState = {
  friends: [],
  history: [],
  theme: 'light',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'undo': {
      const isEmpty = !state.history.length
      if (isEmpty) return state
      return { ...state.history[state.history.length - 1] }
    }
    case 'reset':
      return { ...initialState, history: insertToHistory(state) }
    default:
      return state
  }
}

const useApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSubmit = (friend, resetValues) => (e) => {
    e.preventDefault()
    if (!friend.name) return
    dispatch({ type: 'add-friend', friend })
    resetValues()
  }

  const undo = () => {
    dispatch({ type: 'undo' })
  }

  const reset = () => {
    dispatch({ type: 'reset' })
  }

   
  return {
    ...state,
    onSubmit,
    undo,
    reset,
  }
}

export default useApp