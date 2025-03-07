import '../styles/card.css'

export default function Card({clickHandler, name='',img}) {
  return (
    <div className="card" onClick={clickHandler}>
      <img src={img} alt={name} />
      <h2>{name}</h2>
    </div>
  )
}