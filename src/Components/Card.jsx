
function Card({h}) {
    let { title, text } = h
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Card
