
function Seccion({clase, titulo, children}){

    return(
        <>
            <section className={clase}>
                {titulo && <h1>{titulo}</h1>}
                {children}
            </section>
        </>
    )
}

export default Seccion