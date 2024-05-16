import cl from './SideDisplay.module.css'


interface IsideDisplayProps {
  text: string,
  value: number,
}


export default function SideDisplay({text,value}: IsideDisplayProps) {
  return (
    <div className={cl.wrapper}>
      <div className={cl.wrapper_text}>{text}</div>
      <div className={cl.wrapper_value}>{value}</div>
    </div>
  )
}
