import {
    Box,
    Button,
    Typography
} from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from 'react-router-dom';
//import { CloseSharpIcon } from '@mui/icons-material/CloseSharp';
import { io } from 'socket.io-client';
import axios from "axios"
import { useEffect } from "react";

function WaitingPage() {
    const initialisePage = async () => {
        const socket = io("http://localhost:8001");
        socket.on("connect", async () => {
            await axios.post("http://localhost:8001/api/matching", {
                email: localStorage.getItem('token')[0],
                difficulty: localStorage.getItem('difficulty'),
                start_time: new Date().getTime(),
                socket_id: socket.id
            })
            //socket.emit('match-request', 'email', 'difficulty', new Date().getTime(), socket.io.engine.id);
            //socket.on('match-sucess', () => handleSuccessMatch())
        });
        socket.on("matchSuccess", async (data) => {
            console.log("Matched, room id is: " + data.room_id);
            navigate("/collaboration")
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token') == null)
            navigate("/login")

        initialisePage()
    })

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/matching")
    }

    const handleFailureMatch = () => {
        navigate("/matching")
    }
    
    const renderTime = ({ remainingTime }) => {
        return (
            <div className="timer">
                <div className="text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>Remaining</div>
                <div className="value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>{remainingTime}</div>
                <div className="text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>seconds</div>
            </div>
        );
    };

    return (
        <Box display={"flex"} flexDirection={"column"} width={"90%"}>
            <Typography variant={"h6"} align={"center"} marginBottom={"2rem"}>Looking for Match</Typography>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <CountdownCircleTimer
                    isPlaying
                    duration={30}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[30, 20, 10, 0]}
                    onComplete={() => handleFailureMatch()}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={() => handleCancel()} >back</Button>
            </Box>
        </Box>

    )
}

export default WaitingPage;