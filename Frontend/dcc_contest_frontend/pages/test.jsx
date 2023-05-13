import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


export default function test() {

    const router = useRouter();
    const { loggedIn, role } = useSelector((state) => state.login);

    const [loginId, setloginId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <>
            <Head>
                <title>DCC : Test Page</title>
            </Head>
            <Navbar />
            <div className='content-area-top'>
                <div className="login-page-container">
                    <div className="login-form">
                        <div><strong>Login-form-1:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ab fuga porro ut praesentium similique quo autem necessitatibus, tenetur facilis incidunt eius, laudantium provident reprehenderit blanditiis mollitia error quibusdam deleniti ratione numquam vero iure ducimus. Esse dicta nihil repellendus accusantium inventore, asperiores ad tempora voluptatum doloribus quia, dolor tempore earum voluptatem delectus incidunt cum et libero aspernatur, debitis velit sunt nulla rem quod. Tempora sed, aperiam, vel ipsam illum dignissimos sit iste aliquid odit iure nulla ipsa possimus cupiditate reiciendis officia saepe sapiente in eaque, explicabo tenetur. Quibusdam.</div>
                        <div><strong>Login-form-2:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor expedita cupiditate cum, quibusdam impedit possimus doloribus vitae, quas facere nemo blanditiis labore quam corrupti magni. Ut cum tempora, reprehenderit, atque unde, sapiente sit quia esse incidunt sed ea illum! Numquam ratione et ipsam pariatur, quaerat corporis minus adipisci iste eos autem modi quibusdam officiis velit iusto ducimus aliquid dolorum cupiditate quisquam illo impedit, quos culpa. Repellat, illum. Reiciendis facere consequatur impedit, neque quibusdam autem ipsam quis laboriosam qui quaerat inventore explicabo modi eveniet eius libero ducimus voluptatem atque nulla. Sapiente obcaecati et dolorum sit id fuga repellendus doloremque vitae quos beatae delectus cupiditate laboriosam voluptatum facere, officia saepe atque veniam at. Libero sapiente non aperiam, aspernatur ea architecto doloribus natus iure maxime eos beatae saepe, vero officia nam rem cumque suscipit, vel ut laborum! Tempora voluptates animi nemo reiciendis. Voluptate aliquam non nihil exercitationem laudantium optio, veniam consequuntur deleniti placeat omnis in praesentium ea explicabo a incidunt similique delectus iste quae totam earum magni, illo vel qui? Iusto numquam magni consequatur, ea nostrum eum reprehenderit quibusdam, quos sit doloribus rerum unde nesciunt atque consequuntur, eos impedit? Ducimus similique aut dolor ad aperiam totam beatae, fugit alias odit dolorum. Quisquam harum voluptatibus possimus dignissimos ullam in saepe expedita minus reprehenderit! A, eum cum, ex quia nulla mollitia pariatur dolor assumenda debitis esse eligendi reiciendis numquam. Eum omnis libero deserunt fugiat dolor accusamus est neque blanditiis, nam commodi veniam sit quasi harum eveniet incidunt itaque quos architecto. </div>
                    </div>
                    <br/>
                    <br/>
                    <div><strong>Login-container-2:</strong> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim nobis, dolore laborum, mollitia amet possimus iusto aliquid soluta, cupiditate alias voluptates. Odio repudiandae laboriosam esse architecto libero odit eveniet ducimus?</div>
                </div>
                <div><strong>Content-area-top-2:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eveniet quo eius reiciendis soluta officia dolorum suscipit asperiores recusandae ea deleniti impedit delectus perferendis nesciunt veritatis magni eos, deserunt omnis. Iste porro ipsum dolor vel voluptatum natus, necessitatibus autem neque! Magnam dicta voluptatem, quaerat iusto atque rem esse expedita necessitatibus corrupti distinctio reiciendis fuga aliquam modi veritatis aperiam ducimus? Error accusamus minima possimus dolores, velit debitis laudantium est adipisci excepturi, eligendi ipsam aperiam tempora libero, rem earum vel a reprehenderit similique modi inventore eius illo facilis. Porro a fuga quidem.</div>
            </div>
            <div className='my-4'>Footer - Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore incidunt voluptatibus corporis. Harum quidem ipsam perspiciatis, fugit deleniti possimus aut minima natus, sapiente provident veniam laboriosam eveniet fugiat non alias.</div>
        </>
    )
}
