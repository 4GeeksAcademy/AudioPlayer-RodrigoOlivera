import React, { useEffect, useRef, useState } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faChevronLeft, faPause, faChevronRight } from '@fortawesome/free-solid-svg-icons'
//create your first component
const Home = () => {
	const styleicon = {
		color: "white",
		fontSize: "50px"

	}
	const stylePadre = {
		maxHeight: "500px",
		overflow: "auto"

	}
	const padreSongs = {

	}
	const styleButton = {
		width: "100%"
	}

	const [songs, setSongs] = useState([])
	const [selected, setSelected] = useState(0)
	const [statusSong, setStatusSong] = useState("Reproducir")
	const [urlSong, setUrl] = useState("")

	console.log(songs)

	const traerInfo = () => {
		fetch("https://playground.4geeks.com/apis/fake/sound/songs")
			.then((response) => response.json())
			.then((data) => setSongs(data))
			.catch((error) => console.log(error))
	}
	useEffect(() => {
		traerInfo()
	}, [])

	// funcion que pase a la siguiente 
	const Siguiente = () => {
		if (selected === 20) {
			setSelected(1)
			const valueId = 1
			const urlUpdate = songs.find((song) => {
				return song.id === valueId
			})
			setUrl(urlUpdate.url)
			setStatusSong("Pause")

		} else {
			const valueId = selected + 1
			setSelected(valueId)
			const urlUpdate = songs.find((song) => {
				return song.id === valueId
			})
			setUrl(urlUpdate.url)
			setStatusSong("Pause")

		}
	}
	// funcion que pase a la anterior
	const Anterior = () => {
		if (selected === 0) {
			setSelected(19)
			const valueId = 19
			const urlUpdate = songs.find((song) => {
				return song.id === valueId
			})
			setUrl(urlUpdate.url)
			setStatusSong("Pause")

		} else {
			const valueId = selected - 1
			setSelected(valueId)
			const urlUpdate = songs.find((song) => {
				return song.id === valueId
			})
			setUrl(urlUpdate.url)
			setStatusSong("Pause")

		}

	}

	const refAudio = useRef()

	const setUrlAndSelected = (id, url) => {
		setSelected(id)
		setUrl(url)

	}
	const reproducir = () => {
		if (statusSong === "Pause") {
			setStatusSong("Reproducir")
		} else if (statusSong === "Reproducir") {
			setStatusSong("Pause")
		}
		if (urlSong) {
			if (statusSong === "Reproducir") {
				refAudio.current.play()
			} else {
				refAudio.current.pause()

			}
		}
	}

	useEffect(() => {
		if (urlSong !== "" && statusSong === "Pause") {
			console.log(urlSong)
			refAudio.current.play()

		}
	}, [urlSong])


	return (
		<div className="container-fluid ">
			<div className="row mt-5" >
				<div className="col-8 p-0 m-auto d-flex flex-column " style={stylePadre} >
					{
						songs.map((song) => {
							return <div role="button" onClick={() => setUrlAndSelected(song.id, song.url)} style={styleButton} className={`row w-100 bg-dark opacity-${selected === song.id ? "75" : "100"}  p-0 border-0 m-auto border-bottom border-1 border-secondary  py-2 `} id={song.id}>
								<p className="col-1 text text-center text-secondary m-0 mx-3">{song.id}</p>
								<p className="col-3 text-white m-0 mx-3 ">{song.name}</p>
							</div>
						})
					}
				</div>
				<div className="col-8 bg-dark py-3 m-auto d-flex flex-row justify-content-around">
					<button onClick={Anterior} className="buttonAnterior bg-transparent border border-0 bg-none p-0" style={styleicon}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
					<button onClick={reproducir} className="Reproducir p-0 bg-transparent border border-0" style={styleicon}>
						{
							statusSong === "Reproducir" ? <FontAwesomeIcon icon={faPlay} /> : statusSong === "Pause" && <FontAwesomeIcon icon={faPause} />
						}

					</button>
					<button onClick={Siguiente} className="buttonSiguient p-0 bg-transparent border border-0" style={styleicon}>
						<FontAwesomeIcon icon={faChevronRight} />

					</button>
					<audio ref={refAudio} src={"https://assets.breatheco.de/apis/sound/" + urlSong}></audio>
				</div>
			</div>
		</div>
	);
};

export default Home;
