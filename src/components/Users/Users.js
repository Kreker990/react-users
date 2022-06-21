import React, { useEffect, useState } from 'react'
import s from './Users.module.css'
import moon from '../../assets/images/moon.png'
import sun from '../../assets/images/sun.png'

import userimg from '../../assets/images/usermin.png'

export default function Users() {
    const [user, setUser] = useState()
    const [color, setColor] = useState(localStorage.getItem('theme'))
    const getUsers = async () => {
        const req = await fetch('https://jsonplaceholder.typicode.com/users')
        const res = await req.json()
        setUser(res)
    }

    if (localStorage.length==0){
        localStorage.setItem('theme','true')
    }

    useEffect(() => {
        getUsers()
    }, [])
    
    console.log(user);
    return (
        <div className={s.main}>
        <button className={s.button} onClick={()=>{
            color=='true' ? localStorage.setItem('theme','false') : localStorage.setItem('theme','true')
            setColor(localStorage.getItem('theme'))
        }}> <img alt='Theme' src={color=='false' ? moon : sun }/> </button>
            {
                user?.map(el => {
                    return (
                        <>
                        <div key={el.id} className={color=='false' ? s.conteiner : s.conteiner1}>
                        <div className={s.user}>
                            <img alt='User' src={userimg} />
                            <h3>{el.username} {el.name} </h3>
                        </div>
                        <div className={s.contacts}>
                            <h3>Contacts</h3>
                            <p><b>email:</b> {el.email}</p>
                            <p><b>phone:</b> {el.phone}</p>
                            <p><b>website:</b> {el.website}</p>
                        </div>
                        <div className={s.address}> 
                            <h3>Address</h3>
                            <p><b>city:</b> {el.address.city}</p>
                            <p><b>street:</b> {el.address.street}</p>
                            <p><b>suite:</b> {el.address.suite}</p>
                        </div>
                        </div>
                        <hr className={s.hr}/>
                        </>
                    )
                })
            }
        </div>
    )
}
