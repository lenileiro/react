import React from 'react'

function Home(props) {
    console.log(props.staticContext)
    return (
        <div>
            <div class="min-h-screen flex items-center justify-center">
                <h1 class="text-5xl text-purple-600 font-sans">Greetings</h1>
            </div>
        </div>
    )
}

export default Home
