"use client"
import { useEffect, useState } from "react";

import Axios from "axios";
import Image from "next/image";

interface Game {
    id: string;
    name: string;
    cover: {
        image_id: string;
        url: string;
    };
    slug: string;
    game_localizations: {
        name: string;
        region: number;
    }
}

export default function page() {


    const [games, setGames] = useState<Game[]>([]);


    const fetchData = async () => {
        let requestBody = "fields name,cover.url,cover.image_id; where rating > 90; limit 20;"
        await Axios.post('/api/igdb', { body: requestBody })
            .then((res) => {
                setGames(res.data);
            })
    }

    useEffect(() => {
        let ignore = false;
        async function startFetch() {
            if (!ignore) {
                fetchData();
            }
        }
        startFetch();
        console.log("fetching data");
        return () => { ignore = true; }
    }, [])

    return (
        <>
            {games.map((Game) =>
                <div key={Game.id}>
                    <img
                        width={300}
                        height={400}
                        src={"https://images.igdb.com/igdb/image/upload/t_1080p/" + Game.cover.image_id + ".jpg"}
                        title={Game.slug}
                        alt="Game Cover"
                    />
                    <h1>
                        {Game.name}
                    </h1>
                </div >
            )
            }
        </>
    )


}