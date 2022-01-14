import { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Afternoon from "./image/Afternoon.jpg";
import Evening from "./image/Evening.jpg";
import Morning from "./image/Morning.jpg";
import Night from "./image/Night.jpg";
import moment from "moment";
// const getCurrentTime = () => {
//   return new Date().toLocaleTimeString("in-ID");
// };
const images = {
  morning: Morning,
  siang: Afternoon,
  sore: Evening,
  malem: Night,
};
function App() {
  const time = moment().format("H:mm");
  // const [time, setTime] = useState(() => getCurrentTime());
  const [quote, setQuote] = useState("");
  const [anime, setAnime] = useState("");
  const [char, setChar] = useState("");
  const [background, setBackground] = useState({ title: "", color: "", url: "" });

  useEffect(() => {
    const fetchData = () => {
      Axios({
        get: "get",
        url: "https://animechan.vercel.app/api/random",
      }).then((res) => {
        setQuote(res.data.quote);
        setChar(res.data.character);
        setAnime(res.data.anime);
      });
    };
    fetchData();

    const myQuote = setInterval(() => {
      fetchData();
    }, 60000 * 5);

    return () => {
      clearInterval(myQuote);
    };
  }, []);

  useEffect(() => {
    const myTimeInterval = setInterval(() => {
      // setTime(getCurrentTime());
      findTimeAndUpdateThemes();
    }, 1000);

    return () => {
      clearInterval(myTimeInterval);
    };
  });
  const findTimeAndUpdateThemes = () => {
    const currentHour = parseFloat(moment().format("H.mm"));
    const morning = 5;
    const afternoon = 12;
    const evening = 18;
    const nigth = 22;
    if (currentHour > morning && currentHour < afternoon) {
      setBackground({
        title: "Good Morning",
        color: "white",
        url: "url(https://images.pexels.com/photos/1310680/pexels-photo-1310680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)",
      });
    } else if (currentHour > afternoon && currentHour < evening) {
      setBackground({
        title: "Good Afternoon",
        color: "black",
        url: "url(https://images.pexels.com/photos/4784786/pexels-photo-4784786.jpeg?cs=srgb&dl=pexels-jess-loiterton-4784786.jpg&fm=jpg)",
      });
    } else if (currentHour > evening && currentHour < nigth) {
      setBackground({
        title: "Good Evening",
        color: "white",
        url: "url(https://images.pexels.com/photos/7277/sunset-water-clouds-lake.jpg?auto=compress&cs=tinysrgb&h=650&w=940)",
      });
    } else {
      setBackground({
        title: "Good Nigth",
        color: "white",
        url: "url(https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      });
    }
  };

  return (
    <div style={{ backgroundImage: background.url }} className="App">
      <header className="App-header">
        <div>
          <h3 style={{ fontSize: "2rem", color: background.color }}>{quote}</h3>
        </div>
        <div>
          <h4 style={{ fontSize: "1rem", color: background.color }}>- {char} -</h4>
          <h4 style={{ fontSize: "1rem", color: background.color }}>{anime}</h4>
        </div>
        <h1 style={{ fontSize: "5rem", color: background.color }}>{time}</h1>
      </header>
    </div>
  );
}

export default App;
