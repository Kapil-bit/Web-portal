import "../App.css";
import Navbar from "../components/common/header/navbar";
import Mapp from "../components/Map";
import { useEffect } from "react";
import PublicLayout from "../components/common/layout/layout";
import {test} from "../services/axiosFactory";

const Home = () => {
  useEffect(()=>{
    test().then((res)=>{
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  return (
    <PublicLayout title="Home">
      <div className="App">
        <Mapp />
      </div>
    </PublicLayout>
  );
};

export default Home;
