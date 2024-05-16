import cl from './GameOverModal.module.css'

interface IGameOverModalProps {
  score: number,
  reset: React.Dispatch<React.SetStateAction<number>>
}


export default function GameOverModal({score, reset}: IGameOverModalProps) {
  return (
    <div className={cl.wrapper}>
      <div className={cl.modalBlock}>
        <h1>Игра окончена</h1>
        <div className={cl.modalBlock_text}>Итоговый счет: {score}</div>
        <button className={cl.modalBlock_btn} onClick={() => reset(0)}>Сыграть ещё!</button>
      </div>
    </div>
  ) 
}
